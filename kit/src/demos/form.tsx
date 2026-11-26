import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckRow } from "@/components/ui/checkbox"
import { RadioGroup, RadioRow } from "@/components/ui/radio-group"
import { SwitchRow } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { NumberInput } from "@/components/ui/number-input"
import { FileInput } from "@/components/ui/file-input"
import { Tokenizer } from "@/components/ui/tokenizer"
import { Typeahead } from "@/components/ui/typeahead"
import { InputGroup } from "@/components/ui/input-group"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { money } from "@/components/ui/timestamp"
import { Block, Loading, States } from "./helpers"
import { Skeleton } from "@/components/ui/skeleton"

export const field = () => {
  const [v, setV] = React.useState("0912")
  const bad = v.replace(/\D/g, "").length < 10
  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="f-ten">Họ và tên</FieldLabel>
        <Input id="f-ten" autoComplete="name" defaultValue="Nguyễn Thị Ánh Tuyết" />
      </Field>
      <Field data-invalid={bad}>
        <FieldLabel htmlFor="f-sdt">Số điện thoại</FieldLabel>
        <Input id="f-sdt" inputMode="tel" autoComplete="tel" aria-invalid={bad} value={v} onChange={(e) => setV(e.target.value)} />
        {bad ? <FieldError>Số điện thoại cần đủ 10 chữ số. Bạn đang nhập {v.replace(/\D/g, "").length}.</FieldError> : <FieldDescription>Gia sư chỉ thấy số này sau khi bạn xác nhận lớp.</FieldDescription>}
      </Field>
      <Field data-disabled="true">
        <FieldLabel htmlFor="f-mail">Email đăng nhập</FieldLabel>
        <Input id="f-mail" disabled defaultValue="tuyet@example.com" />
        <FieldDescription>Không đổi được email sau khi xác minh.</FieldDescription>
      </Field>
    </FieldGroup>
  )
}

export const textInput = () => (
  <States views={{
    ok: <Field><FieldLabel htmlFor="t1">Trường đang học</FieldLabel><Input id="t1" autoComplete="organization" placeholder="Ví dụ: THPT Lê Hồng Phong" /></Field>,
    loading: <div className="grid gap-2"><Skeleton className="h-4 w-32" /><Skeleton className="h-11 w-full" /></div>,
    error: <Field data-invalid="true"><FieldLabel htmlFor="t2">Email</FieldLabel><Input id="t2" type="email" aria-invalid defaultValue="tuyet@" /><FieldError>Email thiếu phần sau dấu @. Ví dụ: tuyet@gmail.com</FieldError></Field>,
    locked: <Field data-disabled="true"><FieldLabel htmlFor="t3">Mã lớp</FieldLabel><Input id="t3" disabled defaultValue="TOAN9-0412" /></Field>,
  }} />
)

export const textarea = () => {
  const [v, setV] = React.useState("")
  const max = 300
  return (
    <Field data-invalid={v.length > max}>
      <FieldLabel htmlFor="ta">Giới thiệu bản thân</FieldLabel>
      <Textarea id="ta" value={v} aria-invalid={v.length > max} onChange={(e) => setV(e.target.value)} placeholder="Kinh nghiệm dạy, phương pháp, thành tích học sinh" />
      <p className={`text-right text-[12.5px] tabular-nums ${v.length > max ? "text-destructive" : "text-muted-foreground"}`}>{v.length}/{max}</p>
    </Field>
  )
}

export const inputGroup = () => (
  <FieldGroup>
    <Field><FieldLabel htmlFor="g1">Số điện thoại</FieldLabel><InputGroup id="g1" prefix="+84" inputMode="tel" autoComplete="tel-national" placeholder="912 345 678" /></Field>
    <Field><FieldLabel htmlFor="g2">Học phí mỗi buổi</FieldLabel><InputGroup id="g2" suffix="đ / buổi" inputMode="numeric" defaultValue="200.000" /></Field>
    <Field data-invalid="true"><FieldLabel htmlFor="g3">Số dư muốn nạp</FieldLabel><InputGroup id="g3" suffix="đ" inputMode="numeric" aria-invalid defaultValue="5.000" /><FieldError>Tối thiểu 50.000đ mỗi lần nạp.</FieldError></Field>
  </FieldGroup>
)

export const selector = () => {
  const [v, setV] = React.useState("")
  return (
    <States views={{
      ok: (
        <Field><FieldLabel htmlFor="s1">Lớp</FieldLabel>
          <Select value={v} onValueChange={setV}>
            <SelectTrigger id="s1"><SelectValue placeholder="Chọn lớp" /></SelectTrigger>
            <SelectContent>{["Lớp 6", "Lớp 7", "Lớp 8", "Lớp 9", "Lớp 10", "Lớp 11", "Lớp 12"].map((x) => <SelectItem key={x} value={x} className="min-h-11">{x}</SelectItem>)}</SelectContent>
          </Select></Field>
      ),
      loading: <Loading text="Đang tải danh sách lớp…" />,
      error: <Field data-invalid="true"><FieldLabel htmlFor="s2">Lớp</FieldLabel><Select><SelectTrigger id="s2" aria-invalid><SelectValue placeholder="Chọn lớp" /></SelectTrigger><SelectContent><SelectItem value="x">Lớp 9</SelectItem></SelectContent></Select><FieldError>Chọn lớp để tìm đúng gia sư.</FieldError></Field>,
      locked: <Field data-disabled="true"><FieldLabel htmlFor="s3">Lớp</FieldLabel><Select disabled defaultValue="9"><SelectTrigger id="s3"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="9">Lớp 9</SelectItem></SelectContent></Select></Field>,
    }} />
  )
}

const quan = ["Quận 1", "Quận 3", "Quận 5", "Quận 7", "Quận 10", "Bình Thạnh", "Gò Vấp", "Phú Nhuận", "Tân Bình", "Thủ Đức"]
export const typeahead = () => {
  const [v, setV] = React.useState("")
  return (
    <States views={{
      ok: <Field><FieldLabel htmlFor="ty">Khu vực dạy</FieldLabel><Typeahead options={quan} value={v} onChange={setV} placeholder="Chọn quận" searchLabel="Gõ tên quận, ví dụ: binh thanh" /></Field>,
      loading: <Loading text="Đang tải khu vực…" />,
      empty: <Field><FieldLabel>Khu vực dạy</FieldLabel><Typeahead options={[]} value="" onChange={() => {}} placeholder="Chọn quận" searchLabel="Gõ tên quận" emptyText="Chưa có khu vực nào. Thêm khu vực trong hồ sơ." /></Field>,
    }} />
  )
}

export const multiSelector = () => (
  <Field>
    <FieldLabel id="ms">Môn muốn học</FieldLabel>
    <ToggleGroup type="multiple" aria-labelledby="ms" variant="outline" spacing={2} className="flex-wrap" defaultValue={["toan"]}>
      {[["toan", "Toán"], ["ly", "Vật lý"], ["hoa", "Hoá học"], ["van", "Ngữ văn"], ["anh", "Tiếng Anh"], ["tin", "Tin học"]].map(([k, l]) => (
        <ToggleGroupItem key={k} value={k} className="min-h-11 rounded-full px-4 data-[state=on]:border-(--positive) data-[state=on]:bg-(--positive-soft) data-[state=on]:text-(--positive)">{l}</ToggleGroupItem>
      ))}
    </ToggleGroup>
  </Field>
)

export const checkbox = () => (
  <div className="grid gap-1">
    <CheckRow label="Tôi đồng ý với điều khoản sử dụng" />
    <CheckRow label="Nhận nhắc lịch học qua Zalo" description="Nhắc trước giờ học 30 phút." defaultChecked />
    <CheckRow label="Gói học thử đã hết" disabled />
    <CheckRow label="Chưa chọn buổi nào" aria-invalid />
  </div>
)

export const checkboxList = () => {
  const items = ["Thứ 2", "Thứ 4", "Thứ 6", "Chủ nhật"]
  const [on, setOn] = React.useState<string[]>(["Thứ 4"])
  const all = on.length === items.length ? true : on.length ? "indeterminate" as const : false
  return (
    <fieldset className="m-0 grid gap-0 border-0 p-0">
      <legend className="mb-1 text-[12.5px] font-medium">Ngày rảnh trong tuần</legend>
      <CheckRow label="Chọn tất cả" checked={all} onCheckedChange={(c) => setOn(c === true ? items : [])} />
      <div className="ml-6 grid">
        {items.map((d) => <CheckRow key={d} label={d} checked={on.includes(d)} onCheckedChange={(c) => setOn(c ? [...on, d] : on.filter((x) => x !== d))} />)}
      </div>
    </fieldset>
  )
}

export const radioList = () => (
  <fieldset className="m-0 border-0 p-0">
    <legend className="mb-1 text-[12.5px] font-medium">Hình thức học</legend>
    <RadioGroup defaultValue="tai-nha">
      <RadioRow value="tai-nha" label="Tại nhà học sinh" description="Gia sư đến địa chỉ bạn nhập." />
      <RadioRow value="online" label="Học online" description="Qua Google Meet, có ghi hình buổi học." />
      <RadioRow value="trung-tam" label="Tại trung tâm" description="Hiện chưa có trung tâm trong khu vực của bạn." disabled />
    </RadioGroup>
  </fieldset>
)

export const switchDemo = () => (
  <div className="grid divide-y">
    <SwitchRow label="Nhắc lịch học" description="Gửi thông báo trước giờ học." defaultChecked />
    <SwitchRow label="Cho phép gia sư nhắn tin" />
    <SwitchRow label="Hiện hồ sơ công khai" description="Chỉ mở được sau khi xác minh giấy tờ." disabled />
  </div>
)

export const slider = () => {
  const [r, setR] = React.useState([150000, 400000])
  return (
    <div className="grid gap-1">
      <p className="text-[12.5px] font-medium" id="sl">Học phí mỗi buổi</p>
      <Slider aria-labelledby="sl" min={50000} max={1000000} step={10000} value={r} onValueChange={setR} />
      <p className="text-sm tabular-nums">{money(r[0])} đến {money(r[1])}</p>
    </div>
  )
}

export const numberInput = () => {
  const [n, setN] = React.useState(8)
  return (
    <Field><FieldLabel>Số buổi mỗi tháng</FieldLabel><NumberInput label="số buổi" value={n} onChange={setN} min={1} max={30} /></Field>
  )
}

export const dateInput = () => (
  <FieldGroup>
    <Field><FieldLabel htmlFor="d1">Ngày học thử</FieldLabel><Input id="d1" type="date" defaultValue="2026-12-02" /></Field>
    <Field><FieldLabel htmlFor="d2">Giờ bắt đầu</FieldLabel><Input id="d2" type="time" step={900} defaultValue="19:00" /></Field>
  </FieldGroup>
)

export const fileInput = () => {
  const [f, setF] = React.useState<File | null>(null)
  return (
    <States views={{
      ok: <Field><FieldLabel>Ảnh thẻ sinh viên</FieldLabel><FileInput accept="image/*,.pdf" maxMB={5} label="Chọn ảnh hoặc PDF" file={f} onFile={setF} /></Field>,
      loading: <Loading text="Đang tải tệp lên…" />,
      locked: <Field data-disabled="true"><FieldLabel>Ảnh thẻ sinh viên</FieldLabel><Button variant="outline" disabled>Đã được duyệt, không đổi được</Button></Field>,
    }} />
  )
}

export const tokenizer = () => {
  const [v, setV] = React.useState(["Toán", "Vật lý"])
  return <Field><FieldLabel htmlFor="tk">Môn dạy</FieldLabel><Tokenizer label="Thêm môn" value={v} onChange={setV} max={6} /></Field>
}
