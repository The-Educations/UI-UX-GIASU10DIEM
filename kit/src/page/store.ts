import * as React from "react"
import type { Ratings } from "./export.ts"

const KEY = "gs10-component-rating/1"

const read = (): Ratings => {
  try { return JSON.parse(localStorage.getItem(KEY) ?? "{}") } catch { return {} }
}

/** Lượt chấm lưu trong trình duyệt này (localStorage). Không có máy chủ, không gửi đi đâu. */
export function useRatings() {
  const [r, setR] = React.useState<Ratings>(read)
  const [saved, setSaved] = React.useState(true)
  const set = React.useCallback((id: string, patch: { stars?: number | null; reason?: string }) => {
    setR((prev) => {
      const cur = prev[id] ?? { stars: null, reason: "", at: "" }
      const next = { ...cur, ...patch, at: new Date().toISOString() }
      const all = { ...prev }
      if (next.stars == null && !next.reason.trim()) delete all[id]
      else all[id] = next
      try { localStorage.setItem(KEY, JSON.stringify(all)); setSaved(true) } catch { setSaved(false) }
      return all
    })
  }, [])
  return { ratings: r, set, saved }
}

export const prefs = {
  get: (k: string) => { try { return localStorage.getItem(`gs10-${k}`) } catch { return null } },
  set: (k: string, v: string) => { try { localStorage.setItem(`gs10-${k}`, v) } catch { /* trình duyệt chặn lưu: bỏ qua */ } },
}
