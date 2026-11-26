import * as React from "react"
import { cn } from "cn"
import { FieldError } from "@/components/ui/field"

const long = new Intl.DateTimeFormat("vi-VN", { weekday: "long", day: "numeric", month: "numeric", year: "numeric" })
const parse = (v: string) => (/^\d{4}-\d{2}-\d{2}$/.test(v) ? new Date(`${v}T00:00:00`) : null)

/**
 * Ô ngày gốc, làm cứng cho mọi hệ điều hành:
 * - iOS bỏ qua min, max nên kiểm lại bằng JS và báo lỗi bằng chữ.
 * - Ô gốc trên Android, Windows, macOS, iOS trông khác nhau nên luôn in dòng "Thứ 4, 02/12/2026" bên dưới để người dùng xác nhận ngày.
 * - Cao 44px, chữ 16px trên màn cảm ứng (xem tokens/platform.css).
 */
function DateField({ value, onChange, min, max, label, id, disabled, className }: { value: string; onChange: (v: string) => void; min?: string; max?: string; label: string; id?: string; disabled?: boolean; className?: string }) {
  const eid = React.useId()
  const d = parse(value)
  const error = !value ? "" : !d ? "Ngày không đúng định dạng. Chọn lại từ lịch." : min && value < min ? `Chọn từ ${long.format(parse(min)!)} trở đi.` : max && value > max ? `Chọn không muộn hơn ${long.format(parse(max)!)}.` : ""
  return (
    <div className={cn("grid gap-1.5", className)}>
      <input
        id={id}
        type="date"
        aria-label={label}
        aria-invalid={!!error || undefined}
        aria-describedby={`${eid}-hint`}
        disabled={disabled}
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-input bg-card px-3 text-[15px] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50"
      />
      {error ? <FieldError id={`${eid}-hint`}>{error}</FieldError> : <p id={`${eid}-hint`} className="m-0 min-h-5 text-[12.5px] text-muted-foreground">{d ? long.format(d) : ""}</p>}
    </div>
  )
}

export { DateField }
