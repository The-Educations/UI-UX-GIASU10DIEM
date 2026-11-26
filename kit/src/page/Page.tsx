import * as React from "react"
import { DownloadIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SegmentedControl } from "@/components/ui/segmented"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Table, TableCell, TableHead, TableRow, ScrollableArea } from "@/components/ui/table"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"
import { entries, groups, skipped } from "../registry.ts"
import { summary } from "./export.ts"
import { Card, type Width } from "./Card.tsx"
import { ExportDialog } from "./ExportDialog.tsx"
import { prefs, useRatings } from "./store.ts"

type Filter = "all" | "todo" | "fix"

export function Page() {
  const { ratings, set, saved } = useRatings()
  const [width, setWidth] = React.useState<Width>("phone")
  const [filter, setFilter] = React.useState<Filter>("all")
  const [group, setGroup] = React.useState("all")
  const [dark, setDark] = React.useState(() => prefs.get("dark") === "1")
  const s = summary(ratings)

  React.useEffect(() => { document.documentElement.classList.toggle("dark", dark); prefs.set("dark", dark ? "1" : "0") }, [dark])

  const show = (id: string, g: string) => {
    const r = ratings[id]
    if (group !== "all" && g !== group) return false
    if (filter === "todo") return r?.stars == null
    if (filter === "fix") return (r?.stars ?? 5) <= 3 || !!r?.reason.trim()
    return true
  }
  const visible = groups.map((g) => ({ g, list: entries.filter((e) => e.group === g.id && show(e.id, e.group)) })).filter((x) => x.list.length)
  const exportBtn = (
    <ExportDialog ratings={ratings} storageOk={saved}>
      <Button><DownloadIcon />Xuất kết quả</Button>
    </ExportDialog>
  )

  return (
    <>
      <header className="z-20 border-b bg-background md:sticky md:top-0">
        <div className="mx-auto grid max-w-[1160px] gap-3 px-4 py-3 lg:px-10">
          <div className="flex items-center justify-between gap-3">
            <div className="grid min-w-0">
              <h1 className="m-0 truncate">Chấm component</h1>
              <p className="m-0 text-[13px] text-muted-foreground tabular-nums" aria-live="polite">Đã chấm {s.rated}/{s.total}</p>
            </div>
            {exportBtn}
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <SegmentedControl className="max-md:hidden" aria-label="Bề ngang khung xem" value={width} onValueChange={(v) => setWidth(v as Width)} options={[{ value: "phone", label: "Điện thoại" }, { value: "tablet", label: "Máy tính bảng" }, { value: "desktop", label: "Máy tính" }]} />
            <SegmentedControl aria-label="Lọc theo trạng thái" value={filter} onValueChange={(v) => setFilter(v as Filter)} options={[{ value: "all", label: "Tất cả" }, { value: "todo", label: "Chưa chấm" }, { value: "fix", label: "Cần sửa" }]} />
            <div className="w-full sm:w-56"><Select value={group} onValueChange={setGroup}>
              <SelectTrigger aria-label="Lọc theo nhóm"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="min-h-11">Mọi nhóm</SelectItem>
                {groups.map((g) => <SelectItem key={g.id} value={g.id} className="min-h-11">{g.label}</SelectItem>)}
              </SelectContent>
            </Select></div>
            <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm"><Switch checked={dark} onCheckedChange={setDark} />Nền tối (đề xuất)</label>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1160px] grid-cols-[minmax(0,1fr)] gap-10 px-4 py-8 lg:px-10">
        <p className="m-0 max-w-prose text-sm text-muted-foreground">Chấm 1 đến 5 sao, ghi lý do nếu muốn. Kết quả lưu ngay trong trình duyệt này, không gửi đi đâu. Chấm xong bấm Xuất kết quả.</p>

        {visible.length === 0 ? (
          <Empty><EmptyHeader><EmptyTitle>Không có mục nào khớp</EmptyTitle><EmptyDescription>Đổi bộ lọc để xem tiếp.</EmptyDescription></EmptyHeader><Button variant="outline" onClick={() => { setFilter("all"); setGroup("all") }}>Bỏ lọc</Button></Empty>
        ) : visible.map(({ g, list }) => (
          <section key={g.id} aria-labelledby={`g-${g.id}`} className="grid grid-cols-[minmax(0,1fr)] gap-4">
            <h2 id={`g-${g.id}`} className="m-0">{g.label} <span className="text-[13px] font-normal text-muted-foreground tabular-nums">{list.length}</span></h2>
            <div className="grid grid-cols-[minmax(0,1fr)] gap-6">{list.map((e) => <Card key={e.id} entry={e} rating={ratings[e.id]} width={width} onChange={set} />)}</div>
          </section>
        ))}

        {filter === "all" && group === "all" ? (
          <section className="grid grid-cols-[minmax(0,1fr)] gap-4" aria-labelledby="skipped">
            <h2 id="skipped" className="m-0">Không dựng riêng <span className="text-[13px] font-normal text-muted-foreground tabular-nums">{skipped.length}</span></h2>
            <ScrollableArea label="Tên Astryx không dựng riêng">
              <Table>
                <thead><tr><TableHead>Tên Astryx</TableHead><TableHead>Cách xử lý</TableHead><TableHead>Lý do</TableHead></tr></thead>
                <tbody>{skipped.map((x) => <TableRow key={x.astryx}><TableCell className="font-medium">{x.astryx}</TableCell><TableCell>{x.status}{x.into ? ` ${x.into}` : ""}</TableCell><TableCell className="text-muted-foreground">{x.reason}</TableCell></TableRow>)}</tbody>
              </Table>
            </ScrollableArea>
          </section>
        ) : null}
      </main>
    </>
  )
}
