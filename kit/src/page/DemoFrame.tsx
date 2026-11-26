import * as React from "react"
import type { ComponentType } from "react"
import { TooltipProvider } from "@/components/ui/tooltip"

/** Trang con chạy trong iframe: chỉ dựng một demo. Iframe có viewport riêng nên media query (md:, lg:) phản ứng đúng theo bề ngang khung. */
export function DemoFrame({ id }: { id: string }) {
  const [Demo, setDemo] = React.useState<ComponentType | null>(null)
  const [failed, setFailed] = React.useState(false)

  React.useEffect(() => {
    import("../demos/index.ts").then((m) => (m.demos[id] ? setDemo(() => m.demos[id]) : setFailed(true)), () => setFailed(true))
  }, [id])

  // Theo nền sáng/tối của trang cha.
  React.useEffect(() => {
    const parent = window.parent !== window ? window.parent.document.documentElement : null
    if (!parent) return
    const sync = () => document.documentElement.classList.toggle("dark", parent.classList.contains("dark"))
    sync()
    const mo = new MutationObserver(sync)
    mo.observe(parent, { attributes: true, attributeFilter: ["class"] })
    return () => mo.disconnect()
  }, [])

  return (
    <TooltipProvider>
      <div className="min-h-[inherit] p-4 md:p-6">
        {failed ? <p role="alert" className="text-sm text-destructive">Không dựng được ví dụ này. Tải lại trang.</p> : Demo ? <Demo /> : <p className="text-sm text-muted-foreground" role="status">Đang tải…</p>}
      </div>
    </TooltipProvider>
  )
}
