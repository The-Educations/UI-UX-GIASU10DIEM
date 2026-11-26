import * as React from "react"
import { cn } from "cn"
import { Skeleton } from "@/components/ui/skeleton"

/** Ô số liệu cho trang tổng quan: nhãn nhỏ, số lớn, một dòng giải thích. Số dùng tabular-nums để không nhảy khi đổi. */
function StatTile({ label, value, hint, icon, loading, className }: { label: string; value: React.ReactNode; hint?: React.ReactNode; icon?: React.ReactNode; loading?: boolean; className?: string }) {
  return (
    <div className={cn("grid gap-1 rounded-xl border bg-card p-4", className)} aria-busy={loading || undefined}>
      <div className="flex items-center justify-between gap-2 text-[13px] text-muted-foreground"><span>{label}</span>{icon ? <span aria-hidden className="[&_svg]:size-4">{icon}</span> : null}</div>
      {loading ? <Skeleton className="my-1 h-8 w-24" /> : <p className="m-0 text-[28px] leading-tight font-semibold tracking-tight tabular-nums">{value}</p>}
      {loading ? <Skeleton className="h-3.5 w-32" /> : hint ? <p className="m-0 text-[12.5px] text-muted-foreground">{hint}</p> : null}
    </div>
  )
}

export { StatTile }
