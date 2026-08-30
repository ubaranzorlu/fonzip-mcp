/**
 * package.json'daki surumu src/version.ts ve server.json dosyalarina yazar.
 *
 * `npm version <patch|minor|major>` calistirildiginda npm once package.json'i
 * gunceller, sonra "version" script'ini calistirir. Bu script de diger iki
 * dosyayi ayni surume cekip commit'e ekler, boylece uc dosya hicbir zaman
 * ayrisamaz (test/version.test.ts bunu ayrica dogrular).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function read(file: string): string {
  return readFileSync(resolve(ROOT, file), "utf8");
}

function write(file: string, content: string): void {
  writeFileSync(resolve(ROOT, file), content, "utf8");
}

const version = JSON.parse(read("package.json")).version as string;
if (!/^\d+\.\d+\.\d+(-[\w.]+)?$/.test(version)) {
  throw new Error(`package.json icindeki surum beklenen bicimde degil: ${version}`);
}

// src/version.ts
const versionFile = read("src/version.ts");
const updatedVersionFile = versionFile.replace(
  /export const VERSION = "[^"]*";/,
  `export const VERSION = "${version}";`,
);
if (updatedVersionFile === versionFile && !versionFile.includes(`"${version}"`)) {
  throw new Error("src/version.ts icinde VERSION tanimi bulunamadi.");
}
write("src/version.ts", updatedVersionFile);

// server.json: hem sunucu surumu hem npm paketinin surumu.
const server = JSON.parse(read("server.json"));
server.version = version;
for (const pkg of server.packages ?? []) pkg.version = version;
write("server.json", `${JSON.stringify(server, null, 2)}\n`);

console.log(`Surum ${version} olarak esitlendi: package.json, src/version.ts, server.json`);
