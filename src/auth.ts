import type { Config } from "./config.js";
import { ApiError, FonzipError } from "./errors.js";
import { httpRequest, type HttpOptions } from "./http.js";
import { nullTokenStore, type TokenStore } from "./token-store.js";

interface TokenResponse {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
}

/** Token'i son kullanma tarihinden bu kadar once yeniler. */
const REFRESH_SKEW_MS = 60_000;

/**
 * Fonzip, gecerli bir token varken yeni token uretmeyi HTTP 409 ile reddeder.
 * Govde: {"error": "invalid_request", "error_description": "Token already created"}
 */
function isTokenAlreadyCreated(error: unknown): boolean {
  if (!(error instanceof ApiError) || error.status !== 409) return false;
  const body = error.body as { error_description?: unknown } | undefined;
  const description = typeof body?.error_description === "string" ? body.error_description : "";
  return /already created/i.test(description) || description === "";
}

/**
 * OAuth2 client_credentials akisiyla erisim token'i alir, bellekte ve (varsa)
 * diskte saklar. Es zamanli istekler ayni token istegini paylasir.
 */
export class TokenProvider {
  private token?: string;
  private expiresAt = 0;
  private inflight?: Promise<string>;

  constructor(
    private readonly config: Config,
    private readonly httpOptions: HttpOptions,
    private readonly store: TokenStore = nullTokenStore,
  ) {}

  /** Gecerli bir token dondurur; gerekirse yenisini alir. */
  async getToken(): Promise<string> {
    // Sabit token verilmisse yenileme yapilmaz.
    if (this.config.accessToken) return this.config.accessToken;

    if (this.token && Date.now() < this.expiresAt - REFRESH_SKEW_MS) return this.token;

    // Onceki surecten kalan token varsa yeniden kullan: Fonzip ayni anda
    // ikinci bir token uretmiyor.
    const cached = this.store.read();
    if (cached && Date.now() < cached.expiresAt - REFRESH_SKEW_MS) {
      this.token = cached.accessToken;
      this.expiresAt = cached.expiresAt;
      return this.token;
    }

    this.inflight ??= this.fetchToken().finally(() => {
      this.inflight = undefined;
    });
    return this.inflight;
  }

  /**
   * Onbellegi bosaltir. API 401 dondurdugunde bir kez cagrilir; token
   * sunucu tarafinda iptal edilmis olabilir.
   */
  invalidate(): void {
    this.token = undefined;
    this.expiresAt = 0;
    this.store.clear();
  }

  /** Sabit token modunda yenileme mumkun degil. */
  get canRefresh(): boolean {
    return !this.config.accessToken;
  }

  private async fetchToken(): Promise<string> {
    const { clientId, clientSecret, baseUrl } = this.config;
    if (!clientId || !clientSecret) {
      throw new FonzipError("FONZIP_CLIENT_ID ve FONZIP_CLIENT_SECRET tanimli degil.");
    }

    let response;
    try {
      response = await httpRequest(
        `${baseUrl}/token`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: clientId,
            client_secret: clientSecret,
          }).toString(),
        },
        this.httpOptions,
      );
    } catch (error) {
      if (isTokenAlreadyCreated(error)) return this.recoverFromConflict();
      throw error;
    }

    const data = response.body as TokenResponse | undefined;
    if (!data?.access_token) {
      throw new FonzipError("Fonzip /token yanitinda access_token yok.", response.body);
    }

    this.token = data.access_token;
    const lifetimeMs = (typeof data.expires_in === "number" ? data.expires_in : 3600) * 1000;
    this.expiresAt = Date.now() + lifetimeMs;
    this.store.write({ accessToken: this.token, expiresAt: this.expiresAt });
    return this.token;
  }

  /**
   * 409 alindi: Fonzip'te bu client icin hala aktif bir token var.
   * Onbellekte kullanilabilir bir kopya varsa (yenileme payinin icine girmis
   * olsa bile) onunla devam et; yoksa ne yapilacagini anlat.
   */
  private recoverFromConflict(): string {
    const cached = this.store.read();
    if (cached) {
      this.token = cached.accessToken;
      this.expiresAt = cached.expiresAt;
      return this.token;
    }
    throw new FonzipError(
      'Fonzip bu client icin zaten aktif bir token uretmis (HTTP 409, "Token already created") ' +
        "ve yenisini vermiyor; Fonzip ayni anda tek token tutar. Elde saklanmis bir kopya da yok. " +
        "Secenekler: (1) onceki token'in suresi dolana kadar bekleyin (en fazla 1 saat), " +
        "(2) elinizdeki token'i FONZIP_ACCESS_TOKEN ile verin, " +
        "(3) Fonzip'te ayri bir API anahtari olusturun. " +
        "Bu durumu tekrar yasamamak icin token onbellegini acik birakin (FONZIP_TOKEN_CACHE).",
    );
  }
}
