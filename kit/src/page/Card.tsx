import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { StarPicker } from "@/components/ui/star-rating"
import { Field, FieldLabel } from "@/components/ui/field"
import { cn } from "cn"
import type { Entry } from "../registry.ts"
import type { Rating } from "./export.ts"

export type Width = "phone" | "tablet" | "desktop"
export const widths: Record<Width, number | null> = { phone: 390, tablet: 768, desktop: null }

/** Điểm kiểu bút đỏ của thầy cô: chữ Lora nghiêng, màu chủ đạo. Chưa chấm thì mờ. */
function Grade({ value }: { value: number | null }) {
  return (
    <span role="img" aria-label={value == null ? "Chưa chấm" : `${value} trên 5`} className={cn("shrink-0 font-serif leading-none italic", value == null ? "text-muted-foreground/60" : "text-primary")}>
      <span className="text-[32px] font-medium">{value ?? "–"}</span>
      <span className="text-lg">/5</span>
    </span>
  )
}

/** Chỉ nạp iframe khi thẻ gần vào màn hình: 57 iframe cùng lúc sẽ làm máy yếu đứng. */
function useNear(ref: React.RefObject<HTMLElement | null>) {
  const [near, setNear] = React.useState(false)
  React.useEffect(() => {
    const el = ref.current
    if (!el || near) return
    const io = new IntersectionObserver(([x]) => x.isIntersecting && setNear(true), { rootMargin: "800px 0px" })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, near])
  return near
}

function Preview({ entry, width }: { entry: Entry; width: Width }) {
  const box = React.useRef<HTMLDivElement>(null)
  const near = useNear(box)
  const [h, setH] = React.useState(entry.minH ?? 120)
  const px = widths[width]
  const src = `${location.href.split("#")[0]}#/demo/${entry.id}`

  const onLoad = (e: React.SyntheticEvent<HTMLIFrameElement>) => {
    const doc = e.currentTarget.contentDocument
    if (!doc) return
    const measure = () => setH(Math.max(entry.minH ?? 0, Math.ceil(doc.documentElement.getBoundingClientRect().height)))
    new ResizeObserver(measure).observe(doc.documentElement)
    measure()
  }

  return (
    <div ref={box} className="overflow-hidden rounded-lg border bg-muted/50 p-0">
      <div className="mx-auto max-w-full" style={{ width: px ?? "100%" }}>
        {near ? (
          <iframe title={`Xem thử: ${entry.name}`} src={src} onLoad={onLoad} className="block w-full border-0 bg-background" style={{ height: h }} />
        ) : (
          <div className="bg-background" style={{ height: h }} />
        )}
      </div>
    </div>
  )
}

export function Card({ entry, rating, width, onChange }: { entry: Entry; rating?: Rating; width: Width; onChange: (id: string, p: { stars?: number | null; reason?: string }) => void }) {
  const rid = `why-${entry.id}`
  return (
    <article id={entry.id} className="scroll-mt-40 rounded-xl border bg-card">
      <header className="flex items-start justify-between gap-4 p-4 pb-3 md:px-5">
        <div className="grid min-w-0 gap-1">
          <h3 className="m-0">{entry.name}</h3>
          <p className="m-0 flex flex-wrap items-center gap-2 text-[13px] text-muted-foreground">
            <span className="break-words">{entry.ref ? `Tham khảo: ${entry.ref.split(". Web:")[0]}` : entry.astryx}</span>
            <Badge variant={entry.web ? "secondary" : "outline"}>{entry.web ? "web đã có" : "mới"}</Badge>
          </p>
        </div>
        <Grade value={rating?.stars ?? null} />
      </header>
      <div className="px-4 md:px-5"><Preview entry={entry} width={width} /></div>
      <footer className="grid gap-3 p-4 md:px-5">
        <StarPicker label={`Chấm ${entry.name}`} value={rating?.stars ?? null} onChange={(n) => onChange(entry.id, { stars: n })} className="-ml-2" />
        <Field>
          <FieldLabel htmlFor={rid}>Lý do hoặc chỗ cần chỉnh (không bắt buộc)</FieldLabel>
          <textarea
            id={rid}
            rows={2}
            maxLength={600}
            value={rating?.reason ?? ""}
            onChange={(e) => onChange(entry.id, { reason: e.target.value })}
            className="min-h-11 w-full resize-y rounded-md border border-input bg-card px-3 py-2 text-[15px] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          />
        </Field>
      </footer>
    </article>
  )
}
