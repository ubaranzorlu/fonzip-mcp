import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";

/**
 * Token'i surecler arasinda saklar.
 *
 * Fonzip bir client icin ayni anda tek bir erisim token'i tutar: gecerli bir
 * token varken /token cagrisi HTTP 409 "Token already created" doner. MCP
 * sunuculari sik sik yeniden baslatildigindan, token diske yazilmazsa sunucu
 * bir saate kadar kullanilamaz hale gelir.
 */
export interface StoredToken {
  accessToken: string;
  /** Unix zamani (ms). */
  expiresAt: number;
}

export interface TokenStore {
  read(): StoredToken | undefined;
  write(token: StoredToken): void;
  clear(): void;
}

/** Hicbir sey saklamayan store; FONZIP_TOKEN_CACHE=off icin. */
export const nullTokenStore: TokenStore = {
  read: () => undefined,
  write: () => {},
  clear: () => {},
};

/** Varsayilan onbellek dosyasi yolu. */
export function defaultTokenCachePath(env: NodeJS.ProcessEnv = process.env): string {
  const base = env.XDG_CACHE_HOME?.trim() || join(homedir(), ".cache");
  return join(base, "fonzip-mcp", "tokens.json");
}

/** Client secret diske yazilmaz; yalnizca ondan turetilen kisa bir anahtar tutulur. */
function cacheKey(baseUrl: string, clientId: string): string {
  return createHash("sha256").update(`${baseUrl} ${clientId}`).digest("hex").slice(0, 32);
}

type CacheFile = Record<string, StoredToken>;

/**
 * Token'i JSON dosyasinda saklar. Dosya 0600, dizin 0700 izinleriyle olusturulur.
 * Okuma/yazma hatalari yutulur: onbellek bir kolaylik, zorunluluk degil.
 */
export class FileTokenStore implements TokenStore {
  private readonly key: string;

  constructor(
    private readonly path: string,
    baseUrl: string,
    clientId: string,
  ) {
    this.key = cacheKey(baseUrl, clientId);
  }

  read(): StoredToken | undefined {
    const entry = this.readFile()[this.key];
    if (!entry?.accessToken || typeof entry.expiresAt !== "number") return undefined;
    if (entry.expiresAt <= Date.now()) return undefined;
    return entry;
  }

  write(token: StoredToken): void {
    try {
      mkdirSync(dirname(this.path), { recursive: true, mode: 0o700 });
      const data = this.readFile();
      data[this.key] = token;
      // Suresi dolmus kayitlari temizle; dosya sinirsiz buyumesin.
      for (const [key, value] of Object.entries(data)) {
        if (value.expiresAt <= Date.now()) delete data[key];
      }
      writeFileSync(this.path, JSON.stringify(data), { encoding: "utf8", mode: 0o600 });
    } catch {
      // Yazilamiyorsa sunucu yine calisir, sadece yeniden baslatmada token kaybolur.
    }
  }

  clear(): void {
    try {
      const data = this.readFile();
      if (!(this.key in data)) return;
      delete data[this.key];
      if (Object.keys(data).length === 0) rmSync(this.path, { force: true });
      else writeFileSync(this.path, JSON.stringify(data), { encoding: "utf8", mode: 0o600 });
    } catch {
      // yoksay
    }
  }

  private readFile(): CacheFile {
    try {
      const parsed: unknown = JSON.parse(readFileSync(this.path, "utf8"));
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return parsed as CacheFile;
    } catch {
      // dosya yok veya bozuk: bostan basla
    }
    return {};
  }
}
