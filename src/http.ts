import { ApiError, describeApiError, FonzipError } from "./errors.js";

export interface HttpOptions {
  timeoutMs: number;
  maxRetries: number;
  userAgent: string;
  /** Test edilebilirlik icin enjekte edilebilir. Varsayilan: global fetch. */
  fetchImpl?: typeof fetch;
  /** Test edilebilirlik icin enjekte edilebilir. Varsayilan: gercek bekleme. */
  sleepImpl?: (ms: number) => Promise<void>;
}

export interface HttpResponse {
  status: number;
  headers: Headers;
  /** JSON ise cozulmus hali, degilse ham metin. */
  body: unknown;
}

const defaultSleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** 429 Retry-After basligini milisaniyeye cevirir; okunamazsa undefined. */
function retryAfterMs(headers: Headers): number | undefined {
  const raw = headers.get("retry-after");
  if (!raw) return undefined;
  const seconds = Number(raw);
  if (Number.isFinite(seconds) && seconds >= 0) return Math.min(seconds * 1000, 60_000);
  const date = Date.parse(raw);
  if (!Number.isNaN(date)) return Math.min(Math.max(date - Date.now(), 0), 60_000);
  return undefined;
}

/** Ustel geri cekilme + jitter. Ard arda istek dalgalarini dagitir. */
function backoffMs(attempt: number): number {
  const base = Math.min(500 * 2 ** attempt, 8_000);
  return base + Math.floor(Math.random() * 250);
}

/**
 * Tek bir HTTP istegi atar; 429 ve 5xx yanitlari ile ag hatalarinda yeniden dener.
 *
 * Fonzip dakikada 240 istekle sinirli, bu yuzden 429 durumunda Retry-After
 * basligina uyulur.
 */
export async function httpRequest(
  url: string,
  init: RequestInit,
  options: HttpOptions,
): Promise<HttpResponse> {
  const fetchImpl = options.fetchImpl ?? globalThis.fetch;
  const sleep = options.sleepImpl ?? defaultSleep;
  const summary = `${init.method ?? "GET"} ${url}`;

  let lastError: unknown;

  for (let attempt = 0; attempt <= options.maxRetries; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), options.timeoutMs);

    try {
      const response = await fetchImpl(url, {
        ...init,
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          // Bos User-Agent Cloudflare tarafindan 1010 koduyla engelleniyor.
          "User-Agent": options.userAgent,
          ...(init.headers as Record<string, string> | undefined),
        },
      });

      const body = await parseBody(response);

      if (response.ok) {
        return { status: response.status, headers: response.headers, body };
      }

      const error = new ApiError(
        response.status,
        describeApiError(response.status, body),
        body,
        summary,
      );

      if (!error.retryable || attempt === options.maxRetries) throw error;
      await sleep(retryAfterMs(response.headers) ?? backoffMs(attempt));
      lastError = error;
      continue;
    } catch (err) {
      if (err instanceof ApiError) {
        if (!err.retryable || attempt === options.maxRetries) throw err;
        lastError = err;
        continue;
      }
      if (err instanceof DOMException && err.name === "AbortError") {
        lastError = new FonzipError(
          `Istek ${options.timeoutMs} ms icinde tamamlanmadi: ${summary}. ` +
            "FONZIP_TIMEOUT_MS ile sureyi artirabilirsiniz.",
        );
      } else {
        lastError = new FonzipError(`Fonzip'e baglanilamadi (${summary}): ${(err as Error).message}`);
      }
      if (attempt === options.maxRetries) throw lastError;
      await sleep(backoffMs(attempt));
    } finally {
      clearTimeout(timer);
    }
  }

  throw lastError ?? new FonzipError(`Istek basarisiz: ${summary}`);
}

async function parseBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return undefined;
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("json")) {
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }
  // Cloudflare hata sayfalari gibi JSON olmayan yanitlar ham metin doner.
  return text;
}
