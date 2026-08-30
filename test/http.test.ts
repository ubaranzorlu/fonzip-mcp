import { describe, expect, it, vi } from "vitest";
import { ApiError, FonzipError } from "../src/errors.js";
import { httpRequest, type HttpOptions } from "../src/http.js";

function jsonResponse(status: number, body: unknown, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...headers },
  });
}

function options(fetchImpl: typeof fetch, overrides: Partial<HttpOptions> = {}): HttpOptions {
  return {
    timeoutMs: 1_000,
    maxRetries: 2,
    userAgent: "fonzip-mcp/test",
    fetchImpl,
    sleepImpl: async () => {},
    ...overrides,
  };
}

describe("httpRequest", () => {
  it("basarili yaniti cozer", async () => {
    const fetchImpl = vi.fn(async (_url: string | URL | Request, _init?: RequestInit) => jsonResponse(200, { ok: true }));
    const response = await httpRequest("https://ornek.test/x", {}, options(fetchImpl as unknown as typeof fetch));
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ok: true });
  });

  it("her istekte User-Agent gonderir (Cloudflare 1010 icin sart)", async () => {
    const fetchImpl = vi.fn(async (_url: string | URL | Request, _init?: RequestInit) => jsonResponse(200, {}));
    await httpRequest("https://ornek.test/x", {}, options(fetchImpl as unknown as typeof fetch));
    const init = fetchImpl.mock.calls[0]![1]!;
    expect((init.headers as Record<string, string>)["User-Agent"]).toBe("fonzip-mcp/test");
  });

  it("cagiranin basliklari User-Agent'i ezmez sekilde birlesir", async () => {
    const fetchImpl = vi.fn(async (_url: string | URL | Request, _init?: RequestInit) => jsonResponse(200, {}));
    await httpRequest(
      "https://ornek.test/x",
      { headers: { Authorization: "Bearer t" } },
      options(fetchImpl as unknown as typeof fetch),
    );
    const headers = fetchImpl.mock.calls[0]![1]!.headers as Record<string, string>;
    expect(headers.Authorization).toBe("Bearer t");
    expect(headers["User-Agent"]).toBe("fonzip-mcp/test");
  });

  it("429 sonrasi yeniden dener", async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse(429, { error: "cok istek" }, { "retry-after": "0" }))
      .mockResolvedValueOnce(jsonResponse(200, { ok: true }));
    const response = await httpRequest("https://ornek.test/x", {}, options(fetchImpl as unknown as typeof fetch));
    expect(response.body).toEqual({ ok: true });
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  it("Retry-After suresine uyar", async () => {
    const sleepImpl = vi.fn(async () => {});
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse(429, {}, { "retry-after": "2" }))
      .mockResolvedValueOnce(jsonResponse(200, {}));
    await httpRequest("https://ornek.test/x", {}, options(fetchImpl as unknown as typeof fetch, { sleepImpl }));
    expect(sleepImpl).toHaveBeenCalledWith(2000);
  });

  it("5xx yanitlarini yeniden dener ve sonunda ApiError atar", async () => {
    const fetchImpl = vi.fn(async () => jsonResponse(503, { error: "bakim" }));
    await expect(
      httpRequest("https://ornek.test/x", {}, options(fetchImpl as unknown as typeof fetch)),
    ).rejects.toBeInstanceOf(ApiError);
    expect(fetchImpl).toHaveBeenCalledTimes(3);
  });

  it("4xx yanitlarini yeniden denemez", async () => {
    const fetchImpl = vi.fn(async () => jsonResponse(400, { error: "Lutfen gecerli bir tarih araligi girin" }));
    await expect(
      httpRequest("https://ornek.test/x", {}, options(fetchImpl as unknown as typeof fetch)),
    ).rejects.toThrow(/Lutfen gecerli bir tarih araligi girin/);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it("401 icin kimlik ipucu verir", async () => {
    const fetchImpl = vi.fn(async () => jsonResponse(401, {}));
    await expect(
      httpRequest("https://ornek.test/x", {}, options(fetchImpl as unknown as typeof fetch)),
    ).rejects.toThrow(/FONZIP_CLIENT_ID/);
  });

  it("JSON olmayan govdeyi ham metin dondurur", async () => {
    const fetchImpl = vi.fn(async () => new Response("error code: 1010", { status: 403, headers: { "content-type": "text/plain" } }));
    await expect(
      httpRequest("https://ornek.test/x", {}, options(fetchImpl as unknown as typeof fetch)),
    ).rejects.toThrow(/error code: 1010/);
  });

  it("ag hatasini FonzipError'a cevirir", async () => {
    const fetchImpl = vi.fn(async () => {
      throw new TypeError("fetch failed");
    });
    await expect(
      httpRequest("https://ornek.test/x", {}, options(fetchImpl as unknown as typeof fetch, { maxRetries: 0 })),
    ).rejects.toBeInstanceOf(FonzipError);
  });

  it("bos govdeyi undefined olarak dondurur", async () => {
    const fetchImpl = vi.fn(async () => new Response(null, { status: 204 }));
    const response = await httpRequest("https://ornek.test/x", {}, options(fetchImpl as unknown as typeof fetch));
    expect(response.body).toBeUndefined();
  });
});
