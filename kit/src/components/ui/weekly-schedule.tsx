import * as React from "react"
import { CopyIcon } from "lucide-react"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CheckRow } from "@/components/ui/checkbox"

/** Khoá ô = giờ × 7 + thứ (thứ 2 = 0), giống web (availability-grid.tsx), để đổi qua lại không phải chuyển dữ liệu. */
export const key = (hour: number, day: number) => hour * 7 + day
const DAYS = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"]
const SHORT = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"]
const GROUPS = [["Sáng", 6, 11], ["Chiều", 12, 17], ["Tối", 18, 23]] as const
const hh = (h: number) => `${String(h).padStart(2, "0")}:00`
const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i)

/** "18:00–21:00, 22:00–23:00" từ các giờ rời rạc. */
export function summarizeDay(set: Set<number>, day: number) {
  const hours = range(0, 23).filter((h) => set.has(key(h, day)))
  const out: string[] = []
  for (let i = 0; i < hours.length; ) {
    let j = i
    while (hours[j + 1] === hours[j] + 1) j++
    out.push(`${hh(hours[i])}–${hh(hours[j] + 1)}`)
    i = j + 1
  }
  return out.join(", ")
}

/**
 * Chọn lịch rảnh trong tuần.
 * - Khung hẹp (điện thoại): chọn từng ngày, bấm giờ, có nút Sáng/Chiều/Tối và chép sang ngày khác. Không cần kéo, không cần phóng to.
 * - Khung rộng (≥ 44rem): lưới 7 ngày. Chuột kéo để tô; cảm ứng bấm từng ô (kéo trên cảm ứng sẽ cuộn trang); mũi tên di chuyển, cách để bật tắt.
 */
function WeeklySchedulePicker({ value, onChange, label, disabled, className }: { value: Set<number>; onChange: (s: Set<number>) => void; label: string; disabled?: boolean; className?: string }) {
  const [day, setDay] = React.useState(0)
  const [copyTo, setCopyTo] = React.useState<number[]>([])
  const paint = React.useRef<{ add: boolean } | null>(null)

  const set = (keys: number[], on: boolean) => {
    const next = new Set(value)
    keys.forEach((k) => (on ? next.add(k) : next.delete(k)))
    onChange(next)
  }
  const dayKeys = (d: number, a = 0, b = 23) => range(a, b).map((h) => key(h, d))
  const total = value.size

  return (
    <div className={cn("@container grid gap-3", className)} role="group" aria-label={label} aria-disabled={disabled}>
      {/* Khung hẹp */}
      <div className="grid gap-4 @2xl:hidden">
        <div role="radiogroup" aria-label="Chọn thứ" className="grid grid-cols-7 gap-0.5">
          {DAYS.map((d, i) => {
            const n = dayKeys(i).filter((k) => value.has(k)).length
            return (
              <button key={d} type="button" role="radio" aria-checked={day === i} aria-label={`${d}, ${n ? `${n} giờ` : "chưa chọn"}`} onClick={() => setDay(i)} className="grid min-h-14 place-content-center justify-items-center gap-0.5 rounded-lg border bg-card text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-checked:border-primary aria-checked:bg-primary aria-checked:text-primary-foreground">
                <span className="font-medium">{SHORT[i]}</span>
                <span aria-hidden className="text-[11px] tabular-nums opacity-80">{n ? `${n}g` : "·"}</span>
              </button>
            )
          })}
        </div>
        <p className="m-0 text-sm" aria-live="polite"><strong>{DAYS[day]}</strong>: {summarizeDay(value, day) || <span className="text-muted-foreground">chưa chọn giờ</span>}</p>
        {GROUPS.map(([name, a, b]) => {
          const keys = dayKeys(day, a, b)
          const all = keys.every((k) => value.has(k))
          return (
            <div key={name} className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[12.5px] font-medium text-muted-foreground">{name}</span>
                <Button type="button" variant="ghost" size="sm" aria-pressed={all} disabled={disabled} onClick={() => set(keys, !all)}>{all ? `Bỏ cả buổi ${name.toLowerCase()}` : `Chọn cả buổi ${name.toLowerCase()}`}</Button>
              </div>
              <div className="grid grid-cols-3 gap-2 @md:grid-cols-6">
                {range(a, b).map((h) => (
                  <button key={h} type="button" aria-pressed={value.has(key(h, day))} disabled={disabled} onClick={() => set([key(h, day)], !value.has(key(h, day)))} className="min-h-11 rounded-lg border bg-card text-sm tabular-nums outline-none transition-colors duration-[var(--duration-fast)] focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-50 aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground">{hh(h)}</button>
                ))}
              </div>
            </div>
          )
        })}
        <div className="flex flex-wrap gap-2">
          <Popover onOpenChange={() => setCopyTo([])}>
            <PopoverTrigger asChild><Button type="button" variant="outline" disabled={disabled || !dayKeys(day).some((k) => value.has(k))}><CopyIcon />Chép sang ngày khác</Button></PopoverTrigger>
            <PopoverContent className="grid w-64 gap-1">
              <p className="m-0 px-1 text-sm font-medium">Chép lịch {DAYS[day]} sang</p>
              {DAYS.map((d, i) => i === day ? null : <CheckRow key={d} label={d} checked={copyTo.includes(i)} onCheckedChange={(c) => setCopyTo(c ? [...copyTo, i] : copyTo.filter((x) => x !== i))} />)}
              <Button type="button" size="sm" disabled={!copyTo.length} onClick={() => {
                const next = new Set(value)
                copyTo.forEach((d) => range(0, 23).forEach((h) => (value.has(key(h, day)) ? next.add(key(h, d)) : next.delete(key(h, d)))))
                onChange(next); setCopyTo([])
              }}>Chép</Button>
            </PopoverContent>
          </Popover>
          <Button type="button" variant="ghost" disabled={disabled} onClick={() => set(dayKeys(day), false)}>Xoá {DAYS[day]}</Button>
        </div>
      </div>

      {/* Khung rộng */}
      <div className="hidden @2xl:block">
        <div data-scroll role="region" aria-label="Lưới lịch tuần" tabIndex={0} className="max-h-[28rem] overflow-auto rounded-xl border bg-card outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50" onPointerUp={() => (paint.current = null)} onPointerLeave={() => (paint.current = null)}>
          <table className="w-full border-collapse text-center text-sm select-none">
            <thead className="sticky top-0 z-[1] bg-muted">
              <tr>
                <th scope="col" className="h-11 w-16 px-2 text-[12.5px] font-medium text-muted-foreground">Giờ</th>
                {DAYS.map((d, i) => (
                  <th key={d} scope="col" className="p-0"><button type="button" disabled={disabled} className="h-11 w-full text-[12.5px] font-medium outline-none hover:bg-(--surface-hover) focus-visible:ring-[3px] focus-visible:ring-ring/50" onClick={() => { const ks = dayKeys(i, 6, 22); set(ks, !ks.every((k) => value.has(k))) }}>{d}</button></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {range(6, 22).map((h) => (
                <tr key={h}>
                  <th scope="row" className="h-11 border-t px-2 text-right text-[12.5px] font-normal text-muted-foreground tabular-nums">{hh(h)}</th>
                  {DAYS.map((d, i) => {
                    const k = key(h, i), on = value.has(k)
                    return (
                      <td key={d} className="border-t border-l p-0">
                        <button
                          type="button"
                          aria-pressed={on}
                          aria-label={`${d} ${hh(h)}–${hh(h + 1)}`}
                          disabled={disabled}
                          onPointerDown={(e) => { if (e.pointerType !== "mouse") return; e.preventDefault(); paint.current = { add: !on }; set([k], !on) }}
                          onPointerEnter={(e) => { if (paint.current && e.pointerType === "mouse") set([k], paint.current.add) }}
                          onClick={(e) => { if (e.detail === 0 || (e.nativeEvent as PointerEvent).pointerType !== "mouse") set([k], !on) }}
                          onKeyDown={(e) => {
                            const to = e.key === "ArrowDown" ? [h + 1, i] : e.key === "ArrowUp" ? [h - 1, i] : e.key === "ArrowRight" ? [h, i + 1] : e.key === "ArrowLeft" ? [h, i - 1] : null
                            if (to) { e.preventDefault(); e.currentTarget.closest("table")?.querySelector<HTMLButtonElement>(`[data-cell="${to[0]}-${to[1]}"]`)?.focus() }
                          }}
                          data-cell={`${h}-${i}`}
                          className="h-11 w-full min-w-11 outline-none transition-colors duration-[var(--duration-fast)] hover:bg-(--surface-hover) focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/50 disabled:opacity-50 aria-pressed:bg-primary aria-pressed:text-primary-foreground aria-pressed:hover:bg-primary"
                        >{on ? <span aria-hidden>✓</span> : null}</button>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 mb-0 text-[12.5px] text-muted-foreground">Bấm tên thứ để chọn cả ngày. Dùng chuột có thể kéo để tô nhiều ô.</p>
      </div>

      <p className="m-0 text-sm tabular-nums" aria-live="polite">Tổng cộng {total} giờ rảnh mỗi tuần.</p>
    </div>
  )
}

export { WeeklySchedulePicker }
