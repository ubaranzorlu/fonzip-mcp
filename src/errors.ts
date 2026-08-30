/** Sunucu genelinde kullanilan hata tipleri. */

/** Kullaniciya gosterilebilecek, beklenen turden hatalar. */
export class FonzipError extends Error {
  constructor(message: string, readonly details?: unknown) {
    super(message);
    this.name = "FonzipError";
  }
}

/** Ortam degiskenleri eksik/gecersiz. */
export class ConfigError extends FonzipError {
  constructor(message: string) {
    super(message);
    this.name = "ConfigError";
  }
}

/** Tool cagrisi semaya uymadi. Fonzip'e istek gonderilmedi. */
export class ValidationError extends FonzipError {
  constructor(message: string, details?: unknown) {
    super(message, details);
    this.name = "ValidationError";
  }
}

/** Fonzip API hata durum kodu dondurdu. */
export class ApiError extends FonzipError {
  constructor(
    readonly status: number,
    message: string,
    readonly body?: unknown,
    readonly requestSummary?: string,
  ) {
    super(message, body);
    this.name = "ApiError";
  }

  /** 429 ve 5xx gecici sayilir; istemci bunlari yeniden dener. */
  get retryable(): boolean {
    return this.status === 429 || (this.status >= 500 && this.status <= 599);
  }
}

/**
 * Fonzip hata govdesinden okunabilir bir mesaj cikarir.
 * API hatalari genelde {"error": "..."} seklinde ve Turkce donuyor.
 */
export function describeApiError(status: number, body: unknown): string {
  const generic = HTTP_HINTS[status];
  let detail: string | undefined;

  if (typeof body === "string" && body.trim()) {
    detail = body.trim().slice(0, 500);
  } else if (body && typeof body === "object") {
    const b = body as Record<string, unknown>;
    const raw = b.error ?? b.message ?? b.detail ?? b.errors;
    if (typeof raw === "string") detail = raw;
    else if (raw !== undefined) detail = JSON.stringify(raw).slice(0, 500);
  }

  const parts = [`Fonzip API hatasi (HTTP ${status})`];
  if (detail) parts.push(detail);
  if (generic) parts.push(generic);
  return parts.join(": ");
}

const HTTP_HINTS: Record<number, string> = {
  400: "Istek parametrelerini kontrol edin",
  401: "Erisim reddedildi; FONZIP_CLIENT_ID ve FONZIP_CLIENT_SECRET degerlerini kontrol edin",
  403: "Bu islem icin yetkiniz yok veya istek guvenlik duvari tarafindan engellendi",
  404: "Kayit bulunamadi",
  422: "Gonderilen alanlar dogrulanamadi",
  429: "Dakikada 240 istek sinirini astiniz; bir sure bekleyin",
  500: "Fonzip tarafinda beklenmeyen hata",
  520: "Fonzip destegine basvurun (help@fonzip.com) ve istek atan IP adresini bildirin",
  521: "Fonzip destegine basvurun (help@fonzip.com) ve istek atan IP adresini bildirin",
  523: "Fonzip destegine basvurun (help@fonzip.com) ve istek atan IP adresini bildirin",
};
