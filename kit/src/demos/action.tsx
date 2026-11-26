import * as React from "react"
import { BookmarkIcon, CopyIcon, HeartIcon, MoreHorizontalIcon, PencilIcon, SendIcon, SettingsIcon, Trash2Icon, CalendarPlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { SegmentedControl } from "@/components/ui/segmented"
import { Toggle } from "@/components/ui/toggle"
import { Spinner } from "@/components/ui/spinner"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Block } from "./helpers"

function Save() {
  const [s, setS] = React.useState<"idle" | "busy" | "done">("idle")
  return (
    <Button variant="secondary" disabled={s === "busy"} aria-busy={s === "busy"} onClick={() => { setS("busy"); setTimeout(() => setS("done"), 1200) }}>
      {s === "busy" ? <><Spinner />Đang lưu…</> : s === "done" ? "Đã lưu" : "Lưu thay đổi"}
    </Button>
  )
}

export const button = () => (
  <div className="grid gap-6">
    <Block title="Mức nhấn: mỗi màn hình chỉ một nút chính">
      <div className="flex flex-wrap gap-2">
        <Button><CalendarPlusIcon />Đặt học thử</Button>
        <Button variant="secondary">Lưu nháp</Button>
        <Button variant="outline">Xem hồ sơ</Button>
        <Button variant="ghost">Bỏ qua</Button>
        <Button variant="link">Điều khoản</Button>
      </div>
    </Block>
    <Block title="Đang xử lý (bấm thử): khoá nút, đổi nhãn">
      <div><Save /></div>
    </Block>
    <Block title="Bị khoá và nguy hiểm">
      <div className="flex flex-wrap gap-2">
        <Button disabled>Gửi đánh giá</Button>
        <Button variant="destructive">Huỷ lớp</Button>
      </div>
    </Block>
    <Block title="Cỡ">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm">Nhỏ</Button><Button>Mặc định</Button><Button size="lg">Lớn</Button>
      </div>
    </Block>
    <Block title="Hẹp: nút chính rộng hết khung">
      <Button className="w-full"><SendIcon />Gửi yêu cầu</Button>
    </Block>
  </div>
)

export const iconButton = () => (
  <div className="flex flex-wrap items-center gap-2">
    <Button variant="outline" size="icon" aria-label="Chỉnh sửa"><PencilIcon /></Button>
    <Button variant="outline" size="icon" aria-label="Sao chép liên kết"><CopyIcon /></Button>
    <Button variant="ghost" size="icon" aria-label="Cài đặt"><SettingsIcon /></Button>
    <Button variant="destructive" size="icon" aria-label="Xoá"><Trash2Icon /></Button>
    <Button variant="outline" size="icon" aria-label="Lưu gia sư" disabled><BookmarkIcon /></Button>
  </div>
)

export const buttonGroup = () => {
  const [v, setV] = React.useState("tuan")
  return (
    <div className="grid gap-5">
      <ButtonGroup aria-label="Xem lịch theo">
        {[["ngay", "Ngày"], ["tuan", "Tuần"], ["thang", "Tháng"]].map(([k, l]) => (
          <Button key={k} variant={v === k ? "secondary" : "outline"} aria-pressed={v === k} onClick={() => setV(k)}>{l}</Button>
        ))}
      </ButtonGroup>
      <ButtonGroup aria-label="Thao tác với bài tập">
        <Button variant="outline"><CopyIcon />Sao chép</Button>
        <Button variant="outline"><PencilIcon />Sửa</Button>
      </ButtonGroup>
    </div>
  )
}

export const segmented = () => {
  const [v, setV] = React.useState("sap")
  return (
    <div className="grid gap-5">
      <SegmentedControl aria-label="Lọc buổi học" value={v} onValueChange={setV} options={[{ value: "sap", label: "Sắp tới" }, { value: "xong", label: "Đã học" }, { value: "huy", label: "Đã huỷ" }]} />
      <SegmentedControl aria-label="Chế độ xem" defaultValue="luoi" options={[{ value: "luoi", label: "Lưới" }, { value: "ds", label: "Danh sách" }]} />
    </div>
  )
}

export const toggleButton = () => (
  <div className="flex flex-wrap items-center gap-2">
    <Toggle variant="outline" aria-label="Lưu gia sư" className="min-h-11 min-w-11"><HeartIcon /></Toggle>
    <Toggle variant="outline" aria-label="Nhắc tôi trước giờ học" defaultPressed className="min-h-11 px-4"><BookmarkIcon />Nhắc trước 15 phút</Toggle>
    <Toggle variant="outline" aria-label="Chỉ gia sư đã xác minh" disabled className="min-h-11 px-4">Đã xác minh</Toggle>
  </div>
)

export const dropdownMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline"><MoreHorizontalIcon />Thao tác</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start">
      <DropdownMenuLabel>Lớp Toán 9</DropdownMenuLabel>
      <DropdownMenuItem><PencilIcon />Đổi lịch học</DropdownMenuItem>
      <DropdownMenuItem><CopyIcon />Sao chép liên kết</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem destructive><Trash2Icon />Huỷ lớp</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)
