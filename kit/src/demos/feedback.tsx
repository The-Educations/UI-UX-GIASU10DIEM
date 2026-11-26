import * as React from "react"
import { CheckIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Banner } from "@/components/ui/banner"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { StatusDot } from "@/components/ui/status-dot"
import { InfoTip, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Block } from "./helpers"

export const badge = () => (
  <div className="flex flex-wrap items-center gap-2">
    <Badge>Mới</Badge>
    <Badge variant="secondary">Toán 9</Badge>
    <Badge variant="outline">Tại nhà</Badge>
    <Badge variant="destructive">Quá hạn</Badge>
    <Badge className="bg-(--positive-soft) text-(--positive)"><CheckIcon />Đã xác minh</Badge>
    <Badge className="bg-(--warning-soft) text-(--warning)">Chờ duyệt</Badge>
  </div>
)

export const banner = () => {
  const [open, setOpen] = React.useState(true)
  return (
    <div className="grid gap-3">
      <Banner tone="info" title="Lịch học tuần sau đã mở">Bạn có thể đặt trước đến Chủ nhật.</Banner>
      <Banner tone="positive" title="Đã gửi yêu cầu học thử">Gia sư sẽ xác nhận trong ngày.</Banner>
      <Banner tone="warning" title="Số dư còn dưới 200.000đ" action={<Button size="sm" variant="outline">Nạp ví</Button>}>Nạp thêm để không bị gián đoạn buổi học.</Banner>
      <Banner tone="error" title="Thanh toán không thành công">Ngân hàng từ chối giao dịch. Thử thẻ khác hoặc liên hệ ngân hàng.</Banner>
      {open ? <Banner tone="info" onDismiss={() => setOpen(false)}>Bấm dấu × để đóng thông báo này.</Banner> : <Button variant="outline" onClick={() => setOpen(true)}>Hiện lại</Button>}
    </div>
  )
}

export const progressBar = () => (
  <div className="grid gap-5">
    <Block title="Có số: buổi đã học"><div className="grid gap-1.5"><div className="flex justify-between text-sm"><span>Đã học 5/8 buổi</span><span className="tabular-nums">63%</span></div><Progress value={63} aria-label="Tiến độ khoá học" /></div></Block>
    <Block title="Hồ sơ hoàn thiện"><div className="grid gap-1.5"><span className="text-sm">Hồ sơ hoàn thiện 100%</span><Progress value={100} aria-label="Hồ sơ" /></div></Block>
  </div>
)

export const skeleton = () => (
  <div className="grid gap-5" aria-busy="true" aria-label="Đang tải">
    <div className="flex items-center gap-3"><Skeleton className="size-11 rounded-full" /><div className="grid flex-1 gap-2"><Skeleton className="h-4 w-1/2" /><Skeleton className="h-3 w-1/3" /></div></div>
    <Skeleton className="h-24 w-full rounded-xl" />
  </div>
)

export const spinner = () => (
  <div className="flex flex-wrap items-center gap-6 text-sm"><span className="inline-flex items-center gap-2"><Spinner />Đang tải lịch…</span><Button disabled><Spinner />Đang gửi…</Button></div>
)

export const statusDot = () => (
  <div className="grid gap-2">
    <StatusDot tone="positive">Đang dạy</StatusDot>
    <StatusDot tone="warning">Chờ duyệt hồ sơ</StatusDot>
    <StatusDot tone="error">Bị khoá thanh toán</StatusDot>
    <StatusDot tone="neutral">Tạm nghỉ</StatusDot>
  </div>
)

export const infoTip = () => (
  <TooltipProvider>
    <div className="grid gap-3">
      <div className="flex items-center gap-1 text-sm">Phí nền tảng 10%<InfoTip label="Giải thích phí nền tảng">Phí này trừ vào thu nhập của gia sư, không cộng thêm vào học phí bạn trả.</InfoTip></div>
      <div className="flex items-center gap-3 text-sm">
        <Tooltip><TooltipTrigger asChild><Button variant="outline">Chỉ trên máy tính</Button></TooltipTrigger><TooltipContent>Rê chuột hoặc Tab vào để xem. Điện thoại dùng dấu (i).</TooltipContent></Tooltip>
      </div>
    </div>
  </TooltipProvider>
)
