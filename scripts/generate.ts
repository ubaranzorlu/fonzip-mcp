/**
 * openapi/fonzip-v2.yaml dosyasindan src/generated/operations.ts uretir.
 *
 * Calistirmak icin: npm run generate
 *
 * Uretilen dosya elle duzenlenmez. Fonzip yeni bir spec yayinladiginda
 * openapi/fonzip-v2.yaml guncellenip bu script tekrar calistirilir.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";
import { TOOLS, ACTION_OVERRIDES, EXCLUDED_OPERATIONS } from "./tool-map.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const SPEC_PATH = resolve(ROOT, "openapi/fonzip-v2.yaml");
const OUT_PATH = resolve(ROOT, "src/generated/operations.ts");

/** Enum listesi bu uzunlugu asarsa sema yerine aciklamaya tasinir. */
const MAX_INLINE_ENUM = 20;
/** Aciklamalarin karakter siniri; tool semalari modelin baglamina giriyor. */
const MAX_DESCRIPTION = 320;

type Json = Record<string, any>;

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;
type HttpMethod = (typeof HTTP_METHODS)[number];

// ---------------------------------------------------------------- $ref cozme

function makeResolver(spec: Json) {
  const seen = new Set<string>();

  function resolveRef(ref: string): Json {
    const parts = ref.replace(/^#\//, "").split("/");
    let node: any = spec;
    for (const part of parts) {
      node = node?.[part.replace(/~1/g, "/").replace(/~0/g, "~")];
      if (node === undefined) throw new Error(`Cozulemeyen $ref: ${ref}`);
    }
    return node;
  }

  /** $ref'leri yerine koyar; dongulere girerse jenerik object dondurur. */
  function deref<T>(node: T): T {
    if (Array.isArray(node)) return node.map((n) => deref(n)) as unknown as T;
    if (!node || typeof node !== "object") return node;

    const obj = node as Json;
    if (typeof obj.$ref === "string") {
      const ref = obj.$ref;
      if (seen.has(ref)) return { type: "object" } as unknown as T;
      seen.add(ref);
      try {
        const target = deref(resolveRef(ref));
        const { $ref, ...siblings } = obj;
        return { ...target, ...siblings } as unknown as T;
      } finally {
        seen.delete(ref);
      }
    }

    const out: Json = {};
    for (const [k, v] of Object.entries(obj)) out[k] = deref(v);
    return out as T;
  }

  return { deref };
}

// ------------------------------------------------------------ sema sadelestirme

const KEEP_KEYS = new Set([
  "type", "enum", "const", "default", "description", "format",
  "items", "properties", "required", "additionalProperties",
  "minimum", "maximum", "minLength", "maxLength", "minItems", "maxItems",
  "pattern", "oneOf", "anyOf",
]);

function trim(text: unknown, limit = MAX_DESCRIPTION): string | undefined {
  if (typeof text !== "string") return undefined;
  const flat = text.replace(/\s+/g, " ").trim();
  if (!flat) return undefined;
  return flat.length > limit ? `${flat.slice(0, limit - 1).trimEnd()}…` : flat;
}

/** OpenAPI 3 semasini MCP istemcilerinin sindirebildigi JSON Schema'ya indirger. */
function toJsonSchema(input: Json | undefined): Json {
  if (!input || typeof input !== "object") return { type: "string" };

  // allOf: tek bir objede birlestir.
  if (Array.isArray(input.allOf)) {
    const merged: Json = { type: "object", properties: {}, required: [] };
    for (const part of input.allOf) {
      const sub = toJsonSchema(part);
      Object.assign(merged.properties, sub.properties ?? {});
      if (Array.isArray(sub.required)) merged.required.push(...sub.required);
      if (sub.description && !merged.description) merged.description = sub.description;
    }
    if (merged.required.length === 0) delete merged.required;
    const rest = toJsonSchema({ ...input, allOf: undefined });
    return { ...merged, ...(rest.description ? { description: rest.description } : {}) };
  }

  const out: Json = {};
  for (const [key, value] of Object.entries(input)) {
    if (!KEEP_KEYS.has(key) || value === undefined) continue;

    if (key === "description") {
      const d = trim(value);
      if (d) out.description = d;
    } else if (key === "items") {
      out.items = toJsonSchema(value as Json);
    } else if (key === "properties") {
      const props: Json = {};
      for (const [pname, pschema] of Object.entries(value as Json)) {
        props[pname] = toJsonSchema(pschema as Json);
      }
      out.properties = props;
    } else if (key === "oneOf" || key === "anyOf") {
      out[key] = (value as Json[]).map((v) => toJsonSchema(v));
    } else if (key === "enum") {
      out.enum = value;
    } else {
      out[key] = value;
    }
  }

  // OpenAPI'ye ozgu nullable -> JSON Schema tip birlesimi.
  if (input.nullable === true && typeof out.type === "string") {
    out.type = [out.type, "null"];
  }

  // Cok uzun enum listelerini semadan cikarip aciklamaya tasi: tool semasi
  // her istekte modele gonderiliyor, 50 elemanli enum'lar bosuna yer kapliyor.
  if (Array.isArray(out.enum) && out.enum.length > MAX_INLINE_ENUM) {
    const values = out.enum.join(", ");
    out.description = trim(
      `${out.description ? `${out.description}. ` : ""}Gecerli degerler: ${values}`,
      1600,
    );
    delete out.enum;
  }

  if (!out.type && !out.oneOf && !out.anyOf && !out.enum && !out.properties) {
    out.type = "string";
  }
  return out;
}

// ---------------------------------------------------------------- action adlari

const IRREGULAR_PLURALS: Record<string, string> = { person: "people" };

function pluralize(word: string): string {
  if (IRREGULAR_PLURALS[word]) return IRREGULAR_PLURALS[word]!;
  if (/(s|x|z|ch|sh)$/.test(word)) return `${word}es`;
  if (/[^aeiou]y$/.test(word)) return `${word.slice(0, -1)}ies`;
  return `${word}s`;
}

function snakeTokens(operationId: string): string[] {
  return operationId
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .toLowerCase()
    .split(/[\s_\-]+/)
    .filter(Boolean);
}

const FILLER_TOKENS = new Set(["to", "for", "from", "of", "the", "a", "an"]);

/**
 * operationId'yi kisa bir action adina cevirir.
 *   getDonationList (strip: donation) -> list
 *   getTicketSaleDetails             -> get_ticket_sale
 *   createEvent      (strip: event)  -> create
 */
function deriveAction(operationId: string, strip: string[]): string {
  const override = ACTION_OVERRIDES[operationId];
  if (override) return override;

  const stripSet = new Set(strip.map((s) => s.toLowerCase()));
  let tokens = snakeTokens(operationId).filter(
    (t) => !stripSet.has(t) && !FILLER_TOKENS.has(t),
  );

  const isList = tokens.at(-1) === "list";
  const isDetails = tokens.at(-1) === "details" || tokens.at(-1) === "detail";
  if (isList || isDetails) tokens = tokens.slice(0, -1);
  if (tokens[0] === "get") tokens = tokens.slice(1);

  if (isList) {
    const rest = tokens.length ? [pluralize(tokens.at(-1)!)] : [];
    tokens = ["list", ...tokens.slice(0, -1), ...rest];
  } else if (isDetails) {
    tokens = ["get", ...tokens];
  }

  const action = tokens.join("_");
  if (!action) throw new Error(`${operationId} icin action adi uretilemedi`);
  return action;
}

// ---------------------------------------------------------------- ana akis

interface ParamOut {
  name: string;
  in: "path" | "query" | "body";
  required: boolean;
  /**
   * Spec'te required olan ama varsayilani bulunan parametreler icin doldurulur.
   * Cagiran gondermezse istemci bu degeri kendisi ekler, boylece basit cagrilar
   * (ornegin fonzip_tags list) sayfalama alani zorunlu olmadan calisir.
   */
  defaultValue?: unknown;
  schema: Json;
}

interface OperationOut {
  action: string;
  operationId: string;
  method: string;
  path: string;
  summary?: string;
  params: ParamOut[];
  bodyContentType?: string;
  bodyRequired: boolean;
}

interface ToolOut {
  name: string;
  description: string;
  readOnly: boolean;
  actions: OperationOut[];
}

function main(): void {
  const spec = parseYaml(readFileSync(SPEC_PATH, "utf8")) as Json;
  const { deref } = makeResolver(spec);

  const byTag = new Map<
    string,
    Array<{ method: HttpMethod; path: string; op: Json; pathParams: Json[] }>
  >();
  for (const [path, item] of Object.entries(spec.paths as Json)) {
    for (const method of HTTP_METHODS) {
      const op = (item as Json)[method];
      if (!op) continue;
      const tag = (op.tags?.[0] as string) ?? "System";
      if (!byTag.has(tag)) byTag.set(tag, []);
      // OpenAPI'de parametreler path seviyesinde de tanimlanabilir; spec'teki 73
      // path'in 35'i bunu kullaniyor. Operasyon seviyesindeki ayni ad+konum
      // eslesmesi path seviyesindekini ezer.
      byTag.get(tag)!.push({
        method,
        path,
        op,
        pathParams: ((item as Json).parameters ?? []) as Json[],
      });
    }
  }

  const usedTags = new Set<string>();
  const tools: ToolOut[] = [];
  let opCount = 0;

  for (const toolSpec of TOOLS) {
    const actions: OperationOut[] = [];
    const takenActions = new Map<string, string>();

    for (const tag of toolSpec.tags) {
      usedTags.add(tag);
      const entries = byTag.get(tag);
      if (!entries) throw new Error(`Spec'te bulunmayan tag: ${tag}`);

      for (const { method, path, op, pathParams } of entries) {
        const operationId = op.operationId as string;
        if (!operationId) throw new Error(`${method} ${path} icin operationId yok`);
        if (EXCLUDED_OPERATIONS.has(operationId)) continue;

        const action = deriveAction(operationId, toolSpec.strip ?? []);
        const clash = takenActions.get(action);
        if (clash) {
          throw new Error(
            `${toolSpec.name} icinde action cakismasi: "${action}" hem ${clash} hem ${operationId} tarafindan uretildi. ` +
              `scripts/tool-map.ts icindeki ACTION_OVERRIDES'a bir giris ekleyin.`,
          );
        }
        takenActions.set(action, operationId);

        actions.push(buildOperation({ action, operationId, method, path, op, pathParams, deref }));
        opCount += 1;
      }
    }

    actions.sort((a, b) => a.action.localeCompare(b.action));
    tools.push({
      name: toolSpec.name,
      description: toolSpec.description,
      readOnly: actions.every((a) => a.method === "GET"),
      actions,
    });
  }

  // Spec'e yeni bir tag eklendiginde sessizce dusmesin.
  const orphans = [...byTag.keys()].filter((t) => !usedTags.has(t));
  if (orphans.length) {
    throw new Error(
      `Hicbir tool'a baglanmamis tag(ler): ${orphans.join(", ")}. ` +
        `scripts/tool-map.ts icindeki TOOLS listesine ekleyin.`,
    );
  }

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, render(spec, tools), "utf8");

  console.log(
    `Uretildi: ${OUT_PATH}\n  ${tools.length} tool, ${opCount} operasyon ` +
      `(${EXCLUDED_OPERATIONS.size} operasyon disarida birakildi)`,
  );
  for (const t of tools) {
    console.log(`  ${t.name.padEnd(34)} ${String(t.actions.length).padStart(2)} action${t.readOnly ? "  [read-only]" : ""}`);
  }
}

function buildOperation(args: {
  action: string;
  operationId: string;
  method: HttpMethod;
  path: string;
  op: Json;
  pathParams: Json[];
  deref: <T>(n: T) => T;
}): OperationOut {
  const { action, operationId, method, path, op, pathParams, deref } = args;
  const params: ParamOut[] = [];
  const byName = new Map<string, ParamOut>();

  const push = (p: ParamOut) => {
    const existing = byName.get(p.name);
    if (existing) {
      // Ayni ad hem path hem body'de gecerse path kazanir; body'deki golgede kalir.
      if (existing.in === "path") return;
      params.splice(params.indexOf(existing), 1);
    }
    byName.set(p.name, p);
    params.push(p);
  };

  for (const raw of [...pathParams, ...((op.parameters ?? []) as Json[])]) {
    const p = deref(raw);
    if (p.in !== "path" && p.in !== "query") continue;
    const schema = toJsonSchema(p.schema);
    const description = trim(p.description);
    if (description) schema.description = description;

    const specRequired = p.in === "path" ? true : Boolean(p.required);
    // Varsayilani olan zorunlu parametreler cagirana zorunlu gosterilmez;
    // istek kurulurken varsayilan deger otomatik eklenir.
    const hasDefault = p.in !== "path" && schema.default !== undefined;
    push({
      name: p.name,
      in: p.in,
      required: specRequired && !hasDefault,
      ...(specRequired && hasDefault ? { defaultValue: schema.default } : {}),
      schema,
    });
  }

  let bodyContentType: string | undefined;
  let bodyRequired = false;
  const body = op.requestBody ? deref(op.requestBody) : undefined;
  if (body?.content) {
    bodyContentType =
      "application/json" in body.content
        ? "application/json"
        : Object.keys(body.content)[0];
    bodyRequired = Boolean(body.required);
    const bodySchema = toJsonSchema(body.content[bodyContentType!]?.schema);
    const requiredNames = new Set<string>(bodySchema.required ?? []);
    for (const [name, schema] of Object.entries(bodySchema.properties ?? {})) {
      push({ name, in: "body", required: requiredNames.has(name), schema: schema as Json });
    }
  }

  return {
    action,
    operationId,
    method: method.toUpperCase(),
    path,
    summary: trim(op.summary ?? op.description, 200),
    params,
    bodyContentType,
    bodyRequired,
  };
}

function render(spec: Json, tools: ToolOut[]): string {
  const version = spec.info?.version ?? "unknown";
  const baseUrl = spec.servers?.[0]?.url ?? "https://fonzip.com/api/v2";
  return `// Bu dosya otomatik uretildi. Elle duzenlemeyin.
// Kaynak: openapi/fonzip-v2.yaml (Fonzip API v${version})
// Yeniden uretmek icin: npm run generate

import type { ToolGroup } from "../types.js";

/** Uretimde kullanilan OpenAPI spec surumu. */
export const SPEC_VERSION = ${JSON.stringify(version)};

/** Spec'te tanimli varsayilan API adresi. */
export const DEFAULT_BASE_URL = ${JSON.stringify(baseUrl)};

export const TOOL_GROUPS: ToolGroup[] = ${JSON.stringify(tools, null, 2)};
`;
}

main();
