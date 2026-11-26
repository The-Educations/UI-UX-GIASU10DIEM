import * as React from "react"
import { BookOpenIcon, CalendarIcon, WalletIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { OtpInput } from "@/components/ui/otp-input"
import { Timeline } from "@/components/ui/timeline"
import { DayStrip } from "@/components/ui/day-strip"
import { TimeSlotPicker } from "@/components/ui/time-slot-picker"
import { ResultState } from "@/components/ui/result-state"
import { StatTile } from "@/components/ui/stat-tile"
import { Skeleton } from "@/components/ui/skeleton"
import { money } from "@/components/ui/timestamp"
import { DateField } from "@/components/ui/date-field"
import { TimeRange } from "@/components/ui/time-select"
import { WeeklySchedulePicker, summarizeDay } from "@/components/ui/weekly-schedule"
import { States, EmptyBox, Locked, ErrorBox } from "./helpers"

export const otpInput = () => {
  const [v, setV] = React.useState("")
  const [bad, setBad] = React.useState(false)
  return (
    <States views={{
      ok: (
        <Field data-invalid={bad}>
          <FieldLabel>Mã xác minh gửi về email</FieldLabel>
          <OtpInput label="Mã xác minh 6 chữ số" value={v} onChange={(x) => { setV(x); setBad(false) }} invalid={bad} onComplete={(x) => setBad(x !== "123456")} />
          {bad ? <FieldError>Mã không đúng. Kiểm tra lại email hoặc gửi mã mới. (Thử 123456 để đúng)</FieldError> : null}
        </Field>
      ),
      loading: <Field><FieldLabel>Đang gửi mã…</FieldLabel><OtpInput label="Mã xác minh" value="" onChange={() => {}} disabled /></Field>,
      locked: <Locked why="Bạn đã nhập sai 5 lần. Thử lại sau 10 phút." />,
    }} />
  )
}

export const timeline = () => (
  <States views={{
    ok: <Timeline label="Tiến trình đặt học thử" items={[
      { title: "Đã gửi yêu cầu", time: "26/11, 19:02", state: "done" },
      { title: "Gia sư xác nhận", time: "26/11, 19:40", state: "done", note: "Cô Tuyết nhận lớp Toán 9." },
      { title: "Buổi học thử", time: "Thứ 4, 02/12, 19:00", state: "current" },
      { title: "Chọn học tiếp", state: "todo" },
    ]} />,
    error: <Timeline label="Tiến trình thanh toán" items={[
      { title: "Tạo lệnh nạp ví", time: "26/11, 19:05", state: "done" },
      { title: "Ngân hàng từ chối", time: "26/11, 19:06", state: "error", note: "Số dư thẻ không đủ. Thử thẻ khác." },
      { title: "Cộng tiền vào ví", state: "todo" },
    ]} />,
    empty: <EmptyBox title="Chưa có hoạt động" hint="Mọi bước của buổi học sẽ hiện ở đây." />,
    loading: <div className="grid gap-4">{[0, 1, 2].map((i) => <div key={i} className="flex gap-3"><Skeleton className="size-7 rounded-full" /><Skeleton className="h-4 w-1/2" /></div>)}</div>,
  }} />
)

const days = Array.from({ length: 10 }, (_, i) => new Date(2026, 10, 27 + i))
export const dayStrip = () => {
  const [d, setD] = React.useState<Date | null>(days[1])
  return (
    <States views={{
      ok: <DayStrip label="Chọn ngày học" days={days} value={d} onChange={setD} isFull={(x) => x.getDay() === 0 || x.getDate() === 30} />,
      loading: <div className="flex gap-2">{[0, 1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-16 w-14 shrink-0 rounded-xl" />)}</div>,
      empty: <EmptyBox title="Gia sư chưa mở lịch" hint="Nhắn tin để hỏi lịch rảnh, hoặc xem gia sư khác." action={<Button variant="outline">Xem gia sư khác</Button>} />,
      error: <ErrorBox what="lịch rảnh" />,
    }} />
  )
}

const slots = ["17:00", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"].map((t, i) => ({ time: t, taken: i === 2 || i === 5 }))
export const timeSlots = () => {
  const [t, setT] = React.useState<string | null>("19:00")
  return (
    <States views={{
      ok: <TimeSlotPicker label="Chọn giờ, Thứ 4 02/12" slots={slots} value={t} onChange={setT} />,
      loading: <div className="grid grid-cols-3 gap-2">{[0, 1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-11 rounded-lg" />)}</div>,
      empty: <EmptyBox title="Hôm nay đã kín lịch" hint="Chọn ngày khác trong dải ngày phía trên." />,
      locked: <Locked why="Cần xác minh số điện thoại trước khi đặt lịch." />,
    }} />
  )
}

export const resultState = () => (
  <States views={{
    ok: <ResultState kind="404" action={<Button>Về trang chủ</Button>} />,
    error: <ResultState kind="500" action={<Button variant="outline">Tải lại</Button>} />,
    locked: <ResultState kind="403" action={<Button>Đăng nhập</Button>} />,
    empty: <ResultState kind="maintenance" />,
  }} label="Loại trang lỗi" />
)

export const statTile = () => (
  <States views={{
    ok: (
      <div className="@container grid gap-3 @md:grid-cols-3" style={{ containerType: "inline-size" }}>
        <StatTile label="Số dư ví" value={money(1250000)} hint="Đủ cho khoảng 6 buổi" icon={<WalletIcon />} />
        <StatTile label="Buổi tuần này" value="3" hint="Buổi kế tiếp: Thứ 4, 19:00" icon={<CalendarIcon />} />
        <StatTile label="Bài đã nộp" value="12/15" hint="Còn 3 bài chưa nộp" icon={<BookOpenIcon />} />
      </div>
    ),
    loading: <div className="grid gap-3 sm:grid-cols-3"><StatTile loading label="Số dư ví" value="" /><StatTile loading label="Buổi tuần này" value="" /><StatTile loading label="Bài đã nộp" value="" /></div>,
    error: <ErrorBox what="số liệu" />,
  }} />
)

export const dateInput = () => {
  const [d, setD] = React.useState("2026-11-20")
  const [r, setR] = React.useState(["19:00", "18:00"])
  return (
    <States views={{
      ok: (
        <div className="grid gap-5">
          <Field><FieldLabel htmlFor="df">Ngày học thử</FieldLabel><DateField id="df" label="Ngày học thử" value={d} onChange={setD} min="2026-11-27" max="2026-12-31" /></Field>
          <TimeRange label="Giờ học" start={r[0]} end={r[1]} onChange={(a, b) => setR([a, b])} from="06:00" to="22:00" step={30} />
        </div>
      ),
      loading: <div className="grid gap-3"><Skeleton className="h-11 w-full" /><Skeleton className="h-11 w-full" /></div>,
      locked: <Locked why="Ngày học đã chốt, không đổi được khi còn dưới 4 giờ." />,
    }} />
  )
}

export const weeklySchedule = () => {
  const [v, setV] = React.useState<Set<number>>(() => new Set([18, 19, 20].map((h) => h * 7 + 2).concat([19, 20].map((h) => h * 7 + 5))))
  return (
    <States views={{
      ok: <div className="grid gap-4"><WeeklySchedulePicker label="Lịch rảnh trong tuần" value={v} onChange={setV} /><p className="m-0 text-[12.5px] text-muted-foreground">Thứ 4: {summarizeDay(v, 2) || "chưa chọn"}</p></div>,
      loading: <div className="grid gap-3"><Skeleton className="h-14 w-full" /><Skeleton className="h-40 w-full" /></div>,
      locked: <WeeklySchedulePicker label="Lịch rảnh trong tuần" value={v} onChange={setV} disabled />,
      error: <ErrorBox what="lịch rảnh" />,
    }} />
  )
}
