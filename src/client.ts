import type { TokenProvider } from "./auth.js";
import type { Config } from "./config.js";
import { ApiError } from "./errors.js";
import { httpRequest, type HttpOptions, type HttpResponse } from "./http.js";
import type { Operation } from "./types.js";

/** Bir query parametresini string(ler)e cevirir. */
function encodeQueryValue(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(encodeQueryValue);
  if (value === null) return [];
  if (typeof value === "boolean") return [value ? "true" : "false"];
  if (typeof value === "object") return [JSON.stringify(value)];
  return [String(value)];
}

export interface BuiltRequest {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: string;
}

/**
 * Operasyon tanimi ve dogrulanmis argumanlardan bir HTTP istegi kurar.
 * Token eklenmez; bunu FonzipClient yapar.
 */
export function buildRequest(operation: Operation, args: Record<string, unknown>, baseUrl: string): BuiltRequest {
  let path = operation.path;
  const query = new URLSearchParams();
  const body: Record<string, unknown> = {};

  for (const param of operation.params) {
    // Spec'te zorunlu tutulan ama varsayilani olan alanlar (start_page, how_many)
    // cagiran gondermediginde burada doldurulur.
    const value = args[param.name] ?? param.defaultValue;
    if (value === undefined) continue;

    if (param.in === "path") {
      // Path parametreleri sema tarafindan zorunlu tutuluyor.
      path = path.replace(`{${param.name}}`, encodeURIComponent(String(value)));
    } else if (param.in === "query") {
      for (const v of encodeQueryValue(value)) query.append(param.name, v);
    } else {
      body[param.name] = value;
    }
  }

  const search = query.toString();
  const headers: Record<string, string> = {};
  let bodyText: string | undefined;

  const hasBody = Object.keys(body).length > 0;
  if (hasBody || (operation.bodyRequired && operation.bodyContentType)) {
    if (operation.bodyContentType === "application/x-www-form-urlencoded") {
      headers["Content-Type"] = "application/x-www-form-urlencoded";
      const form = new URLSearchParams();
      for (const [k, v] of Object.entries(body)) {
        for (const item of encodeQueryValue(v)) form.append(k, item);
      }
      bodyText = form.toString();
    } else {
      headers["Content-Type"] = "application/json";
      bodyText = JSON.stringify(body);
    }
  }

  return {
    url: `${baseUrl}${path}${search ? `?${search}` : ""}`,
    method: operation.method,
    headers,
    ...(bodyText !== undefined ? { body: bodyText } : {}),
  };
}

/** Fonzip API v2 istemcisi: token ekler, 401'de bir kez token yeniler. */
export class FonzipClient {
  constructor(
    private readonly config: Config,
    private readonly tokens: TokenProvider,
    private readonly httpOptions: HttpOptions,
  ) {}

  async call(operation: Operation, args: Record<string, unknown>): Promise<HttpResponse> {
    const request = buildRequest(operation, args, this.config.baseUrl);

    try {
      return await this.send(request);
    } catch (err) {
      // Token sunucu tarafinda iptal edilmis olabilir: bir kez tazeleyip tekrar dene.
      if (err instanceof ApiError && err.status === 401 && this.tokens.canRefresh) {
        this.tokens.invalidate();
        return this.send(request);
      }
      throw err;
    }
  }

  private async send(request: BuiltRequest): Promise<HttpResponse> {
    const token = await this.tokens.getToken();
    return httpRequest(
      request.url,
      {
        method: request.method,
        headers: { ...request.headers, Authorization: `Bearer ${token}` },
        ...(request.body !== undefined ? { body: request.body } : {}),
      },
      this.httpOptions,
    );
  }
}
