import { ConfigError } from "./errors.js";
import { DEFAULT_BASE_URL } from "./generated/operations.js";
import { defaultTokenCachePath } from "./token-store.js";
import { VERSION } from "./version.js";

/**
 * Tool semalarinin istemciye nasil gonderilecegi.
 * - full:    her action'in tum parametreleri JSON Schema olarak gonderilir (~15k token).
 * - compact: parametreler serbest bir "params" objesi olur, action listesi tool
 *            aciklamasinda ozetlenir (~2k token). Eksik alan olursa hata mesaji
 *            o action'in tam semasini geri dondurur.
 */
export type SchemaMode = "full" | "compact";

export interface Config {
  baseUrl: string;
  clientId?: string;
  clientSecret?: string;
  /** Verilirse client_credentials akisi atlanir ve bu token dogrudan kullanilir. */
  accessToken?: string;
  timeoutMs: number;
  maxRetries: number;
  schemaMode: SchemaMode;
  userAgent: string;
  /**
   * Token'in surecler arasi saklanacagi dosya. undefined ise onbellek kapali.
   * Fonzip ayni anda tek token verdiginden bunu acik birakmak onerilir.
   */
  tokenCachePath?: string;
}

function intFromEnv(env: NodeJS.ProcessEnv, key: string, fallback: number, min: number, max: number): number {
  const raw = env[key];
  if (raw === undefined || raw === "") return fallback;
  const value = Number(raw);
  if (!Number.isFinite(value) || !Number.isInteger(value) || value < min || value > max) {
    throw new ConfigError(`${key} ${min}-${max} arasinda bir tam sayi olmali, alinan: "${raw}"`);
  }
  return value;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  const clientId = env.FONZIP_CLIENT_ID?.trim() || undefined;
  const clientSecret = env.FONZIP_CLIENT_SECRET?.trim() || undefined;
  const accessToken = env.FONZIP_ACCESS_TOKEN?.trim() || undefined;

  if (!accessToken && !(clientId && clientSecret)) {
    throw new ConfigError(
      "Kimlik bilgisi eksik. FONZIP_CLIENT_ID ve FONZIP_CLIENT_SECRET tanimlayin " +
        "(veya hazir bir token icin FONZIP_ACCESS_TOKEN). API anahtarini Fonzip'te " +
        "Ayarlar > Gelismis > Fonzip API menusunden olusturabilirsiniz.",
    );
  }

  const schemaModeRaw = (env.FONZIP_SCHEMA_MODE?.trim() || "full").toLowerCase();
  if (schemaModeRaw !== "full" && schemaModeRaw !== "compact") {
    throw new ConfigError(`FONZIP_SCHEMA_MODE "full" veya "compact" olmali, alinan: "${schemaModeRaw}"`);
  }

  const baseUrl = (env.FONZIP_BASE_URL?.trim() || DEFAULT_BASE_URL).replace(/\/+$/, "");
  try {
    // eslint-disable-next-line no-new
    new URL(baseUrl);
  } catch {
    throw new ConfigError(`FONZIP_BASE_URL gecerli bir URL degil: "${baseUrl}"`);
  }

  const cacheSetting = env.FONZIP_TOKEN_CACHE?.trim();
  const tokenCacheDisabled = cacheSetting === "off" || cacheSetting === "0" || cacheSetting === "false";
  const tokenCachePath = tokenCacheDisabled
    ? undefined
    : cacheSetting && cacheSetting.length > 0
      ? cacheSetting
      : defaultTokenCachePath(env);

  return {
    baseUrl,
    clientId,
    clientSecret,
    accessToken,
    timeoutMs: intFromEnv(env, "FONZIP_TIMEOUT_MS", 30_000, 1_000, 600_000),
    maxRetries: intFromEnv(env, "FONZIP_MAX_RETRIES", 3, 0, 10),
    schemaMode: schemaModeRaw,
    // Cloudflare, User-Agent gondermeyen istekleri HTTP 403 (error code 1010) ile
    // reddediyor. Bu basligi bos birakmayin.
    userAgent: env.FONZIP_USER_AGENT?.trim() || `fonzip-mcp/${VERSION} (+https://github.com/fonzip-mcp)`,
    ...(tokenCachePath ? { tokenCachePath } : {}),
  };
}
