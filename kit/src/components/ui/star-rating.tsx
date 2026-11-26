import * as React from "react"
import { StarIcon } from "lucide-react"
import { cn } from "cn"

/** Chỉ đọc: "4,5 trên 5". Sao nửa hiện bằng cắt phần tô, không cần icon riêng. */
function StarDisplay({ value, count, className }: { value: number; count?: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-sm", className)} role="img" aria-label={`${String(value).replace(".", ",")} trên 5${count != null ? `, ${count} lượt chấm` : ""}`}>
      <span className="relative inline-flex text-(--warning)" aria-hidden>
        <span className="inline-flex">{[1, 2, 3, 4, 5].map((n) => <StarIcon key={n} className="size-4" />)}</span>
        <span className="absolute inset-y-0 left-0 inline-flex overflow-hidden" style={{ width: `${(value / 5) * 100}%` }}>
          {[1, 2, 3, 4, 5].map((n) => <StarIcon key={n} className="size-4 shrink-0 fill-current" />)}
        </span>
      </span>
      <span className="tabular-nums">{String(value).replace(".", ",")}</span>
      {count != null ? <span className="text-muted-foreground">({count})</span> : null}
    </span>
  )
}

/** Chọn 1 đến 5 sao. Nhóm radio: mũi tên đổi sao, Tab vào nhóm một lần. Bấm lại sao đang chọn thì bỏ chọn. */
function StarPicker({ value, onChange, label, disabled, className }: { value: number | null; onChange: (n: number | null) => void; label: string; disabled?: boolean; className?: string }) {
  const refs = React.useRef<(HTMLButtonElement | null)[]>([])
  const move = (to: number) => { const n = Math.min(5, Math.max(1, to)); onChange(n); refs.current[n - 1]?.focus() }
  return (
    <div role="radiogroup" aria-label={label} aria-disabled={disabled} className={cn("flex items-center", className)}>
      {[1, 2, 3, 4, 5].map((n) => {
        const on = value != null && n <= value
        return (
          <button
            key={n}
            ref={(el) => { refs.current[n - 1] = el }}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} sao`}
            disabled={disabled}
            tabIndex={value === n || (value == null && n === 1) ? 0 : -1}
            onClick={() => onChange(value === n ? null : n)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowUp") { e.preventDefault(); move((value ?? 0) + 1) }
              if (e.key === "ArrowLeft" || e.key === "ArrowDown") { e.preventDefault(); move((value ?? 2) - 1) }
              if (e.key === "Home") { e.preventDefault(); move(1) }
              if (e.key === "End") { e.preventDefault(); move(5) }
            }}
            className={cn("grid size-11 place-content-center rounded-lg text-muted-foreground outline-none transition-transform duration-[var(--duration-fast)] focus-visible:ring-[3px] focus-visible:ring-ring/50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50", on && "text-(--warning)")}
          >
            <StarIcon className={cn("size-7", on && "fill-current")} />
          </button>
        )
      })}
    </div>
  )
}

export { StarDisplay, StarPicker }
