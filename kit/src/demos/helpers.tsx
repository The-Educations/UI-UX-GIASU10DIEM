import * as React from "react"
import { SegmentedControl } from "@/components/ui/segmented"
import { Spinner } from "@/components/ui/spinner"
import { Banner } from "@/components/ui/banner"
import { Button } from "@/components/ui/button"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"
import { LockIcon } from "lucide-react"

export type StateKey = "ok" | "loading" | "empty" | "error" | "locked"
const names: Record<StateKey, string> = { ok: "Bình thường", loading: "Đang tải", empty: "Trống", error: "Lỗi", locked: "Bị khoá" }

/** Một khối con trong demo. Tiêu đề nhỏ nói rõ đang xem biến thể nào. */
export function Block({ title, children, className = "" }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`grid gap-2.5 ${className}`}>
      {title ? <h3 className="text-[13px] font-medium text-muted-foreground">{title}</h3> : null}
      {children}
    </section>
  )
}

/** Chuyển giữa các trạng thái bắt buộc của một khối dữ liệu. Chỉ hiện nút cho trạng thái có truyền vào. */
export function States({ views, label = "Trạng thái" }: { views: Partial<Record<StateKey, React.ReactNode>>; label?: string }) {
  const keys = (Object.keys(names) as StateKey[]).filter((k) => views[k] != null)
  const [k, setK] = React.useState<StateKey>(keys[0])
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-3">
      <div className="max-w-full overflow-x-auto">
        <SegmentedControl aria-label={label} value={k} onValueChange={(v) => setK(v as StateKey)} options={keys.map((x) => ({ value: x, label: names[x] }))} className="w-max" />
      </div>
      <div>{views[k]}</div>
    </div>
  )
}

export const Loading = ({ text = "Đang tải…" }: { text?: string }) => (
  <div className="flex min-h-24 items-center justify-center gap-2 rounded-xl border bg-card text-sm text-muted-foreground"><Spinner />{text}</div>
)

export const ErrorBox = ({ what = "danh sách" }: { what?: string }) => (
  <Banner tone="error" title={`Không tải được ${what}`} action={<Button size="sm" variant="outline">Thử lại</Button>}>Kiểm tra kết nối mạng rồi thử lại.</Banner>
)

export const EmptyBox = ({ title, hint, action }: { title: string; hint: string; action?: React.ReactNode }) => (
  <Empty>
    <EmptyHeader><EmptyTitle>{title}</EmptyTitle><EmptyDescription>{hint}</EmptyDescription></EmptyHeader>
    {action}
  </Empty>
)

export const Locked = ({ why }: { why: string }) => (
  <div className="flex items-start gap-3 rounded-xl border border-dashed bg-muted p-4 text-sm text-muted-foreground"><LockIcon className="mt-0.5 size-4 shrink-0" aria-hidden />{why}</div>
)
