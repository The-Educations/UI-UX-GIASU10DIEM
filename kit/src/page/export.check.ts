// Chạy: node src/page/export.check.ts
import assert from "node:assert/strict"
import { buildCsv, buildJson, summary } from "./export.ts"

const r = { button: { stars: 2, reason: '=SUM(1)\nnút "Đặt học thử" quá nhỏ', at: "2026-11-26T00:00:00.000Z" }, card: { stars: 5, reason: "", at: "" } }
const csv = buildCsv(r)
assert.ok(csv.startsWith("﻿"), "CSV phải có BOM")
assert.ok(csv.includes(`"'=SUM(1)\nnút ""Đặt học thử"" quá nhỏ"`), "escape công thức, xuống dòng, dấu nháy kép")
const j = JSON.parse(buildJson(r, ""))
assert.equal(j.summary.rated, 2)
assert.equal(j.summary.needs_fix, 1)
assert.equal(j.items.find((x: { id: string }) => x.id === "button").stars, 2)
assert.equal(j.items.find((x: { id: string }) => x.id === "badge").stars, null, "mục chưa chấm vẫn có mặt")
assert.equal(summary({}).average, null)
console.log("export ok:", j.items.length, "mục,", j.not_built.length, "tên không dựng riêng")
