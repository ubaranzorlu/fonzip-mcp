import { describe, expect, it } from "vitest";
import { loadConfig } from "../src/config.js";
import { ConfigError } from "../src/errors.js";

const creds = { FONZIP_CLIENT_ID: "id", FONZIP_CLIENT_SECRET: "secret" };

describe("loadConfig", () => {
  it("client id/secret ile varsayilanlari doldurur", () => {
    const config = loadConfig({ ...creds } as NodeJS.ProcessEnv);
    expect(config.baseUrl).toBe("https://fonzip.com/api/v2");
    expect(config.schemaMode).toBe("full");
    expect(config.timeoutMs).toBe(30_000);
    expect(config.maxRetries).toBe(3);
    expect(config.userAgent).toMatch(/^fonzip-mcp\//);
  });

  it("kimlik bilgisi yoksa hata verir", () => {
    expect(() => loadConfig({} as NodeJS.ProcessEnv)).toThrow(ConfigError);
  });

  it("sadece access token yeterlidir", () => {
    const config = loadConfig({ FONZIP_ACCESS_TOKEN: "abc" } as NodeJS.ProcessEnv);
    expect(config.accessToken).toBe("abc");
  });

  it("base url sonundaki slash'i atar", () => {
    const config = loadConfig({ ...creds, FONZIP_BASE_URL: "https://ornek.test/api/v2/" } as NodeJS.ProcessEnv);
    expect(config.baseUrl).toBe("https://ornek.test/api/v2");
  });

  it("gecersiz base url reddedilir", () => {
    expect(() => loadConfig({ ...creds, FONZIP_BASE_URL: "yok" } as NodeJS.ProcessEnv)).toThrow(ConfigError);
  });

  it("gecersiz schema mode reddedilir", () => {
    expect(() => loadConfig({ ...creds, FONZIP_SCHEMA_MODE: "kisa" } as NodeJS.ProcessEnv)).toThrow(ConfigError);
  });

  it("sayisal degiskenleri araliga gore dogrular", () => {
    expect(loadConfig({ ...creds, FONZIP_MAX_RETRIES: "0" } as NodeJS.ProcessEnv).maxRetries).toBe(0);
    expect(() => loadConfig({ ...creds, FONZIP_MAX_RETRIES: "99" } as NodeJS.ProcessEnv)).toThrow(ConfigError);
    expect(() => loadConfig({ ...creds, FONZIP_TIMEOUT_MS: "abc" } as NodeJS.ProcessEnv)).toThrow(ConfigError);
  });
});
