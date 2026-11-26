import * as React from "react"
import { cn } from "cn"

/** Hàng cuộn ngang bằng scroll-snap của trình duyệt: vuốt mượt trên điện thoại, không cần thư viện. */
function Carousel({ className, children, label }: { className?: string; children: React.ReactNode; label: string }) {
  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      className={cn("-mx-4 flex min-w-0 snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-4 pb-2 outline-none [scrollbar-width:thin] focus-visible:ring-[3px] focus-visible:ring-ring/50 *:shrink-0 *:snap-start", className)}
    >
      {children}
    </div>
  )
}

export { Carousel }
