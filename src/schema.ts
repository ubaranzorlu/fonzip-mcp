import type { SchemaMode } from "./config.js";
import { ValidationError } from "./errors.js";
import type { JsonSchemaNode, Operation, ToolGroup } from "./types.js";

/** MCP tool'unun inputSchema alani (JSON Schema object). */
export interface ToolInputSchema extends JsonSchemaNode {
  type: "object";
  properties: Record<string, JsonSchemaNode>;
  required: string[];
  additionalProperties?: boolean;
}

const ACTION_DESCRIPTION =
  "Yapilacak islem. Her action'in kendi zorunlu alanlari vardir; asagidaki aciklamalarda " +
  "hangi alanin hangi action'a ait oldugu koseli parantez icinde belirtilir.";

/** Bir action'in tek basina JSON Schema'si. Hata mesajlarinda ve compact modda kullanilir. */
export function schemaForAction(operation: Operation): ToolInputSchema {
  const properties: Record<string, JsonSchemaNode> = {};
  const required: string[] = [];
  for (const param of operation.params) {
    properties[param.name] = param.schema;
    if (param.required) required.push(param.name);
  }
  return { type: "object", properties, required };
}

/**
 * Grubun tum action'larini tek bir sema altinda birlestirir.
 *
 * JSON Schema seviyesinde yalnizca "action" zorunlu tutulur; action'a ozel zorunlu
 * alanlar sunucu tarafinda dogrulanir (bkz. validateArgs). Boylece tek bir duz sema
 * her MCP istemcisinde calisir, oneOf/discriminator destegi gerekmez.
 */
export function buildFullSchema(group: ToolGroup): ToolInputSchema {
  const properties: Record<string, JsonSchemaNode> = {
    action: {
      type: "string",
      enum: group.actions.map((a) => a.action),
      description: ACTION_DESCRIPTION,
    },
  };

  const usedBy = new Map<string, string[]>();
  const requiredBy = new Map<string, string[]>();

  for (const operation of group.actions) {
    for (const param of operation.params) {
      if (!usedBy.has(param.name)) {
        usedBy.set(param.name, []);
        properties[param.name] = { ...param.schema };
      }
      usedBy.get(param.name)!.push(operation.action);
      if (param.required) {
        if (!requiredBy.has(param.name)) requiredBy.set(param.name, []);
        requiredBy.get(param.name)!.push(operation.action);
      }
    }
  }

  const actionCount = group.actions.length;
  for (const [name, actions] of usedBy) {
    const schema = properties[name]!;
    const req = requiredBy.get(name) ?? [];
    const scope = actions.length === actionCount ? "tum action'lar" : actions.join(", ");
    const requiredNote = req.length ? ` Zorunlu: ${req.join(", ")}.` : "";
    schema.description = `[${scope}]${requiredNote}${schema.description ? ` ${schema.description}` : ""}`;
  }

  return { type: "object", properties, required: ["action"] };
}

/**
 * Kucuk sema: yalnizca action enum'u ve serbest bir params objesi.
 * Alan adlari tool aciklamasina ozetlenir; ayrintili sema hata mesajiyla doner.
 */
export function buildCompactSchema(group: ToolGroup): ToolInputSchema {
  return {
    type: "object",
    properties: {
      action: {
        type: "string",
        enum: group.actions.map((a) => a.action),
        description: ACTION_DESCRIPTION,
      },
      params: {
        type: "object",
        description:
          "Action'a ait parametreler. Alan adlari tool aciklamasinda listelenmistir. " +
          "Eksik veya hatali alan gonderirseniz hata mesaji beklenen tam semayi dondurur.",
        additionalProperties: true,
      },
    },
    required: ["action"],
  };
}

/** compact modda tool aciklamasina eklenen action ozeti. */
export function describeActions(group: ToolGroup): string {
  const lines = group.actions.map((operation) => {
    const required = operation.params.filter((p) => p.required).map((p) => p.name);
    const optional = operation.params.filter((p) => !p.required).map((p) => p.name);
    const parts = [`- ${operation.action} (${operation.method})`];
    if (required.length) parts.push(`zorunlu: ${required.join(", ")}`);
    if (optional.length) parts.push(`opsiyonel: ${optional.join(", ")}`);
    return parts.join(" | ");
  });
  return `\n\nAction'lar:\n${lines.join("\n")}`;
}

export function buildToolSchema(group: ToolGroup, mode: SchemaMode): ToolInputSchema {
  return mode === "compact" ? buildCompactSchema(group) : buildFullSchema(group);
}

export function buildToolDescription(group: ToolGroup, mode: SchemaMode): string {
  return mode === "compact" ? group.description + describeActions(group) : group.description;
}

// ------------------------------------------------------------------ dogrulama

/** Tek bir degeri semaya gore kontrol eder; hata mesajlarini toplar. */
function checkValue(path: string, value: unknown, schema: JsonSchemaNode, errors: string[]): void {
  const types = schema.type === undefined ? [] : Array.isArray(schema.type) ? schema.type : [schema.type];

  if (value === null) {
    if (types.length && !types.includes("null")) errors.push(`${path}: null olamaz`);
    return;
  }

  if (types.length) {
    const actual = Array.isArray(value) ? "array" : typeof value;
    const ok = types.some((t) => {
      if (t === "integer") return typeof value === "number" && Number.isInteger(value);
      if (t === "number") return typeof value === "number";
      if (t === "array") return Array.isArray(value);
      if (t === "object") return actual === "object";
      if (t === "null") return false;
      return actual === t;
    });
    if (!ok) {
      errors.push(`${path}: ${types.join(" veya ")} bekleniyordu, ${actual} geldi`);
      return;
    }
  }

  if (schema.enum && !schema.enum.some((e) => e === value)) {
    errors.push(`${path}: gecersiz deger ${JSON.stringify(value)}. Izin verilenler: ${schema.enum.map((e) => JSON.stringify(e)).join(", ")}`);
  }
  if (typeof value === "number") {
    if (schema.minimum !== undefined && value < schema.minimum) errors.push(`${path}: en az ${schema.minimum} olmali`);
    if (schema.maximum !== undefined && value > schema.maximum) errors.push(`${path}: en fazla ${schema.maximum} olmali`);
  }
  if (typeof value === "string") {
    if (schema.minLength !== undefined && value.length < schema.minLength) errors.push(`${path}: en az ${schema.minLength} karakter olmali`);
    if (schema.maxLength !== undefined && value.length > schema.maxLength) errors.push(`${path}: en fazla ${schema.maxLength} karakter olmali`);
  }
  if (Array.isArray(value) && schema.items) {
    value.forEach((item, i) => checkValue(`${path}[${i}]`, item, schema.items!, errors));
  }
  if (schema.properties && value && typeof value === "object" && !Array.isArray(value)) {
    for (const [key, sub] of Object.entries(schema.properties)) {
      const inner = (value as Record<string, unknown>)[key];
      if (inner !== undefined) checkValue(`${path}.${key}`, inner, sub, errors);
    }
  }
}

export interface ValidatedCall {
  operation: Operation;
  args: Record<string, unknown>;
}

/**
 * Tool cagrisini bir operasyona baglar ve argumanlari dogrular.
 * Basarisiz olursa hata mesaji beklenen semayi da icerir; model tek turda duzeltebilir.
 */
export function validateCall(
  group: ToolGroup,
  rawArgs: Record<string, unknown> | undefined,
  mode: SchemaMode,
): ValidatedCall {
  const input = rawArgs ?? {};
  const actionName = input.action;

  if (typeof actionName !== "string") {
    throw new ValidationError(
      `${group.name} icin "action" alani zorunlu. Secenekler: ${group.actions.map((a) => a.action).join(", ")}`,
    );
  }

  const operation = group.actions.find((a) => a.action === actionName);
  if (!operation) {
    throw new ValidationError(
      `${group.name} icin bilinmeyen action "${actionName}". Secenekler: ${group.actions.map((a) => a.action).join(", ")}`,
    );
  }

  // full modda parametreler ust seviyede, compact modda "params" altinda gelir.
  // Her iki bicimi de kabul et: model karistirirsa cagri yine calissin.
  const nested = input.params;
  const flat: Record<string, unknown> = { ...input };
  delete flat.action;
  delete flat.params;
  const provided: Record<string, unknown> =
    nested && typeof nested === "object" && !Array.isArray(nested)
      ? { ...flat, ...(nested as Record<string, unknown>) }
      : flat;

  const known = new Map(operation.params.map((p) => [p.name, p]));
  const errors: string[] = [];
  const args: Record<string, unknown> = {};

  for (const param of operation.params) {
    const value = provided[param.name];
    if (value === undefined) {
      if (param.required) errors.push(`${param.name}: zorunlu alan eksik`);
      continue;
    }
    checkValue(param.name, value, param.schema, errors);
    args[param.name] = value;
  }

  const unknownKeys = Object.keys(provided).filter((k) => !known.has(k));
  if (unknownKeys.length) {
    errors.push(`${actionName} action'i su alanlari tanimiyor: ${unknownKeys.join(", ")}`);
  }

  if (errors.length) {
    throw new ValidationError(
      `${group.name} / ${actionName} cagrisi gecersiz:\n- ${errors.join("\n- ")}`,
      { expectedSchema: schemaForAction(operation), mode },
    );
  }

  return { operation, args };
}
