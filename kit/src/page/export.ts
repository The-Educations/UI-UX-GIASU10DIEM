import { entries, groups, skipped } from "../registry.ts"

export type Rating = { stars: number | null; reason: string; at: string }
export type Ratings = Record<string, Rating>

const groupLabel = Object.fromEntries(groups.map((g) => [g.id, g.label]))
const guideOf = Object.fromEntries(groups.map((g) => [g.id, g.guide]))
const kitPath = (file: string) => new URL(file, "http://x/kit/src/components/ui/").pathname.slice(1)

export const BRIEF = [
  "Bạn là agent sửa giao diện Gia Sư 10 Điểm. Đọc CLAUDE.md, guidelines/design-rules.md và tokens/theme.css trước khi sửa.",
  "Với mỗi mục trong items có stars từ 1 đến 3, hoặc có reason: sửa theo reason. stars 4 đến 5 và không có reason thì giữ nguyên. stars null là chưa chấm, bỏ qua.",
  "status \"web đã có\": sửa web_file (repo web) rồi chép lại vào kit_file cho khớp. status \"mới\": kit_file là bản đề xuất, tạo web_file mới sau khi chủ dự án duyệt.",
  "demo_file là nơi dựng ví dụ để xem lại. guide_file là luật Nên và Không nên của nhóm.",
  "Chỉ dùng token trong tokens/theme.css. Vùng chạm tối thiểu 44px. Kiểm ở 390px, không cuộn ngang. Chữ tiếng Việt có dấu. Có đủ trạng thái: đang tải, trống, lỗi, bị khoá.",
  "Báo rõ đã kiểm gì và chưa kiểm gì.",
].join("\n")

export function rows(r: Ratings) {
  return entries.map((e) => ({
    id: e.id,
    name: e.name,
    astryx: e.astryx,
    group: groupLabel[e.group],
    status: e.web ? "web đã có" : "mới",
    stars: r[e.id]?.stars ?? null,
    reason: r[e.id]?.reason ?? "",
    kit_file: kitPath(e.file),
    demo_file: `kit/src/demos/${e.demo}`,
    web_file: e.web,
    guide_file: guideOf[e.group],
    rated_at: r[e.id]?.at ?? null,
  }))
}

export function summary(r: Ratings) {
  const rated = entries.filter((e) => r[e.id]?.stars != null)
  const stars = rated.map((e) => r[e.id].stars as number)
  return {
    total: entries.length,
    rated: rated.length,
    average: stars.length ? Math.round((stars.reduce((a, b) => a + b, 0) / stars.length) * 100) / 100 : null,
    needs_fix: entries.filter((e) => (r[e.id]?.stars ?? 5) <= 3 || r[e.id]?.reason.trim()).length,
  }
}

export function buildJson(r: Ratings, rater: string, now = new Date()) {
  return JSON.stringify({ schema: "gs10-component-rating/1", exported_at: now.toISOString(), rater: rater || null, brief: BRIEF, summary: summary(r), items: rows(r), not_built: skipped }, null, 2)
}

// Ô bắt đầu bằng = + - @ bị Excel hiểu là công thức; thêm dấu nháy đơn để giữ là chữ.
const cell = (v: unknown) => `"${String(v ?? "").replace(/^([=+\-@])/, "'$1").replace(/"/g, '""')}"`

export function buildCsv(r: Ratings) {
  const head = ["id", "name", "astryx", "group", "status", "stars", "reason", "kit_file", "demo_file", "web_file", "guide_file", "rated_at"]
  const lines = [head, ...rows(r).map((x) => head.map((h) => (x as Record<string, unknown>)[h]))]
  const gone = skipped.map((s) => ["", "", s.astryx, "", `${s.status}${s.into ? " " + s.into : ""}`, "", s.reason, "", "", "", "", ""])
  // BOM để Excel đọc đúng tiếng Việt.
  return "﻿" + [...lines, ...gone].map((l) => l.map(cell).join(",")).join("\r\n") + "\r\n"
}

export function buildPrompt(r: Ratings, rater: string) {
  const touched = rows(r).filter((x) => x.stars != null || x.reason.trim())
  return `${BRIEF}\n\nKết quả chấm${rater ? ` của ${rater}` : ""} (${touched.length} mục):\n${JSON.stringify(touched, null, 1)}`
}
