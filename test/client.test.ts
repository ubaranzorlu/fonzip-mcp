import { describe, expect, it } from "vitest";
import { buildRequest } from "../src/client.js";
import type { Operation } from "../src/types.js";

const BASE = "https://fonzip.com/api/v2";

function op(overrides: Partial<Operation>): Operation {
  return {
    action: "test",
    operationId: "test",
    method: "GET",
    path: "/things",
    params: [],
    bodyRequired: false,
    ...overrides,
  };
}

describe("buildRequest", () => {
  it("path parametresini sablona yerlestirir", () => {
    const request = buildRequest(
      op({ path: "/user/{user_id}", params: [{ name: "user_id", in: "path", required: true, schema: { type: "integer" } }] }),
      { user_id: 42 },
      BASE,
    );
    expect(request.url).toBe(`${BASE}/user/42`);
  });

  it("path degerlerini url-encode eder", () => {
    const request = buildRequest(
      op({
        path: "/communication-permissions/{permission_type}/{permission_value}",
        params: [
          { name: "permission_type", in: "path", required: true, schema: { type: "string" } },
          { name: "permission_value", in: "path", required: true, schema: { type: "string" } },
        ],
      }),
      { permission_type: "email", permission_value: "a b@ornek.test" },
      BASE,
    );
    expect(request.url).toBe(`${BASE}/communication-permissions/email/a%20b%40ornek.test`);
  });

  it("query parametrelerini ekler", () => {
    const request = buildRequest(
      op({
        params: [
          { name: "status", in: "query", required: true, schema: { type: "string" } },
          { name: "how_many", in: "query", required: false, schema: { type: "integer" } },
        ],
      }),
      { status: "paid", how_many: 50 },
      BASE,
    );
    expect(request.url).toBe(`${BASE}/things?status=paid&how_many=50`);
  });

  it("dizi query parametrelerini tekrarlanan anahtar olarak gonderir", () => {
    const request = buildRequest(
      op({ params: [{ name: "list", in: "query", required: false, schema: { type: "array", items: { type: "string" } } }] }),
      { list: ["amount", "email"] },
      BASE,
    );
    expect(request.url).toBe(`${BASE}/things?list=amount&list=email`);
  });

  it("boolean degerleri true/false olarak yazar", () => {
    const request = buildRequest(
      op({ params: [{ name: "no_category", in: "query", required: false, schema: { type: "boolean" } }] }),
      { no_category: false },
      BASE,
    );
    expect(request.url).toBe(`${BASE}/things?no_category=false`);
  });

  it("tanimsiz degerleri atlar", () => {
    const request = buildRequest(
      op({ params: [{ name: "status", in: "query", required: false, schema: { type: "string" } }] }),
      {},
      BASE,
    );
    expect(request.url).toBe(`${BASE}/things`);
  });

  it("govdeyi JSON olarak kurar", () => {
    const request = buildRequest(
      op({
        method: "POST",
        path: "/donations",
        bodyContentType: "application/json",
        bodyRequired: true,
        params: [
          { name: "amount", in: "body", required: true, schema: { type: "number" } },
          { name: "currency", in: "body", required: true, schema: { type: "string" } },
        ],
      }),
      { amount: 100, currency: "TRY" },
      BASE,
    );
    expect(request.method).toBe("POST");
    expect(request.headers["Content-Type"]).toBe("application/json");
    expect(JSON.parse(request.body!)).toEqual({ amount: 100, currency: "TRY" });
  });

  it("path, query ve govdeyi ayni istekte ayirir", () => {
    const request = buildRequest(
      op({
        method: "PUT",
        path: "/debt/{debt_id}",
        bodyContentType: "application/json",
        bodyRequired: true,
        params: [
          { name: "debt_id", in: "path", required: true, schema: { type: "integer" } },
          { name: "notify", in: "query", required: false, schema: { type: "boolean" } },
          { name: "amount", in: "body", required: true, schema: { type: "number" } },
        ],
      }),
      { debt_id: 9, notify: true, amount: 250 },
      BASE,
    );
    expect(request.url).toBe(`${BASE}/debt/9?notify=true`);
    expect(JSON.parse(request.body!)).toEqual({ amount: 250 });
  });

  it("govde alani yoksa Content-Type eklemez", () => {
    const request = buildRequest(op({ method: "DELETE", path: "/tags/{tag_id}", params: [{ name: "tag_id", in: "path", required: true, schema: { type: "integer" } }] }), { tag_id: 3 }, BASE);
    expect(request.body).toBeUndefined();
    expect(request.headers["Content-Type"]).toBeUndefined();
  });
});
