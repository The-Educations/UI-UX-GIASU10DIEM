import * as React from "react"
import { ChevronRightIcon } from "lucide-react"
import { cn } from "cn"

function List({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul data-slot="list" className={cn("m-0 grid list-none divide-y rounded-xl border bg-card p-0", className)} {...props} />
}

/** Một dòng: icon hoặc avatar, tiêu đề, mô tả, phần phụ bên phải. Có href thì cả dòng là link. */
function Item({ leading, title, description, trailing, href, className }: { leading?: React.ReactNode; title: React.ReactNode; description?: React.ReactNode; trailing?: React.ReactNode; href?: string; className?: string }) {
  const body = (
    <>
      {leading ? <span className="shrink-0">{leading}</span> : null}
      <span className="grid min-w-0 flex-1 gap-0.5">
        <span className="truncate text-sm font-medium">{title}</span>
        {description ? <span className="truncate text-[12.5px] text-muted-foreground">{description}</span> : null}
      </span>
      {trailing ? <span className="shrink-0 text-[12.5px] text-muted-foreground">{trailing}</span> : null}
      {href ? <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden /> : null}
    </>
  )
  const base = "flex min-h-14 items-center gap-3 px-4 py-2.5"
  return (
    <li className={cn("first:rounded-t-xl last:rounded-b-xl", className)}>
      {href ? (
        <a href={href} className={cn(base, "rounded-[inherit] outline-none transition-colors duration-[var(--duration-fast)] hover:bg-(--surface-hover) focus-visible:ring-[3px] focus-visible:ring-ring/50")}>{body}</a>
      ) : (
        <div className={base}>{body}</div>
      )}
    </li>
  )
}

/** Cặp nhãn và giá trị (chi tiết lớp, chi tiết giao dịch). Hẹp thì xếp dọc, rộng thì hai cột. */
function MetadataList({ items, className }: { items: { label: string; value: React.ReactNode }[]; className?: string }) {
  return (
    <dl className={cn("@container m-0 grid gap-x-6 gap-y-3 @md:grid-cols-[auto_1fr]", className)}>
      {items.map((i) => (
        <div key={i.label} className="grid gap-0.5 @md:col-span-2 @md:grid-cols-subgrid @md:items-baseline">
          <dt className="text-[12.5px] text-muted-foreground">{i.label}</dt>
          <dd className="m-0 text-sm break-words">{i.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export { List, Item, MetadataList }
