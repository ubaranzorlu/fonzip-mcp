import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Config } from "../src/config.js";
import { createServer } from "../src/server.js";

const config: Config = {
  baseUrl: "https://fonzip.com/api/v2",
  clientId: "id",
  clientSecret: "secret",
  timeoutMs: 1_000,
  maxRetries: 0,
  schemaMode: "full",
  userAgent: "fonzip-mcp/test",
};

function json(status: number, body: unknown, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", ...headers } });
}

/** Once token, sonra sirayla verilen yanitlari donduren sahte fetch. */
function stubFetch(...responses: Response[]) {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  let index = 0;
  const impl = vi.fn(async (url: string | URL | Request, init?: RequestInit) => {
    const href = String(url);
    calls.push({ url: href, init: init ?? {} });
    if (href.endsWith("/token")) return json(200, { access_token: "tok", expires_in: 3600 });
    const response = responses[index];
    index += 1;
    return response ?? json(200, {});
  });
  return { impl: impl as unknown as typeof fetch, calls, fn: impl };
}

async function connect(overrides: Partial<Config> = {}, fetchImpl?: typeof fetch) {
  const client = new Client({ name: "test", version: "0" });
  const server = createServer({
    config: { ...config, ...overrides },
    ...(fetchImpl ? { fetchImpl } : {}),
    sleepImpl: async () => {},
  });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await Promise.all([client.connect(clientTransport), server.connect(serverTransport)]);
  return { client, server };
}

describe("MCP sunucusu", () => {
  it("13 tool listeler", async () => {
    const { client } = await connect();
    const { tools } = await client.listTools();
    expect(tools).toHaveLength(13);
    expect(tools.map((t) => t.name)).toContain("fonzip_system");
    for (const tool of tools) {
      expect(tool.inputSchema.type).toBe("object");
      expect((tool.inputSchema.properties as Record<string, unknown>).action).toBeDefined();
      expect(tool.inputSchema.required).toEqual(["action"]);
      expect(tool.description).toBeTruthy();
    }
  });

  it("salt okunur grubu readOnlyHint ile isaretler", async () => {
    const { client } = await connect();
    const { tools } = await client.listTools();
    const system = tools.find((t) => t.name === "fonzip_system")!;
    expect(system.annotations?.readOnlyHint).toBe(true);
    expect(system.annotations?.destructiveHint).toBe(false);

    const tags = tools.find((t) => t.name === "fonzip_tags")!;
    expect(tags.annotations?.readOnlyHint).toBe(false);
    expect(tags.annotations?.destructiveHint).toBe(true);
  });

  it("compact modda semalar kuculur ve action'lar aciklamaya tasinir", async () => {
    const { client } = await connect({ schemaMode: "compact" });
    const { tools } = await client.listTools();
    const donations = tools.find((t) => t.name === "fonzip_donations")!;
    expect(Object.keys(donations.inputSchema.properties as object).sort()).toEqual(["action", "params"]);
    expect(donations.description).toContain("Action'lar:");
    expect(donations.description).toContain("- list (GET)");
  });

  it("action'i cagirip token alir ve Authorization gonderir", async () => {
    const stub = stubFetch(json(200, { id: 4951, name: "Test Dernegi" }));
    const { client } = await connect({}, stub.impl);
    const result = await client.callTool({ name: "fonzip_system", arguments: { action: "me" } });

    expect(result.isError).toBeFalsy();
    expect((result.content as Array<{ text: string }>)[0]!.text).toContain("Test Dernegi");

    const apiCall = stub.calls.find((c) => c.url.endsWith("/me"))!;
    expect(apiCall.url).toBe("https://fonzip.com/api/v2/me");
    expect((apiCall.init.headers as Record<string, string>).Authorization).toBe("Bearer tok");
  });

  it("path ve query parametrelerini istege yansitir", async () => {
    const stub = stubFetch(json(200, { tag_list: [] }));
    const { client } = await connect({}, stub.impl);
    await client.callTool({
      name: "fonzip_users",
      arguments: { action: "list_tags", user_id: 42 },
    });
    expect(stub.calls.find((c) => c.url.includes("/user/42/tags"))).toBeDefined();
  });

  it("gecersiz argumanda beklenen semayi geri dondurur", async () => {
    const { client } = await connect();
    const result = await client.callTool({ name: "fonzip_users", arguments: { action: "get" } });
    expect(result.isError).toBe(true);
    const text = (result.content as Array<{ text: string }>)[0]!.text;
    expect(text).toContain("user_id: zorunlu alan eksik");
    expect(text).toContain("Bu action icin beklenen sema");
  });

  it("bilinmeyen action'da secenekleri listeler", async () => {
    const { client } = await connect();
    const result = await client.callTool({ name: "fonzip_tags", arguments: { action: "arsivle" } });
    expect(result.isError).toBe(true);
    expect((result.content as Array<{ text: string }>)[0]!.text).toContain("Secenekler: create, delete, list, update");
  });

  it("API hatasini okunabilir mesaja cevirir", async () => {
    const stub = stubFetch(json(400, { error: "Lutfen gecerli bir tarih araligi girin" }));
    const { client } = await connect({}, stub.impl);
    const result = await client.callTool({
      name: "fonzip_donations",
      arguments: {
        action: "list",
        status: "paid",
        start_date: "2026-01-01",
        end_date: "2026-01-31",
        start_page: 1,
        how_many: 10,
      },
    });
    expect(result.isError).toBe(true);
    expect((result.content as Array<{ text: string }>)[0]!.text).toContain("Lutfen gecerli bir tarih araligi girin");
  });

  it("401 alinca token'i yenileyip bir kez tekrar dener", async () => {
    const stub = stubFetch(json(401, { error: "yetkisiz" }), json(200, { ok: true }));
    const { client } = await connect({}, stub.impl);
    const result = await client.callTool({ name: "fonzip_system", arguments: { action: "me" } });
    expect(result.isError).toBeFalsy();
    expect(stub.calls.filter((c) => c.url.endsWith("/token"))).toHaveLength(2);
  });

  it("zorunlu tarih araligini API'ye gitmeden dogrular", async () => {
    const stub = stubFetch(json(200, {}));
    const { client } = await connect({}, stub.impl);
    const result = await client.callTool({ name: "fonzip_donations", arguments: { action: "list", status: "paid" } });
    expect(result.isError).toBe(true);
    expect((result.content as Array<{ text: string }>)[0]!.text).toContain("start_date: zorunlu alan eksik");
    // Dogrulama basarisiz oldugu icin Fonzip'e istek gitmemeli.
    expect(stub.calls.filter((c) => !c.url.endsWith("/token"))).toHaveLength(0);
  });

  it("bilinmeyen tool adinda hata dondurur", async () => {
    const { client } = await connect();
    const result = await client.callTool({ name: "fonzip_yok", arguments: {} });
    expect(result.isError).toBe(true);
  });
});
