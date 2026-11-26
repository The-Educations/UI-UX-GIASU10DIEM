import { Loader2Icon } from "lucide-react"
import { cn } from "cn"

/** Quay chậm lại khi người dùng chọn giảm chuyển động (xem styles.css). Luôn kèm chữ cho trình đọc màn hình. */
function Spinner({ className, label = "Đang tải" }: { className?: string; label?: string }) {
  return (
    <span role="status" className="inline-flex items-center">
      <Loader2Icon aria-hidden className={cn("size-4 animate-spin", className)} />
      <span className="sr-only">{label}</span>
    </span>
  )
}

export { Spinner }
