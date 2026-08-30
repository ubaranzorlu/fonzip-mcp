import { describe, expect, it } from "vitest";
import { ValidationError } from "../src/errors.js";
import { buildCompactSchema, buildFullSchema, describeActions, validateCall } from "../src/schema.js";
import type { ToolGroup } from "../src/types.js";

const group: ToolGroup = {
  name: "fonzip_test",
  description: "Test grubu",
  readOnly: false,
  actions: [
    {
      action: "list",
      operationId: "listThings",
      method: "GET",
      path: "/things",
      params: [
        { name: "status", in: "query", required: true, schema: { type: "string", enum: ["paid", "refund"] } },
        { name: "how_many", in: "query", required: false, schema: { type: "integer", minimum: 1, maximum: 100 } },
        { name: "fields", in: "query", required: false, schema: { type: "array", items: { type: "string" } } },
      ],
      bodyRequired: false,
    },
    {
      action: "get",
      operationId: "getThing",
      method: "GET",
      path: "/thing/{thing_id}",
      params: [{ name: "thing_id", in: "path", required: true, schema: { type: "integer" } }],
      bodyRequired: false,
    },
  ],
};

describe("buildFullSchema", () => {
  it("action enum'u ve tum parametreleri birlestirir", () => {
    const schema = buildFullSchema(group);
    expect(schema.properties.action?.enum).toEqual(["list", "get"]);
    expect(Object.keys(schema.properties).sort()).toEqual(["action", "fields", "how_many", "status", "thing_id"]);
    expect(schema.required).toEqual(["action"]);
  });

  it("her alanin hangi action'a ait oldugunu aciklamaya yazar", () => {
    const schema = buildFullSchema(group);
    expect(schema.properties.status?.description).toContain("[list]");
    expect(schema.properties.status?.description).toContain("Zorunlu: list");
    expect(schema.properties.thing_id?.description).toContain("[get]");
  });
});

describe("buildCompactSchema", () => {
  it("sadece action ve params tasir", () => {
    const schema = buildCompactSchema(group);
    expect(Object.keys(schema.properties).sort()).toEqual(["action", "params"]);
  });

  it("full semadan belirgin sekilde kucuktur", () => {
    expect(JSON.stringify(buildCompactSchema(group)).length)
      .toBeLessThan(JSON.stringify(buildFullSchema(group)).length);
  });
});

describe("describeActions", () => {
  it("zorunlu ve opsiyonel alanlari listeler", () => {
    const text = describeActions(group);
    expect(text).toContain("- list (GET) | zorunlu: status | opsiyonel: how_many, fields");
    expect(text).toContain("- get (GET) | zorunlu: thing_id");
  });
});

describe("validateCall", () => {
  it("gecerli cagriyi operasyona baglar", () => {
    const result = validateCall(group, { action: "list", status: "paid", how_many: 10 }, "full");
    expect(result.operation.operationId).toBe("listThings");
    expect(result.args).toEqual({ status: "paid", how_many: 10 });
  });

  it("compact moddaki params objesini acar", () => {
    const result = validateCall(group, { action: "get", params: { thing_id: 7 } }, "compact");
    expect(result.args).toEqual({ thing_id: 7 });
  });

  it("params ile duz alanlari birlikte kabul eder", () => {
    const result = validateCall(group, { action: "list", status: "paid", params: { how_many: 5 } }, "compact");
    expect(result.args).toEqual({ status: "paid", how_many: 5 });
  });

  it("action eksikse hata verir", () => {
    expect(() => validateCall(group, {}, "full")).toThrow(ValidationError);
  });

  it("bilinmeyen action'da secenekleri listeler", () => {
    expect(() => validateCall(group, { action: "yok" }, "full")).toThrow(/Secenekler: list, get/);
  });

  it("zorunlu alan eksikse hata mesajina semayi ekler", () => {
    try {
      validateCall(group, { action: "list" }, "full");
      expect.unreachable("hata bekleniyordu");
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      const details = (error as ValidationError).details as { expectedSchema: { required: string[] } };
      expect(details.expectedSchema.required).toEqual(["status"]);
      expect((error as Error).message).toContain("status: zorunlu alan eksik");
    }
  });

  it("enum disi degeri reddeder", () => {
    expect(() => validateCall(group, { action: "list", status: "hepsi" }, "full")).toThrow(/gecersiz deger/);
  });

  it("yanlis tipi reddeder", () => {
    expect(() => validateCall(group, { action: "get", thing_id: "yedi" }, "full")).toThrow(/integer bekleniyordu/);
  });

  it("sayisal siniri uygular", () => {
    expect(() => validateCall(group, { action: "list", status: "paid", how_many: 500 }, "full"))
      .toThrow(/en fazla 100/);
  });

  it("dizi elemanlarini kontrol eder", () => {
    expect(() => validateCall(group, { action: "list", status: "paid", fields: [1] }, "full"))
      .toThrow(/fields\[0\]: string bekleniyordu/);
  });

  it("baska action'a ait alanlari reddeder", () => {
    expect(() => validateCall(group, { action: "get", thing_id: 1, status: "paid" }, "full"))
      .toThrow(/tanimiyor: status/);
  });
});
