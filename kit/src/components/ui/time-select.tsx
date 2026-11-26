import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "cn"
import { FieldError } from "@/components/ui/field"

const pad = (n: number) => String(n).padStart(2, "0")
export const toMinutes = (t: string) => { const [h, m] = t.split(":").map(Number); return h * 60 + m }
export const fromMinutes = (n: number) => `${pad(Math.floor(n / 60))}:${pad(n % 60)}`

/**
 * Chọn giờ bằng <select> gốc, không dùng <input type=time>: iOS Safari bỏ qua min, max, step của ô giờ,
 * còn <select> luôn ra bánh xe cuộn trên iOS, hộp thoại trên Android, danh sách trên máy tính, và chỉ cho chọn giờ hợp lệ.
 */
function TimeSelect({ value, onChange, from = "06:00", to = "22:00", step = 30, label, invalid, disabled, className, id }: { value: string; onChange: (v: string) => void; from?: string; to?: string; step?: number; label: string; invalid?: boolean; disabled?: boolean; className?: string; id?: string }) {
  const options: string[] = []
  for (let m = toMinutes(from); m <= toMinutes(to); m += step) options.push(fromMinutes(m))
  return (
    <span className={cn("relative block min-w-0", className)}>
      <select
        id={id}
        aria-label={label}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full min-w-0 appearance-none rounded-md border border-input bg-card pr-9 pl-3 text-[15px] tabular-nums outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50"
      >
        {!options.includes(value) ? <option value={value}>{value || "--:--"}</option> : null}
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDownIcon aria-hidden className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
    </span>
  )
}

/** Từ giờ nào đến giờ nào. Giờ kết thúc phải sau giờ bắt đầu; sai thì nói rõ và đặt lỗi ngay dưới. */
function TimeRange({ start, end, onChange, label, from, to, step, disabled }: { start: string; end: string; onChange: (s: string, e: string) => void; label: string; from?: string; to?: string; step?: number; disabled?: boolean }) {
  const bad = toMinutes(end) <= toMinutes(start)
  const eid = React.useId()
  return (
    <fieldset className="m-0 min-w-0 border-0 p-0" aria-describedby={bad ? eid : undefined}>
      <legend className="mb-1.5 text-[12.5px] font-medium">{label}</legend>
      <div className="flex items-center gap-2">
        <TimeSelect label={`${label}: từ`} value={start} onChange={(v) => onChange(v, end)} from={from} to={to} step={step} invalid={bad} disabled={disabled} />
        <span aria-hidden className="text-muted-foreground">–</span>
        <TimeSelect label={`${label}: đến`} value={end} onChange={(v) => onChange(start, v)} from={from} to={to} step={step} invalid={bad} disabled={disabled} />
      </div>
      {bad ? <FieldError id={eid} className="mt-1.5">Giờ kết thúc phải sau giờ bắt đầu ({start}).</FieldError> : null}
    </fieldset>
  )
}

export { TimeSelect, TimeRange }
