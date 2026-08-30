/**
 * Gercek Fonzip API'sine karsi elle calistirilan duman testi.
 * Sadece okuma yapan action'lari cagirir; hicbir kayit degistirmez.
 *
 *   FONZIP_CLIENT_ID=... FONZIP_CLIENT_SECRET=... npx tsx scripts/smoke.ts
 *
 * Otomatik test paketine dahil degildir: ag ve gercek kimlik bilgisi ister.
 */
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { loadConfig } from "../src/config.js";
import { createServer } from "../src/server.js";

const READ_ONLY_CALLS: Array<{ name: string; arguments: Record<string, unknown> }> = [
  { name: "fonzip_system", arguments: { action: "me" } },
  { name: "fonzip_system", arguments: { action: "list_bank_accounts" } },
  { name: "fonzip_system", arguments: { action: "list_payment_systems" } },
  { name: "fonzip_tags", arguments: { action: "list" } },
  {
    name: "fonzip_donations",
    arguments: {
      action: "list",
      status: "paid",
      start_date: "2024-01-01",
      end_date: "2024-12-31",
      start_page: 1,
      how_many: 3,
    },
  },
  { name: "fonzip_donations", arguments: { action: "list_donation_pages" } },
  { name: "fonzip_events", arguments: { action: "list", start_page: 1, how_many: 3 } },
  // Kasitli hata: dogrulamanin API'ye gitmeden calistigini gosterir.
  { name: "fonzip_users", arguments: { action: "get" } },
];

async function main(): Promise<void> {
  const config = loadConfig();
  const client = new Client({ name: "fonzip-mcp-smoke", version: "0" });
  const server = createServer({ config });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await Promise.all([client.connect(clientTransport), server.connect(serverTransport)]);

  const { tools } = await client.listTools();
  const schemaBytes = JSON.stringify(tools).length;
  console.log(`tools: ${tools.length}, sema modu: ${config.schemaMode}, toplam ${schemaBytes} bayt`);
  console.log("");

  let failures = 0;
  for (const call of READ_ONLY_CALLS) {
    const label = `${call.name} ${String(call.arguments.action)}`;
    const started = Date.now();
    const result = await client.callTool(call);
    const text = (result.content as Array<{ type: string; text?: string }>)
      .map((c) => c.text ?? "")
      .join("")
      .replace(/\s+/g, " ")
      .slice(0, 160);
    const status = result.isError ? "HATA" : "  OK";
    if (result.isError) failures += 1;
    console.log(`${status}  ${label.padEnd(40)} ${Date.now() - started}ms  ${text}`);
  }

  console.log(`\n${READ_ONLY_CALLS.length} cagri, ${failures} hata (son cagri kasitli hata).`);
  await client.close();
  await server.close();
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
