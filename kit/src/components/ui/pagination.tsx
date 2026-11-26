import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { cn } from "cn"

/** Trang đầu, cuối, trang hiện tại và hai bên. Hẹp thì chỉ còn "Trang 3/12" kèm trước/sau. */
function pageList(page: number, total: number): (number | "…")[] {
  const set = new Set([1, total, page, page - 1, page + 1].filter((n) => n >= 1 && n <= total))
  const sorted = [...set].sort((a, b) => a - b)
  return sorted.flatMap((n, i) => (i && n - sorted[i - 1] > 1 ? ["…" as const, n] : [n]))
}

function Pagination({ page, total, onPage, className }: { page: number; total: number; onPage: (n: number) => void; className?: string }) {
  const step = "grid size-11 place-content-center rounded-lg text-sm outline-none transition-colors duration-[var(--duration-fast)] hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-40"
  return (
    <nav aria-label="Phân trang" className={cn("flex items-center justify-center gap-1", className)}>
      <button type="button" className={step} aria-label="Trang trước" disabled={page <= 1} onClick={() => onPage(page - 1)}><ChevronLeftIcon className="size-4" /></button>
      <span className="px-3 text-sm sm:hidden" aria-live="polite">Trang {page}/{total}</span>
      <ul className="m-0 hidden list-none items-center gap-1 p-0 sm:flex">
        {pageList(page, total).map((n, i) => (
          <li key={i}>
            {n === "…" ? <span className="grid size-11 place-content-center text-muted-foreground">…</span> : (
              <button type="button" aria-label={`Trang ${n}`} aria-current={n === page ? "page" : undefined} onClick={() => onPage(n)} className={cn(step, n === page && "bg-primary text-primary-foreground hover:bg-primary")}>{n}</button>
            )}
          </li>
        ))}
      </ul>
      <button type="button" className={step} aria-label="Trang sau" disabled={page >= total} onClick={() => onPage(page + 1)}><ChevronRightIcon className="size-4" /></button>
    </nav>
  )
}

export { Pagination }
