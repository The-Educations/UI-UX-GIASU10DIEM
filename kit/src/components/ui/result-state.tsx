import * as React from "react"
import { LockIcon, SearchXIcon, ServerCrashIcon, WrenchIcon } from "lucide-react"
import { cn } from "cn"

const kinds = {
  "404": { icon: SearchXIcon, title: "Không tìm thấy trang", text: "Liên kết có thể đã đổi hoặc bị xoá. Quay lại trang chủ để tìm tiếp." },
  "403": { icon: LockIcon, title: "Bạn chưa có quyền xem trang này", text: "Đăng nhập bằng tài khoản phù hợp, hoặc liên hệ hỗ trợ nếu bạn nghĩ đây là nhầm lẫn." },
  "500": { icon: ServerCrashIcon, title: "Có lỗi ở phía chúng tôi", text: "Đây không phải lỗi của bạn. Thử tải lại sau ít phút." },
  maintenance: { icon: WrenchIcon, title: "Đang bảo trì", text: "Chúng tôi sẽ quay lại sớm. Lịch học đã đặt vẫn giữ nguyên." },
} as const

/** Trang lỗi toàn màn hình: nói chuyện gì xảy ra, ai phải làm gì tiếp, và một nút duy nhất để đi tiếp. */
function ResultState({ kind, action, className }: { kind: keyof typeof kinds; action?: React.ReactNode; className?: string }) {
  const k = kinds[kind]
  return (
    <div role={kind === "500" ? "alert" : undefined} className={cn("mx-auto grid max-w-md justify-items-center gap-4 px-4 py-12 text-center", className)}>
      <span className="grid size-12 place-content-center rounded-xl bg-muted text-muted-foreground"><k.icon className="size-6" aria-hidden /></span>
      <div className="grid gap-1.5">
        <h2 className="m-0">{k.title}</h2>
        <p className="m-0 text-sm text-muted-foreground">{k.text}</p>
      </div>
      {action}
    </div>
  )
}

export { ResultState }
