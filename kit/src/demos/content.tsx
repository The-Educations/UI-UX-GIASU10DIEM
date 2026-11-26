import * as React from "react"
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Timestamp, money } from "@/components/ui/timestamp"
import { StarDisplay, StarPicker } from "@/components/ui/star-rating"
import { BookOpenIcon } from "lucide-react"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Block } from "./helpers"

const tone = (c: string) => ({ background: `var(--pastel-${c})`, color: `var(--pastel-${c}-ink)` })

export const avatar = () => (
  <div className="flex flex-wrap items-center gap-3">
    {[["rose", "T"], ["sage", "H"], ["sky", "N"], ["lilac", "Đ"]].map(([c, l]) => <Avatar key={c} className="size-11"><AvatarFallback className="font-serif" style={tone(c)}>{l}</AvatarFallback></Avatar>)}
    <Avatar className="size-14"><AvatarFallback className="font-serif text-lg" style={tone("peach")}>Ư</AvatarFallback></Avatar>
  </div>
)

export const avatarGroup = () => (
  <AvatarGroup>
    {[["rose", "T"], ["sage", "H"], ["sky", "N"]].map(([c, l]) => <Avatar key={c}><AvatarFallback className="font-serif" style={tone(c)}>{l}</AvatarFallback></Avatar>)}
    <AvatarGroupCount>+5</AvatarGroupCount>
  </AvatarGroup>
)

export const emptyState = () => (
  <div className="grid gap-5">
    <Empty>
      <EmptyHeader><EmptyMedia variant="icon"><BookOpenIcon /></EmptyMedia><EmptyTitle>Chưa có lớp nào</EmptyTitle><EmptyDescription>Đặt buổi học thử để bắt đầu. Buổi đầu miễn phí.</EmptyDescription></EmptyHeader>
      <EmptyContent><Button>Tìm gia sư</Button></EmptyContent>
    </Empty>
  </div>
)

export const typography = () => (
  <div className="grid gap-4">
    <h1>Tìm gia sư dạy Toán ở Quận 7</h1>
    <h2>Buổi học sắp tới</h2>
    <h3>Toán 9 · Luyện thi vào 10</h3>
    <p className="max-w-prose">Phụ huynh đặt lịch học thử, gia sư xác nhận trong ngày. Chữ có dấu phải rõ: ắ ặ ễ ỗ ữ ỵ Đ đ.</p>
    <p className="text-[13px] text-muted-foreground">Chữ phụ 12–13px, màu muted-foreground.</p>
    <p className="font-serif text-xl italic text-primary">Nguyễn Thị Ánh Tuyết</p>
    <p className="text-sm tabular-nums">{money(200000)} · 1.250.000đ · 5 buổi</p>
  </div>
)

export const timestamp = () => {
  const now = Date.now()
  return (
    <ul className="m-0 grid list-none gap-2 p-0 text-sm">
      <li>Gửi <Timestamp date={new Date(now - 5 * 60000)} now={now} /></li>
      <li>Cập nhật <Timestamp date={new Date(now - 3 * 3600000)} now={now} /></li>
      <li>Học vào <Timestamp date={new Date(now + 2 * 86400000)} now={now} /></li>
      <li>Tạo ngày <Timestamp date={new Date("2026-09-01T10:00:00+07:00")} now={now} /></li>
    </ul>
  )
}

export const starRating = () => {
  const [v, setV] = React.useState<number | null>(4)
  return (
    <div className="grid gap-5">
      <Block title="Chọn sao (dùng mũi tên để đổi, bấm lại để bỏ chọn)"><StarPicker label="Chấm gia sư" value={v} onChange={setV} /></Block>
      <Block title="Chỉ đọc"><StarDisplay value={4.8} count={24} /></Block>
      <Block title="Chưa có đánh giá"><StarDisplay value={0} /></Block>
    </div>
  )
}
