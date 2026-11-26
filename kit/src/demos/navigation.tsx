import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Pagination } from "@/components/ui/pagination"
import { Stepper } from "@/components/ui/stepper"
import { Button } from "@/components/ui/button"
import { Block } from "./helpers"

export const tabs = () => (
  <Tabs defaultValue="gioi-thieu">
    <div className="max-w-full overflow-x-auto"><TabsList className="w-max">
      <TabsTrigger value="gioi-thieu">Giới thiệu</TabsTrigger>
      <TabsTrigger value="danh-gia">Đánh giá (24)</TabsTrigger>
      <TabsTrigger value="lich">Lịch rảnh</TabsTrigger>
      <TabsTrigger value="hoc-phi">Học phí</TabsTrigger>
    </TabsList></div>
    <TabsContent value="gioi-thieu" className="text-sm">Cử nhân Sư phạm Toán, 5 năm dạy ôn thi vào lớp 10.</TabsContent>
    <TabsContent value="danh-gia" className="text-sm">24 đánh giá, trung bình 4,8 trên 5.</TabsContent>
    <TabsContent value="lich" className="text-sm">Rảnh tối Thứ 2, 4, 6 và cả ngày Chủ nhật.</TabsContent>
    <TabsContent value="hoc-phi" className="text-sm">200.000đ mỗi buổi 90 phút.</TabsContent>
  </Tabs>
)

export const breadcrumbs = () => (
  <div className="grid gap-5">
    <Block title="Ngắn"><Breadcrumb items={[{ label: "Trang chủ", href: "#" }, { label: "Gia sư", href: "#" }, { label: "Ánh Tuyết" }]} /></Block>
    <Block title="Dài: hẹp thì chỉ giữ mục cha gần nhất"><Breadcrumb items={[{ label: "Trang chủ", href: "#" }, { label: "Quản trị", href: "#" }, { label: "Lớp học", href: "#" }, { label: "Toán 9", href: "#" }, { label: "Buổi 3: Hệ phương trình" }]} /></Block>
  </div>
)

export const paginationDemo = () => {
  const [p, setP] = React.useState(5)
  return <Pagination page={p} total={12} onPage={setP} />
}

export const stepper = () => {
  const [s, setS] = React.useState(1)
  const steps = ["Thông tin", "Lịch rảnh", "Học phí", "Xác minh"]
  return (
    <div className="grid gap-5">
      <Stepper steps={steps} current={s} />
      <div className="flex gap-2"><Button variant="outline" disabled={s === 0} onClick={() => setS(s - 1)}>Quay lại</Button><Button variant="secondary" disabled={s === steps.length - 1} onClick={() => setS(s + 1)}>Tiếp theo</Button></div>
    </div>
  )
}
