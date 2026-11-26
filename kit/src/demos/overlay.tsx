import * as React from "react"
import { toast } from "sonner"
import { SearchIcon, CalendarIcon, UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from "@/components/ui/command"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Toaster } from "@/components/ui/sonner"

export const dialog = () => (
  <Dialog>
    <DialogTrigger asChild><Button variant="outline">Đổi lịch học</Button></DialogTrigger>
    <DialogContent>
      <DialogHeader><DialogTitle>Đổi lịch buổi 3</DialogTitle><DialogDescription>Gia sư sẽ nhận thông báo ngay.</DialogDescription></DialogHeader>
      <Field><FieldLabel htmlFor="dlg">Ngày mới</FieldLabel><Input id="dlg" type="date" defaultValue="2026-12-05" /></Field>
      <DialogFooter><Button variant="outline">Để sau</Button><Button>Lưu lịch mới</Button></DialogFooter>
    </DialogContent>
  </Dialog>
)

export const alertDialog = () => (
  <AlertDialog>
    <AlertDialogTrigger asChild><Button variant="destructive">Huỷ lớp</Button></AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader><AlertDialogTitle>Huỷ lớp Toán 9?</AlertDialogTitle><AlertDialogDescription>Các buổi chưa học sẽ bị huỷ và hoàn tiền về ví. Không hoàn tác được.</AlertDialogDescription></AlertDialogHeader>
      <AlertDialogFooter><AlertDialogCancel>Giữ lớp</AlertDialogCancel><AlertDialogAction>Huỷ lớp</AlertDialogAction></AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
)

export const sheet = () => (
  <div className="flex flex-wrap gap-2">
    <Sheet>
      <SheetTrigger asChild><Button variant="outline">Bộ lọc (bottom sheet)</Button></SheetTrigger>
      <SheetContent side="bottom" className="max-h-[85dvh] overflow-y-auto">
        <SheetHeader><SheetTitle>Lọc gia sư</SheetTitle><SheetDescription>Chọn môn và khu vực.</SheetDescription></SheetHeader>
        <div className="grid gap-4 px-4"><Field><FieldLabel htmlFor="sh1">Môn</FieldLabel><Input id="sh1" defaultValue="Toán" /></Field></div>
        <SheetFooter><Button>Xem 24 gia sư</Button></SheetFooter>
      </SheetContent>
    </Sheet>
    <Sheet>
      <SheetTrigger asChild><Button variant="outline">Chi tiết (bên phải)</Button></SheetTrigger>
      <SheetContent side="right"><SheetHeader><SheetTitle>Chi tiết giao dịch</SheetTitle><SheetDescription>Nạp ví, 26/11/2026</SheetDescription></SheetHeader></SheetContent>
    </Sheet>
  </div>
)

export const popover = () => (
  <Popover>
    <PopoverTrigger asChild><Button variant="outline"><CalendarIcon />Khung giờ</Button></PopoverTrigger>
    <PopoverContent className="grid gap-2 text-sm"><p className="font-medium">Thứ 4, 19:00 – 20:30</p><p className="text-muted-foreground">Còn 2 chỗ trống trong lớp.</p><Button size="sm">Chọn khung này</Button></PopoverContent>
  </Popover>
)

export const commandPalette = () => (
  <div className="max-w-md overflow-hidden rounded-xl border">
    <Command>
      <CommandInput placeholder="Tìm gia sư, lớp học, trang…" />
      <CommandList>
        <CommandEmpty>Không thấy kết quả. Thử gõ tên môn.</CommandEmpty>
        <CommandGroup heading="Gia sư"><CommandItem className="min-h-11"><UserIcon />Ánh Tuyết</CommandItem><CommandItem className="min-h-11"><UserIcon />Đặng Văn Hiếu</CommandItem></CommandGroup>
        <CommandGroup heading="Trang"><CommandItem className="min-h-11"><CalendarIcon />Lịch học<CommandShortcut>L</CommandShortcut></CommandItem><CommandItem className="min-h-11"><SearchIcon />Tìm gia sư</CommandItem></CommandGroup>
      </CommandList>
    </Command>
  </div>
)

export const toastDemo = () => (
  <>
    <Toaster position="top-center" />
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast.success("Đã lưu thay đổi")}>Thành công</Button>
      <Button variant="outline" onClick={() => toast.error("Không gửi được tin nhắn", { description: "Kiểm tra mạng rồi thử lại.", action: { label: "Thử lại", onClick: () => {} } })}>Lỗi</Button>
      <Button variant="outline" onClick={() => toast("Đã huỷ buổi 3", { action: { label: "Hoàn tác", onClick: () => {} } })}>Có hoàn tác</Button>
    </div>
  </>
)
