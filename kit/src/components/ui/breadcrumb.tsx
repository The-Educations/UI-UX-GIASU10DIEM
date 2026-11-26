import * as React from "react"
import { ChevronRightIcon } from "lucide-react"
import { cn } from "cn"

/** Đường dẫn trang. Hẹp thì chỉ giữ mục cha gần nhất kèm mũi tên quay lại, dài thì rút gọn giữa. */
function Breadcrumb({ items, className }: { items: { label: string; href?: string }[]; className?: string }) {
  return (
    <nav aria-label="Đường dẫn" className={cn("text-[13px]", className)}>
      <ol className="m-0 flex min-w-0 list-none flex-wrap items-center gap-x-1 p-0">
        {items.map((it, i) => {
          const last = i === items.length - 1
          return (
            <li key={it.label} className={cn("flex min-w-0 items-center gap-1", !last && i < items.length - 2 && "max-sm:hidden")}>
              {last || !it.href ? (
                <span aria-current={last ? "page" : undefined} className={cn("truncate", last ? "font-medium" : "text-muted-foreground")}>{it.label}</span>
              ) : (
                <a href={it.href} className="-my-3 inline-flex min-h-11 items-center truncate rounded px-1 text-muted-foreground outline-none hover:text-foreground hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/50">{it.label}</a>
              )}
              {last ? null : <ChevronRightIcon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export { Breadcrumb }
