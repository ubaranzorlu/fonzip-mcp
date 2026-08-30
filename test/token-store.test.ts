import { mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { defaultTokenCachePath, FileTokenStore } from "../src/token-store.js";

let dir: string;
let path: string;

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), "fonzip-mcp-test-"));
  path = join(dir, "nested", "tokens.json");
});

afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

const HOUR = 3_600_000;

describe("FileTokenStore", () => {
  it("yazip geri okur", () => {
    const store = new FileTokenStore(path, "https://fonzip.com/api/v2", "client-a");
    store.write({ accessToken: "t1", expiresAt: Date.now() + HOUR });
    expect(store.read()?.accessToken).toBe("t1");
  });

  it("yeni surecte de okunabilir", () => {
    new FileTokenStore(path, "https://fonzip.com/api/v2", "client-a").write({
      accessToken: "t1",
      expiresAt: Date.now() + HOUR,
    });
    const fresh = new FileTokenStore(path, "https://fonzip.com/api/v2", "client-a");
    expect(fresh.read()?.accessToken).toBe("t1");
  });

  it("suresi dolmus token dondurmez", () => {
    const store = new FileTokenStore(path, "https://fonzip.com/api/v2", "client-a");
    store.write({ accessToken: "eski", expiresAt: Date.now() - 1_000 });
    expect(store.read()).toBeUndefined();
  });

  it("farkli client'lari ayirir", () => {
    const a = new FileTokenStore(path, "https://fonzip.com/api/v2", "client-a");
    const b = new FileTokenStore(path, "https://fonzip.com/api/v2", "client-b");
    a.write({ accessToken: "ta", expiresAt: Date.now() + HOUR });
    b.write({ accessToken: "tb", expiresAt: Date.now() + HOUR });
    expect(a.read()?.accessToken).toBe("ta");
    expect(b.read()?.accessToken).toBe("tb");
  });

  it("farkli base url'leri ayirir", () => {
    const canli = new FileTokenStore(path, "https://fonzip.com/api/v2", "client-a");
    const test = new FileTokenStore(path, "https://test.fonzip.com/api/v2", "client-a");
    canli.write({ accessToken: "canli", expiresAt: Date.now() + HOUR });
    expect(test.read()).toBeUndefined();
  });

  it("client id'yi diske yazmaz", () => {
    const store = new FileTokenStore(path, "https://fonzip.com/api/v2", "gizli-client-id");
    store.write({ accessToken: "t1", expiresAt: Date.now() + HOUR });
    expect(readFileSync(path, "utf8")).not.toContain("gizli-client-id");
  });

  it("dosyayi sadece sahibinin okuyabilecegi izinle olusturur", () => {
    const store = new FileTokenStore(path, "https://fonzip.com/api/v2", "client-a");
    store.write({ accessToken: "t1", expiresAt: Date.now() + HOUR });
    expect(statSync(path).mode & 0o077).toBe(0);
  });

  it("clear kaydi siler", () => {
    const store = new FileTokenStore(path, "https://fonzip.com/api/v2", "client-a");
    store.write({ accessToken: "t1", expiresAt: Date.now() + HOUR });
    store.clear();
    expect(store.read()).toBeUndefined();
  });

  it("clear diger client'in kaydina dokunmaz", () => {
    const a = new FileTokenStore(path, "https://fonzip.com/api/v2", "client-a");
    const b = new FileTokenStore(path, "https://fonzip.com/api/v2", "client-b");
    a.write({ accessToken: "ta", expiresAt: Date.now() + HOUR });
    b.write({ accessToken: "tb", expiresAt: Date.now() + HOUR });
    a.clear();
    expect(b.read()?.accessToken).toBe("tb");
  });

  it("yazarken suresi dolmus kayitlari temizler", () => {
    const eski = new FileTokenStore(path, "https://fonzip.com/api/v2", "eski-client");
    eski.write({ accessToken: "eski", expiresAt: Date.now() + 50 });
    const yeni = new FileTokenStore(path, "https://fonzip.com/api/v2", "yeni-client");
    // Suresi dolmus kaydin uzerine yazilinca dosyada tek kayit kalmali.
    eski.write({ accessToken: "eski", expiresAt: Date.now() - 1 });
    yeni.write({ accessToken: "yeni", expiresAt: Date.now() + HOUR });
    expect(Object.keys(JSON.parse(readFileSync(path, "utf8")))).toHaveLength(1);
  });

  it("bozuk dosyada cokmez", () => {
    const store = new FileTokenStore(join(dir, "bozuk.json"), "https://fonzip.com/api/v2", "client-a");
    writeFileSync(join(dir, "bozuk.json"), "{ bu json degil");
    expect(store.read()).toBeUndefined();
    expect(() => store.write({ accessToken: "t1", expiresAt: Date.now() + HOUR })).not.toThrow();
    expect(store.read()?.accessToken).toBe("t1");
  });

  it("yazilamayan yolda hata firlatmaz", () => {
    const store = new FileTokenStore("/dev/null/olmaz/tokens.json", "https://fonzip.com/api/v2", "client-a");
    expect(() => store.write({ accessToken: "t1", expiresAt: Date.now() + HOUR })).not.toThrow();
    expect(store.read()).toBeUndefined();
  });
});

describe("defaultTokenCachePath", () => {
  it("XDG_CACHE_HOME varsa onu kullanir", () => {
    const path = defaultTokenCachePath({ XDG_CACHE_HOME: "/ornek/cache" } as NodeJS.ProcessEnv);
    expect(path).toBe("/ornek/cache/fonzip-mcp/tokens.json");
  });

  it("XDG_CACHE_HOME yoksa ~/.cache altina duser", () => {
    const path = defaultTokenCachePath({} as NodeJS.ProcessEnv);
    expect(path).toMatch(/\.cache\/fonzip-mcp\/tokens\.json$/);
  });
});
