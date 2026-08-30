import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type CallToolResult,
  type Tool,
} from "@modelcontextprotocol/sdk/types.js";

import { TokenProvider } from "./auth.js";
import { FonzipClient } from "./client.js";
import type { Config } from "./config.js";
import { ApiError, FonzipError, ValidationError } from "./errors.js";
import { SPEC_VERSION, TOOL_GROUPS } from "./generated/operations.js";
import type { HttpOptions } from "./http.js";
import { buildToolDescription, buildToolSchema, validateCall } from "./schema.js";
import { FileTokenStore, nullTokenStore, type TokenStore } from "./token-store.js";
import type { ToolGroup } from "./types.js";
import { VERSION } from "./version.js";

/** Tek bir yanitta modele gonderilecek azami karakter sayisi. */
const MAX_RESULT_CHARS = 100_000;

function toolAnnotations(group: ToolGroup) {
  const destructive = group.actions.some((a) => a.method === "DELETE");
  return {
    title: group.name,
    readOnlyHint: group.readOnly,
    destructiveHint: destructive,
    // Ayni argumanlarla tekrar cagirmak yeni kayit olusturabilir.
    idempotentHint: group.readOnly,
    openWorldHint: true,
  };
}

function describeTool(group: ToolGroup, config: Config): Tool {
  return {
    name: group.name,
    description: buildToolDescription(group, config.schemaMode),
    inputSchema: buildToolSchema(group, config.schemaMode) as Tool["inputSchema"],
    annotations: toolAnnotations(group),
  };
}

function textResult(text: string, isError = false): CallToolResult {
  return { content: [{ type: "text", text }], isError };
}

/** API yanitini modele gonderilecek metne cevirir; asiri buyuk yanitlari kirpar. */
function formatResponse(body: unknown, status: number): CallToolResult {
  if (body === undefined || body === "") {
    return textResult(`Islem basarili (HTTP ${status}). Yanit govdesi bos.`);
  }
  const text = typeof body === "string" ? body : JSON.stringify(body, null, 2);
  if (text.length <= MAX_RESULT_CHARS) return textResult(text);

  return textResult(
    `${text.slice(0, MAX_RESULT_CHARS)}\n\n[Yanit ${text.length} karakterdi ve ${MAX_RESULT_CHARS} ` +
      "karakterde kesildi. Sayfalama (start_page / how_many) veya daha dar bir tarih araligi kullanin.]",
  );
}

function formatError(error: unknown): CallToolResult {
  if (error instanceof ValidationError) {
    const details = error.details as { expectedSchema?: unknown } | undefined;
    const schema = details?.expectedSchema
      ? `\n\nBu action icin beklenen sema:\n${JSON.stringify(details.expectedSchema, null, 2)}`
      : "";
    return textResult(`${error.message}${schema}`, true);
  }
  if (error instanceof ApiError) {
    return textResult(error.message, true);
  }
  if (error instanceof FonzipError) {
    return textResult(error.message, true);
  }
  return textResult(`Beklenmeyen hata: ${(error as Error)?.message ?? String(error)}`, true);
}

export interface CreateServerOptions {
  config: Config;
  /** Testlerde fetch, bekleme ve token saklama davranisini degistirmek icin. */
  fetchImpl?: typeof fetch;
  sleepImpl?: (ms: number) => Promise<void>;
  tokenStore?: TokenStore;
}

export function createServer({ config, fetchImpl, sleepImpl, tokenStore }: CreateServerOptions): Server {
  const httpOptions: HttpOptions = {
    timeoutMs: config.timeoutMs,
    maxRetries: config.maxRetries,
    userAgent: config.userAgent,
    ...(fetchImpl ? { fetchImpl } : {}),
    ...(sleepImpl ? { sleepImpl } : {}),
  };

  const store =
    tokenStore ??
    (config.tokenCachePath && config.clientId
      ? new FileTokenStore(config.tokenCachePath, config.baseUrl, config.clientId)
      : nullTokenStore);

  const tokens = new TokenProvider(config, httpOptions, store);
  const client = new FonzipClient(config, tokens, httpOptions);
  const groups = new Map(TOOL_GROUPS.map((g) => [g.name, g]));

  const server = new Server(
    { name: "fonzip-mcp", version: VERSION },
    {
      capabilities: { tools: {} },
      instructions:
        `Fonzip API v${SPEC_VERSION} (dernek/vakif bagis ve uye yonetimi) icin MCP sunucusu. ` +
        "Her tool bir konu basligini temsil eder ve zorunlu bir \"action\" parametresi alir. " +
        "Kurulumu dogrulamak ve kurum bilgisini gormek icin fonzip_system action=me ile baslayin. " +
        "Bagis listeleri tarih araligi (start_date/end_date) ister. Silme islemleri geri alinamaz.",
    },
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: TOOL_GROUPS.map((group) => describeTool(group, config)),
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const group = groups.get(request.params.name);
    if (!group) {
      return textResult(
        `Bilinmeyen tool "${request.params.name}". Mevcut tool'lar: ${TOOL_GROUPS.map((g) => g.name).join(", ")}`,
        true,
      );
    }

    try {
      const { operation, args } = validateCall(group, request.params.arguments, config.schemaMode);
      const response = await client.call(operation, args);
      return formatResponse(response.body, response.status);
    } catch (error) {
      return formatError(error);
    }
  });

  return server;
}
