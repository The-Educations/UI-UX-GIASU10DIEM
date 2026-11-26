import * as React from "react"
import { SendIcon } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Message, MessageAvatar, MessageContent, MessageFooter } from "@/components/ui/message"
import { List, Item, MetadataList } from "@/components/ui/list"
import { ScrollableArea, Table, TableCell, TableHead, TableRow } from "@/components/ui/table"
import { StatusDot } from "@/components/ui/status-dot"
import { money } from "@/components/ui/timestamp"
import { Skeleton } from "@/components/ui/skeleton"
import { States, ErrorBox, EmptyBox, Locked } from "./helpers"

const rows = [
  { id: "GD-0412", d: "26/11/2026", t: "Nạp ví", s: 500000, ok: "positive" as const, l: "Thành công" },
  { id: "GD-0411", d: "24/11/2026", t: "Học phí Toán 9", s: -200000, ok: "positive" as const, l: "Thành công" },
  { id: "GD-0409", d: "21/11/2026", t: "Nạp ví", s: 300000, ok: "error" as const, l: "Thất bại" },
]

export const table = () => (
  <States views={{
    ok: (
      <div className="@container">
        <ScrollableArea label="Lịch sử giao dịch" className="max-md:hidden">
          <Table>
            <thead><tr><TableHead>Mã</TableHead><TableHead>Ngày</TableHead><TableHead>Nội dung</TableHead><TableHead className="text-right">Số tiền</TableHead><TableHead>Trạng thái</TableHead></tr></thead>
            <tbody>{rows.map((r) => <TableRow key={r.id}><TableCell>{r.id}</TableCell><TableCell>{r.d}</TableCell><TableCell>{r.t}</TableCell><TableCell className="text-right tabular-nums">{r.s > 0 ? "+" : "−"}{money(Math.abs(r.s))}</TableCell><TableCell><StatusDot tone={r.ok}>{r.l}</StatusDot></TableCell></TableRow>)}</tbody>
          </Table>
        </ScrollableArea>
        <List className="md:hidden">{rows.map((r) => <Item key={r.id} title={r.t} description={`${r.d} · ${r.l}`} trailing={`${r.s > 0 ? "+" : "−"}${money(Math.abs(r.s))}`} />)}</List>
      </div>
    ),
    loading: <div className="grid gap-2">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-11 w-full" />)}</div>,
    empty: <EmptyBox title="Chưa có giao dịch" hint="Nạp ví để đặt buổi học đầu tiên." action={<Button>Nạp ví</Button>} />,
    error: <ErrorBox what="lịch sử giao dịch" />,
    locked: <Locked why="Chỉ chủ tài khoản mới xem được giao dịch. Đăng nhập lại để tiếp tục." />,
  }} />
)

export const list = () => (
  <States views={{
    ok: <List>
      <Item leading={<Avatar><AvatarFallback>T</AvatarFallback></Avatar>} title="Ánh Tuyết" description="Tin mới: Em xin phép nghỉ buổi mai" trailing="5 phút" href="#" />
      <Item leading={<Avatar><AvatarFallback>H</AvatarFallback></Avatar>} title="Đặng Văn Hiếu" description="Đã gửi bài tập Vật lý" trailing="Hôm qua" href="#" />
      <Item title="Trung tâm hỗ trợ" description="Phản hồi trong 24 giờ" trailing={<Badge variant="secondary">Mới</Badge>} />
    </List>,
    loading: <div className="grid gap-px overflow-hidden rounded-xl border">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-14 w-full rounded-none" />)}</div>,
    empty: <EmptyBox title="Chưa có tin nhắn" hint="Nhắn gia sư từ trang hồ sơ để hỏi lịch học." />,
    error: <ErrorBox what="tin nhắn" />,
  }} />
)

export const metadataList = () => (
  <MetadataList items={[
    { label: "Gia sư", value: "Nguyễn Thị Ánh Tuyết" },
    { label: "Lịch học", value: "Thứ 4 và Thứ 7, 19:00 – 20:30" },
    { label: "Địa điểm", value: "12 Nguyễn Huệ, Quận 1, TP.HCM, tầng 3 căn hộ 302" },
    { label: "Học phí", value: money(200000) + " / buổi" },
  ]} />
)

export const chat = () => {
  const [log, setLog] = React.useState([{ me: false, t: "Em chào cô ạ, mai em xin đổi sang 20:00 được không?" }, { me: true, t: "Được em nhé, cô sẽ cập nhật lịch." }])
  const [v, setV] = React.useState("")
  const send = () => { if (v.trim()) { setLog([...log, { me: true, t: v.trim() }]); setV("") } }
  return (
    <div className="grid max-w-lg gap-3">
      <div className="grid gap-3 rounded-xl border bg-card p-3" role="log" aria-label="Tin nhắn">
        {log.map((m, i) => (
          <Message key={i} align={m.me ? "end" : "start"}>
            {m.me ? null : <MessageAvatar><Avatar className="size-8"><AvatarFallback>H</AvatarFallback></Avatar></MessageAvatar>}
            <MessageContent><Bubble variant={m.me ? "default" : "secondary"} align={m.me ? "end" : "start"}><BubbleContent>{m.t}</BubbleContent></Bubble><MessageFooter>{m.me ? "Đã gửi" : "19:42"}</MessageFooter></MessageContent>
          </Message>
        ))}
      </div>
      <form className="flex items-end gap-2" onSubmit={(e) => { e.preventDefault(); send() }}>
        <Textarea aria-label="Nhập tin nhắn" className="min-h-11 flex-1" rows={1} value={v} onChange={(e) => setV(e.target.value)} placeholder="Nhập tin nhắn" />
        <Button size="icon" aria-label="Gửi" disabled={!v.trim()}><SendIcon /></Button>
      </form>
    </div>
  )
}
