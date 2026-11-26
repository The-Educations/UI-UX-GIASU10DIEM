import * as React from "react"
import { cn } from "cn"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card" className={cn("@container rounded-xl border bg-card text-card-foreground", className)} {...props} />
}
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-header" className={cn("grid gap-1 p-4 pb-0 @md:p-5 @md:pb-0", className)} {...props} />
}
function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 data-slot="card-title" className={cn("leading-snug", className)} {...props} />
}
function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="card-description" className={cn("text-[13px] text-muted-foreground", className)} {...props} />
}
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("p-4 @md:p-5", className)} {...props} />
}
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-footer" className={cn("flex flex-wrap items-center gap-2 border-t p-4 @md:px-5", className)} {...props} />
}

/** Cả thẻ bấm được (đi tới trang chi tiết): dùng <a> bọc ngoài, không lồng nút trong thẻ. */
function ClickableCard({ className, ...props }: React.ComponentProps<"a">) {
  return (
    <a
      data-slot="card"
      className={cn("@container block rounded-xl border bg-card text-card-foreground outline-none transition-colors duration-[var(--duration-fast)] hover:bg-(--surface-hover) focus-visible:ring-[3px] focus-visible:ring-ring/50", className)}
      {...props}
    />
  )
}

/** Thẻ chọn một trong nhiều (gói học, khung giờ). Dựng trên radio nên bàn phím chạy đúng. */
function SelectableCard({ className, children, ...props }: React.ComponentProps<"input"> & { children: React.ReactNode }) {
  return (
    <label className={cn("relative block cursor-pointer rounded-xl border bg-card p-4 text-card-foreground transition-colors duration-[var(--duration-fast)] has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60", className)}>
      <input type="radio" className="sr-only" {...props} />
      {children}
    </label>
  )
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, ClickableCard, SelectableCard }
