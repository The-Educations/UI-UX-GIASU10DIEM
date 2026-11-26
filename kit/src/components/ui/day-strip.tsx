import * as React from "react"
import { cn } from "cn"

const wd = new Intl.DateTimeFormat("vi-VN", { weekday: "short" })
const dm = new Intl.DateTimeFormat("vi-VN", { day: "numeric", month: "numeric" })
const full = new Intl.DateTimeFormat("vi-VN", { weekday: "long", day: "numeric", month: "numeric" })
const key = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`

/** Dải ngày để chọn buổi học: vuốt ngang trên điện thoại, mũi tên đổi ngày. Ngày không chọn được vẫn hiện, kèm chữ "kín lịch". */
function DayStrip({ days, value, onChange, isFull, label, className }: { days: Date[]; value: Date | null; onChange: (d: Date) => void; isFull?: (d: Date) => boolean; label: string; className?: string }) {
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])
  const idx = value ? days.findIndex((d) => key(d) === key(value)) : -1
  const go = (to: number) => {
    for (let n = to; n >= 0 && n < days.length; n += to > idx ? 1 : -1) {
      if (!isFull?.(days[n])) { onChange(days[n]); refs.current[n]?.focus(); return }
    }
  }
  return (
    <div role="radiogroup" aria-label={label} className={cn("-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] *:shrink-0 *:snap-start", className)}>
      {days.map((d, i) => {
        const full_ = !!isFull?.(d)
        const on = i === idx
        return (
          <button
            key={key(d)}
            ref={(el) => { refs.current[i] = el }}
            type="button"
            role="radio"
            aria-checked={on}
            aria-label={`${full.format(d)}${full_ ? ", kín lịch" : ""}`}
            disabled={full_}
            tabIndex={on || (idx < 0 && i === days.findIndex((x) => !isFull?.(x))) ? 0 : -1}
            onClick={() => onChange(d)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") { e.preventDefault(); go(idx + 1) }
              if (e.key === "ArrowLeft") { e.preventDefault(); go(idx - 1) }
            }}
            className="grid min-h-16 w-14 place-content-center justify-items-center gap-0.5 rounded-xl border bg-card text-sm outline-none transition-colors duration-[var(--duration-fast)] hover:bg-(--surface-hover) focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-checked:border-primary aria-checked:bg-primary aria-checked:text-primary-foreground"
          >
            <span className="text-[12px] opacity-80">{wd.format(d)}</span>
            <span className="font-medium tabular-nums">{dm.format(d)}</span>
            {full_ ? <span className="text-[10.5px]">Kín</span> : null}
          </button>
        )
      })}
    </div>
  )
}

export { DayStrip }
