import { describe, expect, it } from "vitest";
import { SPEC_VERSION, TOOL_GROUPS } from "../src/generated/operations.js";

describe("uretilen operasyonlar", () => {
  it("spec surumunu tasir", () => {
    expect(SPEC_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it("tool adlari benzersiz ve fonzip_ ile baslar", () => {
    const names = TOOL_GROUPS.map((g) => g.name);
    expect(new Set(names).size).toBe(names.length);
    for (const name of names) expect(name).toMatch(/^fonzip_[a-z_]+$/);
  });

  it("her tool icinde action adlari benzersiz", () => {
    for (const group of TOOL_GROUPS) {
      const actions = group.actions.map((a) => a.action);
      expect(new Set(actions).size, `${group.name} icinde tekrar eden action`).toBe(actions.length);
      for (const action of actions) expect(action).toMatch(/^[a-z][a-z0-9_]*$/);
    }
  });

  it("operationId'ler global olarak benzersiz", () => {
    const ids = TOOL_GROUPS.flatMap((g) => g.actions.map((a) => a.operationId));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("path parametreleri hem sablonda hem params listesinde var", () => {
    for (const group of TOOL_GROUPS) {
      for (const op of group.actions) {
        const inPath = [...op.path.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
        const declared = op.params.filter((p) => p.in === "path").map((p) => p.name).sort();
        expect(declared, `${op.operationId}`).toEqual(inPath);
        for (const p of op.params.filter((x) => x.in === "path")) {
          expect(p.required, `${op.operationId}.${p.name}`).toBe(true);
        }
      }
    }
  });

  it("token ve authorize uclari disarida birakildi", () => {
    const ids = TOOL_GROUPS.flatMap((g) => g.actions.map((a) => a.operationId));
    expect(ids).not.toContain("getAccessToken");
    expect(ids).not.toContain("oauthAuthorizeGet");
  });

  it("readOnly bayragi sadece GET gruplarinda true", () => {
    for (const group of TOOL_GROUPS) {
      const allGet = group.actions.every((a) => a.method === "GET");
      expect(group.readOnly, group.name).toBe(allGet);
    }
  });

  it("beklenen 13 tool ve 113 operasyon uretildi", () => {
    expect(TOOL_GROUPS).toHaveLength(13);
    expect(TOOL_GROUPS.reduce((n, g) => n + g.actions.length, 0)).toBe(113);
  });
});
