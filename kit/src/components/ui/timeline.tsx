import * as React from "react"
import { CheckIcon, XIcon } from "lucide-react"
import { cn } from "cn"

export type TimelineItem = { title: string; time?: string; note?: React.ReactNode; state: "done" | "current" | "todo" | "error" }

/** Lịch sử hoặc tiến trình của một việc (đặt lịch, thanh toán, duyệt hồ sơ). Trạng thái luôn có icon hoặc chữ, không chỉ màu. */
function Timeline({ items, label, className }: { items: TimelineItem[]; label: string; className?: string }) {
  return (
    <ol aria-label={label} className={cn("m-0 grid list-none p-0", className)}>
      {items.map((it, i) => (
        <li key={it.title} aria-current={it.state === "current" ? "step" : undefined} className="relative grid grid-cols-[1.75rem_1fr] gap-x-3 pb-5 last:pb-0">
          {i < items.length - 1 ? <span aria-hidden className={cn("absolute top-7 bottom-0 left-[0.8125rem] w-px", it.state === "done" ? "bg-primary" : "bg-border")} /> : null}
          <span className={cn("z-[1] grid size-7 place-content-center rounded-full border bg-card text-[12px]", it.state === "done" && "border-primary bg-primary text-primary-foreground", it.state === "current" && "border-primary text-primary", it.state === "error" && "border-destructive bg-destructive text-white", it.state === "todo" && "text-muted-foreground")}>
            {it.state === "done" ? <CheckIcon className="size-3.5" aria-label="Đã xong" /> : it.state === "error" ? <XIcon className="size-3.5" aria-label="Lỗi" /> : <span aria-hidden className={cn("size-2 rounded-full", it.state === "current" ? "bg-primary" : "bg-muted-foreground/40")} />}
          </span>
          <div className="grid min-w-0 gap-0.5 pt-0.5">
            <p className={cn("m-0 text-sm leading-snug", it.state === "todo" ? "text-muted-foreground" : "font-medium", it.state === "error" && "text-destructive")}>{it.title}</p>
            {it.time ? <p className="m-0 text-[12.5px] text-muted-foreground">{it.time}</p> : null}
            {it.note ? <div className="mt-1 text-[13px] text-muted-foreground">{it.note}</div> : null}
          </div>
        </li>
      ))}
    </ol>
  )
}

export { Timeline }
