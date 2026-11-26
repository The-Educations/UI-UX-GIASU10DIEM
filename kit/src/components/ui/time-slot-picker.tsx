import * as React from "react"
import { cn } from "cn"

export type Slot = { time: string; taken?: boolean }

/** Chọn khung giờ trong ngày. Giờ đã kín vẫn hiện (gạch ngang + chữ cho trình đọc màn hình) để người học hiểu vì sao không chọn được. 3 cột ở khung hẹp, 4 cột từ 28rem. */
function TimeSlotPicker({ slots, value, onChange, label, className }: { slots: Slot[]; value: string | null; onChange: (t: string) => void; label: string; className?: string }) {
  return (
    <fieldset className={cn("@container m-0 min-w-0 border-0 p-0", className)}>
      <legend className="mb-2 text-[12.5px] font-medium">{label}</legend>
      <div className="grid grid-cols-3 gap-2 @md:grid-cols-4">
        {slots.map((s) => (
          <label key={s.time} className={cn("relative grid min-h-11 cursor-pointer place-content-center rounded-lg border bg-card text-sm tabular-nums transition-colors duration-[var(--duration-fast)] has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50 has-[:disabled]:cursor-not-allowed has-[:disabled]:text-muted-foreground has-[:disabled]:line-through has-[:disabled]:opacity-60", !s.taken && "hover:bg-(--surface-hover) has-[:checked]:hover:bg-primary")}>
            <input type="radio" name="slot" value={s.time} checked={value === s.time} disabled={s.taken} onChange={() => onChange(s.time)} className="sr-only" />
            {s.time}
            {s.taken ? <span className="sr-only"> (đã có người đặt)</span> : null}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export { TimeSlotPicker }
