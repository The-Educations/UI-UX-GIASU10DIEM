import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { CircleCheckIcon, InfoIcon, OctagonXIcon, TriangleAlertIcon, XIcon } from "lucide-react"
import { cn } from "cn"

const bannerVariants = cva("flex w-full items-start gap-3 rounded-lg border p-3 text-sm", {
  variants: {
    tone: {
      info: "border-border bg-muted text-foreground",
      positive: "border-(--positive)/30 bg-(--positive-soft) text-(--positive)",
      warning: "border-(--warning)/30 bg-(--warning-soft) text-(--warning)",
      error: "border-destructive/30 bg-destructive/10 text-destructive",
    },
  },
  defaultVariants: { tone: "info" },
})

const icons = { info: InfoIcon, positive: CircleCheckIcon, warning: TriangleAlertIcon, error: OctagonXIcon }

/** Thông báo nằm trong trang. Luôn có icon và chữ, không chỉ dựa vào màu. */
function Banner({ tone = "info", title, children, action, onDismiss, className }: VariantProps<typeof bannerVariants> & { title?: React.ReactNode; children?: React.ReactNode; action?: React.ReactNode; onDismiss?: () => void; className?: string }) {
  const Icon = icons[tone ?? "info"]
  return (
    <div role={tone === "error" ? "alert" : "status"} data-slot="banner" className={cn(bannerVariants({ tone }), className)}>
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden />
      <div className="grid min-w-0 flex-1 gap-1">
        {title ? <p className="font-medium leading-snug">{title}</p> : null}
        {children ? <div className="leading-snug text-current/90">{children}</div> : null}
        {action ? <div className="mt-1">{action}</div> : null}
      </div>
      {onDismiss ? (
        <button type="button" onClick={onDismiss} aria-label="Đóng thông báo" className="-m-3 grid size-11 shrink-0 place-content-center rounded-lg outline-none hover:bg-black/5 focus-visible:ring-[3px] focus-visible:ring-ring/50">
          <XIcon className="size-4" />
        </button>
      ) : null}
    </div>
  )
}

export { Banner }
