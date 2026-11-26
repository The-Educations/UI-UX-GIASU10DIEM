import * as React from "react"
import { cn } from "cn"

/** Form một cột ở điện thoại, hai cột khi khung đủ rộng (≥ 28rem). Trường dài (địa chỉ, giới thiệu) thêm className="@md:col-span-2". */
function FormLayout({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("@container grid w-full gap-5 @md:grid-cols-2", className)} {...props} />
}

/** Một khối nội dung có tiêu đề, cách nhau 32px. Tiêu đề là h2, mô tả không bắt buộc. */
function Section({ title, description, actions, className, children }: { title: React.ReactNode; description?: React.ReactNode; actions?: React.ReactNode; className?: string; children: React.ReactNode }) {
  return (
    <section className={cn("grid gap-4", className)}>
      <header className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <div className="grid gap-1">
          <h2>{title}</h2>
          {description ? <p className="text-[13px] text-muted-foreground">{description}</p> : null}
        </div>
        {actions}
      </header>
      {children}
    </section>
  )
}

export { FormLayout, Section }
