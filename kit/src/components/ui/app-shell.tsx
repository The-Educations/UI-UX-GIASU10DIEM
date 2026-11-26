import * as React from "react"
import { cn } from "cn"

export type NavItem = { id: string; label: string; icon: React.ReactNode; badge?: number }

/** Thanh bên 248px cho máy tính (từ 1024px). */
function SideNav({ items, active, onSelect, brand, className }: { items: NavItem[]; active: string; onSelect: (id: string) => void; brand: React.ReactNode; className?: string }) {
  return (
    <nav aria-label="Menu chính" className={cn("hidden w-62 shrink-0 flex-col gap-1 border-r bg-(--surface-side) p-3 lg:flex", className)}>
      <div className="px-3 py-3 font-serif text-lg font-medium text-primary">{brand}</div>
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          aria-current={it.id === active ? "page" : undefined}
          onClick={() => onSelect(it.id)}
          className="flex min-h-11 items-center gap-3 rounded-[10px] px-3 text-left text-sm outline-none transition-colors duration-[var(--duration-fast)] hover:bg-(--surface-hover) focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-[current=page]:bg-(--surface-active) aria-[current=page]:font-medium aria-[current=page]:text-primary [&_svg]:size-4"
        >
          {it.icon}
          <span className="flex-1">{it.label}</span>
          {it.badge ? <span className="grid min-w-5 place-content-center rounded-full bg-primary px-1.5 text-[11px] text-primary-foreground">{it.badge}</span> : null}
        </button>
      ))}
    </nav>
  )
}

/** Thanh trên 64px: tên trang bên trái, hành động bên phải. */
function TopNav({ title, actions, className }: { title: React.ReactNode; actions?: React.ReactNode; className?: string }) {
  return (
    <header className={cn("sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-3 border-b bg-background px-4 lg:px-10", className)}>
      <h2 className="m-0 min-w-0 truncate">{title}</h2>
      <div className="flex shrink-0 items-center gap-2">{actions}</div>
    </header>
  )
}

/** Thanh dưới cho điện thoại và máy tính bảng (dưới 1024px). Chừa vùng an toàn của iPhone. */
function MobileNav({ items, active, onSelect, className }: { items: NavItem[]; active: string; onSelect: (id: string) => void; className?: string }) {
  return (
    <nav aria-label="Menu chính" className={cn("sticky bottom-0 z-10 grid shrink-0 border-t bg-background pb-[env(safe-area-inset-bottom)] lg:hidden", className)} style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          aria-current={it.id === active ? "page" : undefined}
          onClick={() => onSelect(it.id)}
          className="relative flex min-h-14 min-w-11 flex-col items-center justify-center gap-0.5 text-[11.5px] text-muted-foreground outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/50 aria-[current=page]:font-medium aria-[current=page]:text-primary [&_svg]:size-5"
        >
          {it.icon}
          <span className="max-w-full truncate px-0.5">{it.label}</span>
          {it.badge ? <span className="absolute top-1.5 left-1/2 ml-1.5 grid min-w-4 place-content-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground">{it.badge}</span> : null}
        </button>
      ))}
    </nav>
  )
}

/** Khung sau đăng nhập: thanh bên (≥1024px) + thanh trên + nội dung tối đa 1160px + thanh dưới (<1024px). */
function AppShell({ side, top, bottom, children, className }: { side: React.ReactNode; top: React.ReactNode; bottom: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex min-h-[inherit] w-full bg-background", className)}>
      {side}
      <div className="flex min-w-0 flex-1 flex-col">
        {top}
        <main className="mx-auto w-full max-w-[1160px] flex-1 p-4 lg:px-10 lg:py-8">{children}</main>
        {bottom}
      </div>
    </div>
  )
}

export { AppShell, SideNav, TopNav, MobileNav }
