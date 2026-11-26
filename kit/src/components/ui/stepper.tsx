import * as React from "react"
import { CheckIcon } from "lucide-react"
import { cn } from "cn"

/** Các bước của một quy trình (đăng ký gia sư, đặt học thử). Rộng: hiện đủ tên bước. Hẹp: chỉ "Bước 2/4: Lịch rảnh" kèm thanh tiến độ. */
function Stepper({ steps, current, className }: { steps: string[]; current: number; className?: string }) {
  return (
    <nav aria-label="Các bước" className={cn("@container", className)}>
      <p className="m-0 text-sm font-medium @md:hidden">Bước {current + 1}/{steps.length}: {steps[current]}</p>
      <div className="mt-2 flex gap-1 @md:hidden" aria-hidden>
        {steps.map((s, i) => <span key={s} className={cn("h-1 flex-1 rounded-full", i <= current ? "bg-primary" : "bg-muted")} />)}
      </div>
      <ol className="m-0 hidden list-none items-start gap-2 p-0 @md:flex">
        {steps.map((s, i) => (
          <li key={s} aria-current={i === current ? "step" : undefined} className="flex flex-1 items-center gap-2">
            <span className={cn("grid size-7 shrink-0 place-content-center rounded-full border text-[12.5px] font-medium", i < current && "border-primary bg-primary text-primary-foreground", i === current && "border-primary text-primary", i > current && "text-muted-foreground")}>
              {i < current ? <CheckIcon className="size-3.5" aria-label="Đã xong" /> : i + 1}
            </span>
            <span className={cn("text-sm", i === current ? "font-medium" : "text-muted-foreground")}>{s}</span>
            {i < steps.length - 1 ? <span aria-hidden className={cn("h-px flex-1", i < current ? "bg-primary" : "bg-border")} /> : null}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export { Stepper }
