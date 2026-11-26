import * as React from "react"
import { BookOpenIcon, CalendarIcon, HomeIcon, MessageCircleIcon, UserIcon, ClockIcon, MapPinIcon } from "lucide-react"
import { AppShell, MobileNav, SideNav, TopNav, type NavItem } from "@/components/ui/app-shell"
import { FormLayout, Section } from "@/components/ui/form-layout"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, ClickableCard, SelectableCard } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Carousel } from "@/components/ui/carousel"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableCell, TableHead, TableRow, ScrollableArea } from "@/components/ui/table"
import { money } from "@/components/ui/timestamp"
import { States, ErrorBox, EmptyBox, Locked } from "./helpers"
import { Skeleton } from "@/components/ui/skeleton"

const nav: NavItem[] = [
  { id: "home", label: "Tổng quan", icon: <HomeIcon /> },
  { id: "lich", label: "Lịch học", icon: <CalendarIcon /> },
  { id: "lop", label: "Lớp học", icon: <BookOpenIcon /> },
  { id: "tin", label: "Tin nhắn", icon: <MessageCircleIcon />, badge: 2 },
  { id: "ho-so", label: "Hồ sơ", icon: <UserIcon /> },
]

export const appShell = () => {
  const [a, setA] = React.useState("lich")
  return (
    <div className="min-h-[460px] overflow-hidden rounded-xl border" style={{ minHeight: 460 }}>
      <AppShell
        className="min-h-[460px]"
        side={<SideNav items={nav} active={a} onSelect={setA} brand="Gia Sư 10 Điểm" />}
        top={<TopNav title={nav.find((n) => n.id === a)?.label} actions={<Button size="sm" variant="outline">Đặt lịch</Button>} />}
        bottom={<MobileNav items={nav} active={a} onSelect={setA} />}
      >
        <p className="text-sm text-muted-foreground">Từ 1024px: thanh bên 248px. Dưới 1024px: thanh dưới. Nội dung rộng tối đa 1160px.</p>
      </AppShell>
    </div>
  )
}

export const formLayout = () => (
  <FormLayout>
    <Field><FieldLabel htmlFor="fl1">Họ</FieldLabel><Input id="fl1" defaultValue="Nguyễn" /></Field>
    <Field><FieldLabel htmlFor="fl2">Tên</FieldLabel><Input id="fl2" defaultValue="Ánh Tuyết" /></Field>
    <Field className="@md:col-span-2"><FieldLabel htmlFor="fl3">Địa chỉ dạy</FieldLabel><Input id="fl3" autoComplete="street-address" defaultValue="12 Nguyễn Huệ, Quận 1, TP.HCM" /></Field>
    <Field className="@md:col-span-2"><FieldLabel htmlFor="fl4">Giới thiệu</FieldLabel><Textarea id="fl4" /></Field>
    <div className="flex flex-col-reverse gap-2 @md:col-span-2 @md:flex-row @md:justify-end"><Button variant="outline">Huỷ</Button><Button>Lưu hồ sơ</Button></div>
  </FormLayout>
)

export const section = () => (
  <div className="grid gap-8">
    <Section title="Buổi học sắp tới" description="Trong 7 ngày tới" actions={<Button variant="ghost" size="sm">Xem lịch</Button>}>
      <Card><CardContent className="text-sm">Toán 9 · Thứ 4, 19:00 · Cô Ánh Tuyết</CardContent></Card>
    </Section>
    <Section title="Thanh toán gần đây"><Card><CardContent className="text-sm text-muted-foreground">Chưa có giao dịch.</CardContent></Card></Section>
  </div>
)

export const scrollableArea = () => (
  <ScrollableArea label="Bảng học phí, cuộn ngang được">
    <Table>
      <thead><tr><TableHead>Môn</TableHead><TableHead>Lớp</TableHead><TableHead>Số buổi</TableHead><TableHead>Mỗi buổi</TableHead><TableHead>Tổng</TableHead></tr></thead>
      <tbody>
        {[["Toán", "9", 8, 200000], ["Vật lý", "10", 6, 220000], ["Tiếng Anh", "7", 12, 180000]].map(([m, l, b, g]) => (
          <TableRow key={String(m)}><TableCell>{m}</TableCell><TableCell>{l}</TableCell><TableCell>{b}</TableCell><TableCell>{money(Number(g))}</TableCell><TableCell className="font-medium">{money(Number(b) * Number(g))}</TableCell></TableRow>
        ))}
      </tbody>
    </Table>
  </ScrollableArea>
)

const tutors = [
  { n: "Ánh Tuyết", m: "Toán 9, Toán 12", p: 200000, q: "Quận 1" },
  { n: "Đặng Văn Hiếu", m: "Vật lý 10-12", p: 250000, q: "Bình Thạnh" },
  { n: "Lê Thị Ngọc Hân", m: "Tiếng Anh giao tiếp", p: 180000, q: "Thủ Đức" },
]

function TutorCard({ t, wide }: { t: (typeof tutors)[number]; wide?: boolean }) {
  return (
    <ClickableCard href="#" onClick={(e) => e.preventDefault()} className={wide ? "w-72" : ""}>
      <div className="flex items-start gap-3 p-4">
        <Avatar className="size-11"><AvatarFallback className="bg-(--pastel-rose) font-serif text-(--pastel-rose-ink)">{t.n.split(" ").pop()![0]}</AvatarFallback></Avatar>
        <div className="grid min-w-0 gap-0.5">
          <h3 className="truncate font-serif">{t.n}</h3>
          <p className="truncate text-[13px] text-muted-foreground">{t.m}</p>
          <p className="mt-1 flex items-center gap-1 text-[12.5px] text-muted-foreground"><MapPinIcon className="size-3.5" />{t.q}</p>
        </div>
        <span className="ml-auto shrink-0 text-sm font-medium tabular-nums">{money(t.p)}</span>
      </div>
    </ClickableCard>
  )
}

export const card = () => (
  <States views={{
    ok: (
      <div className="grid gap-4">
        <Card>
          <CardHeader><CardTitle>Toán 9 · Luyện thi vào 10</CardTitle><CardDescription>8 buổi · Thứ 4 và Thứ 7</CardDescription></CardHeader>
          <CardContent className="flex flex-wrap items-center gap-2 text-sm"><Badge variant="secondary"><ClockIcon />19:00 – 20:30</Badge><Badge variant="outline">Tại nhà</Badge></CardContent>
          <CardFooter className="justify-between"><span className="text-sm font-medium">{money(200000)} / buổi</span><Button size="sm">Đặt học thử</Button></CardFooter>
        </Card>
        <div className="grid gap-3 @container">{tutors.slice(0, 2).map((t) => <TutorCard key={t.n} t={t} />)}</div>
      </div>
    ),
    loading: <Card><CardContent className="grid gap-3"><Skeleton className="h-5 w-2/3" /><Skeleton className="h-4 w-1/2" /><Skeleton className="h-11 w-full" /></CardContent></Card>,
    error: <ErrorBox what="thông tin lớp" />,
    locked: <Locked why="Lớp này đã đủ học viên. Bạn có thể vào danh sách chờ." />,
  }} />
)

export const selectableCard = () => {
  const [v, setV] = React.useState("8")
  const plans = [["4", "4 buổi", 760000, "Học thử nhẹ nhàng"], ["8", "8 buổi", 1440000, "Phổ biến nhất"], ["12", "12 buổi", 2040000, "Hết dịp ôn thi"]] as const
  return (
    <fieldset className="m-0 grid gap-3 border-0 p-0 @container">
      <legend className="mb-2 text-[12.5px] font-medium">Chọn gói học</legend>
      <div className="grid gap-3 @md:grid-cols-3">
        {plans.map(([k, l, p, d]) => (
          <SelectableCard key={k} name="goi" value={k} checked={v === k} onChange={() => setV(k)} disabled={k === "12"}>
            <span className="grid gap-1"><span className="font-medium">{l}</span><span className="text-[13px] text-muted-foreground">{d}</span><span className="mt-1 font-medium tabular-nums">{money(p)}</span></span>
          </SelectableCard>
        ))}
      </div>
    </fieldset>
  )
}

export const collapsible = () => (
  <Accordion type="single" collapsible defaultValue="a">
    {[["a", "Học thử có mất phí không?", "Buổi đầu tiên miễn phí. Bạn chỉ trả tiền khi đồng ý học tiếp."], ["b", "Đổi gia sư thế nào?", "Vào Lớp của tôi, chọn Đổi gia sư. Chúng tôi gợi ý ba người phù hợp."], ["c", "Huỷ buổi học trước bao lâu?", "Huỷ trước 4 giờ thì không mất phí."]].map(([k, q, a]) => (
      <AccordionItem key={k} value={k}><AccordionTrigger>{q}</AccordionTrigger><AccordionContent>{a}</AccordionContent></AccordionItem>
    ))}
  </Accordion>
)

export const carousel = () => (
  <States views={{
    ok: <Carousel label="Gia sư nổi bật">{tutors.map((t) => <TutorCard key={t.n} t={t} wide />)}</Carousel>,
    loading: <Carousel label="Đang tải gia sư">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-24 w-72 rounded-xl" />)}</Carousel>,
    empty: <EmptyBox title="Chưa có gia sư phù hợp" hint="Thử bỏ bớt bộ lọc khu vực hoặc môn học." action={<Button variant="outline">Xoá bộ lọc</Button>} />,
  }} />
)
