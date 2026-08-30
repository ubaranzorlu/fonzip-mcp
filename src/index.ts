import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { loadConfig } from "./config.js";
import { FonzipError } from "./errors.js";
import { createServer } from "./server.js";
import { VERSION } from "./version.js";

export { createServer } from "./server.js";
export { loadConfig, type Config } from "./config.js";
export { TOOL_GROUPS, SPEC_VERSION } from "./generated/operations.js";
export type { Operation, ToolGroup } from "./types.js";

const USAGE = `fonzip-mcp ${VERSION} - Fonzip API v2 icin MCP sunucusu

Kullanim:
  fonzip-mcp              stdio uzerinden MCP sunucusunu baslatir
  fonzip-mcp --version    surumu yazar
  fonzip-mcp --help       bu metni yazar

Ortam degiskenleri:
  FONZIP_CLIENT_ID       (zorunlu) Fonzip API client id
  FONZIP_CLIENT_SECRET   (zorunlu) Fonzip API client secret
  FONZIP_ACCESS_TOKEN    (opsiyonel) hazir token; verilirse client_credentials atlanir
  FONZIP_BASE_URL        (opsiyonel) varsayilan https://fonzip.com/api/v2
  FONZIP_SCHEMA_MODE     (opsiyonel) full | compact, varsayilan full
  FONZIP_TIMEOUT_MS      (opsiyonel) varsayilan 30000
  FONZIP_MAX_RETRIES     (opsiyonel) varsayilan 3
  FONZIP_USER_AGENT      (opsiyonel) bos birakmayin, Cloudflare engelliyor

API anahtari: Fonzip > Ayarlar > Gelismis > Fonzip API > "API anahtari olustur"
`;

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(USAGE);
    return;
  }
  if (argv.includes("--version") || argv.includes("-v")) {
    process.stdout.write(`${VERSION}\n`);
    return;
  }

  const config = loadConfig();
  const server = createServer({ config });
  await server.connect(new StdioServerTransport());

  const shutdown = () => {
    void server.close().finally(() => process.exit(0));
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

main().catch((error: unknown) => {
  // stdout MCP protokolune ait; hatalar stderr'e yazilir.
  const message = error instanceof FonzipError ? error.message : `Beklenmeyen hata: ${String(error)}`;
  process.stderr.write(`${message}\n`);
  process.exit(1);
});
