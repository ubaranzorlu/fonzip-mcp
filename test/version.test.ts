import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { VERSION } from "../src/version.js";

function readJson(relative: string): Record<string, any> {
  return JSON.parse(readFileSync(new URL(relative, import.meta.url), "utf8"));
}

const pkg = readJson("../package.json");
const server = readJson("../server.json");

describe("surum tutarliligi", () => {
  it("src/version.ts package.json ile ayni", () => {
    expect(VERSION).toBe(pkg.version);
  });

  it("server.json package.json ile ayni surumu bildirir", () => {
    expect(server.version).toBe(pkg.version);
    expect(server.packages[0].version).toBe(pkg.version);
  });
});

describe("yayin meta verisi", () => {
  it("npm paket adi scoped", () => {
    expect(pkg.name).toBe("@ubaranzorlu/fonzip-mcp");
    expect(pkg.publishConfig?.access).toBe("public");
  });

  it("MCP Registry adi package.json ve server.json arasinda esler", () => {
    // Registry, npm paketinin sahipligini bu iki alanin esitligiyle dogruluyor.
    expect(pkg.mcpName).toBe(server.name);
  });

  it("MCP Registry adi GitHub kimligiyle uyumlu", () => {
    // github-oidc ile yayinlarken ad io.github.<kullanici>/ ile baslamak zorunda.
    expect(server.name).toMatch(/^io\.github\.ubaranzorlu\//);
  });

  it("server.json npm paketini isaret ediyor", () => {
    const npmPackage = server.packages.find((p: any) => p.registryType === "npm");
    expect(npmPackage.identifier).toBe(pkg.name);
    expect(npmPackage.transport.type).toBe("stdio");
  });

  it("zorunlu ortam degiskenleri registry kaydinda gizli isaretli", () => {
    const vars: any[] = server.packages[0].environmentVariables;
    for (const name of ["FONZIP_CLIENT_ID", "FONZIP_CLIENT_SECRET"]) {
      const entry = vars.find((v) => v.name === name);
      expect(entry, name).toBeDefined();
      expect(entry.isRequired, name).toBe(true);
      expect(entry.isSecret, name).toBe(true);
    }
  });

  // MCP Registry semasindaki sinirlar (server.schema.json). Bunlar publish
  // sirasinda HTTP 422 ile reddedildigi icin burada erkenden dogrulanir.
  it("server.json aciklamasi registry sinirini asmiyor", () => {
    expect(server.description.length).toBeGreaterThan(0);
    expect(server.description.length).toBeLessThanOrEqual(100);
  });

  it("server.json adi registry bicimine uyuyor", () => {
    expect(server.name.length).toBeGreaterThanOrEqual(3);
    expect(server.name.length).toBeLessThanOrEqual(200);
    expect(server.name).toMatch(/^[a-zA-Z0-9.-]+\/[a-zA-Z0-9._-]+$/);
  });

  it("server.json baslik alani varsa sinir icinde", () => {
    if (server.title !== undefined) {
      expect(server.title.length).toBeLessThanOrEqual(100);
    }
  });

  it("pakette calisma icin gereken dosyalar var", () => {
    expect(pkg.files).toContain("dist");
    expect(pkg.bin["fonzip-mcp"]).toBe("dist/index.js");
  });
});
