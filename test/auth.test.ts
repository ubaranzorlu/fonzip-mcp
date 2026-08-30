import { describe, expect, it, vi } from "vitest";
import { TokenProvider } from "../src/auth.js";
import type { Config } from "../src/config.js";
import { FonzipError } from "../src/errors.js";
import type { HttpOptions } from "../src/http.js";
import type { StoredToken, TokenStore } from "../src/token-store.js";

/** Bellekte tutan test store'u; dosya sistemine dokunmaz. */
function memoryStore(initial?: StoredToken): TokenStore & { value?: StoredToken } {
  const store = {
    value: initial,
    read: () => (store.value && store.value.expiresAt > Date.now() ? store.value : undefined),
    write: (token: StoredToken) => {
      store.value = token;
    },
    clear: () => {
      store.value = undefined;
    },
  };
  return store;
}

function conflictResponse(): Response {
  return new Response(
    JSON.stringify({ error: "invalid_request", error_description: "Token already created" }),
    { status: 409, headers: { "content-type": "application/json" } },
  );
}

const baseConfig: Config = {
  baseUrl: "https://fonzip.com/api/v2",
  clientId: "id",
  clientSecret: "secret",
  timeoutMs: 1_000,
  maxRetries: 0,
  schemaMode: "full",
  userAgent: "fonzip-mcp/test",
};

function tokenResponse(token: string, expiresIn = 3600): Response {
  return new Response(JSON.stringify({ access_token: token, token_type: "Bearer", expires_in: expiresIn }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

function opts(fetchImpl: typeof fetch): HttpOptions {
  return { timeoutMs: 1_000, maxRetries: 0, userAgent: "fonzip-mcp/test", fetchImpl, sleepImpl: async () => {} };
}

describe("TokenProvider", () => {
  it("client_credentials ile token alir", async () => {
    const fetchImpl = vi.fn(async (_url: string | URL | Request, _init?: RequestInit) => tokenResponse("t1"));
    const provider = new TokenProvider(baseConfig, opts(fetchImpl as unknown as typeof fetch));
    expect(await provider.getToken()).toBe("t1");

    const [url, init] = fetchImpl.mock.calls[0]!;
    expect(url).toBe("https://fonzip.com/api/v2/token");
    expect(init!.method).toBe("POST");
    const body = new URLSearchParams(init!.body as string);
    expect(body.get("grant_type")).toBe("client_credentials");
    expect(body.get("client_id")).toBe("id");
    expect(body.get("client_secret")).toBe("secret");
  });

  it("gecerli token'i onbellekten dondurur", async () => {
    const fetchImpl = vi.fn(async (_url: string | URL | Request, _init?: RequestInit) => tokenResponse("t1"));
    const provider = new TokenProvider(baseConfig, opts(fetchImpl as unknown as typeof fetch));
    await provider.getToken();
    await provider.getToken();
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it("es zamanli isteklerde tek token istegi atar", async () => {
    const fetchImpl = vi.fn(async (_url: string | URL | Request, _init?: RequestInit) => tokenResponse("t1"));
    const provider = new TokenProvider(baseConfig, opts(fetchImpl as unknown as typeof fetch));
    const tokens = await Promise.all([provider.getToken(), provider.getToken(), provider.getToken()]);
    expect(tokens).toEqual(["t1", "t1", "t1"]);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it("invalidate sonrasi yeniden alir", async () => {
    const fetchImpl = vi.fn().mockResolvedValueOnce(tokenResponse("t1")).mockResolvedValueOnce(tokenResponse("t2"));
    const provider = new TokenProvider(baseConfig, opts(fetchImpl as unknown as typeof fetch));
    expect(await provider.getToken()).toBe("t1");
    provider.invalidate();
    expect(await provider.getToken()).toBe("t2");
  });

  it("son kullanma yaklastiginda yeniler", async () => {
    const fetchImpl = vi
      .fn()
      // 30 saniyelik token, 60 saniyelik guvenlik payinin altinda kaliyor.
      .mockResolvedValueOnce(tokenResponse("t1", 30))
      .mockResolvedValueOnce(tokenResponse("t2", 3600));
    const provider = new TokenProvider(baseConfig, opts(fetchImpl as unknown as typeof fetch));
    expect(await provider.getToken()).toBe("t1");
    expect(await provider.getToken()).toBe("t2");
  });

  it("sabit token verilmisse hic istek atmaz", async () => {
    const fetchImpl = vi.fn(async (_url: string | URL | Request, _init?: RequestInit) => tokenResponse("t1"));
    const provider = new TokenProvider(
      { ...baseConfig, accessToken: "sabit" },
      opts(fetchImpl as unknown as typeof fetch),
    );
    expect(await provider.getToken()).toBe("sabit");
    expect(provider.canRefresh).toBe(false);
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("access_token gelmezse hata verir", async () => {
    const fetchImpl = vi.fn(async () => new Response(JSON.stringify({}), { status: 200, headers: { "content-type": "application/json" } }));
    const provider = new TokenProvider(baseConfig, opts(fetchImpl as unknown as typeof fetch));
    await expect(provider.getToken()).rejects.toBeInstanceOf(FonzipError);
  });

  it("onbellekteki gecerli token'i kullanip istek atmaz", async () => {
    const fetchImpl = vi.fn(async (_url: string | URL | Request, _init?: RequestInit) => tokenResponse("yeni"));
    const store = memoryStore({ accessToken: "onbellek", expiresAt: Date.now() + 3_600_000 });
    const provider = new TokenProvider(baseConfig, opts(fetchImpl as unknown as typeof fetch), store);
    expect(await provider.getToken()).toBe("onbellek");
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("aldigi token'i store'a yazar", async () => {
    const fetchImpl = vi.fn(async (_url: string | URL | Request, _init?: RequestInit) => tokenResponse("t1"));
    const store = memoryStore();
    const provider = new TokenProvider(baseConfig, opts(fetchImpl as unknown as typeof fetch), store);
    await provider.getToken();
    expect(store.value?.accessToken).toBe("t1");
  });

  it("409 Token already created durumunda onbellek token'ina doner", async () => {
    const fetchImpl = vi.fn(async (_url: string | URL | Request, _init?: RequestInit) => conflictResponse());
    // Yenileme payinin icinde kalan, ama hala gecerli bir token.
    const store = memoryStore({ accessToken: "hala-gecerli", expiresAt: Date.now() + 30_000 });
    const provider = new TokenProvider(baseConfig, opts(fetchImpl as unknown as typeof fetch), store);
    expect(await provider.getToken()).toBe("hala-gecerli");
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it("409 alip elde token yoksa yol gosteren hata verir", async () => {
    const fetchImpl = vi.fn(async (_url: string | URL | Request, _init?: RequestInit) => conflictResponse());
    const provider = new TokenProvider(baseConfig, opts(fetchImpl as unknown as typeof fetch), memoryStore());
    await expect(provider.getToken()).rejects.toThrow(/FONZIP_ACCESS_TOKEN/);
    await expect(provider.getToken()).rejects.toThrow(/en fazla 1 saat/);
  });

  it("invalidate store'u da temizler", async () => {
    const fetchImpl = vi.fn(async (_url: string | URL | Request, _init?: RequestInit) => tokenResponse("t1"));
    const store = memoryStore();
    const provider = new TokenProvider(baseConfig, opts(fetchImpl as unknown as typeof fetch), store);
    await provider.getToken();
    provider.invalidate();
    expect(store.value).toBeUndefined();
  });

  it("basarisiz istekten sonra tekrar denenebilir", async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ error: "bad" }), { status: 401, headers: { "content-type": "application/json" } }))
      .mockResolvedValueOnce(tokenResponse("t1"));
    const provider = new TokenProvider(baseConfig, opts(fetchImpl as unknown as typeof fetch));
    await expect(provider.getToken()).rejects.toThrow();
    expect(await provider.getToken()).toBe("t1");
  });
});
