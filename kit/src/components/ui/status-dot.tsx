import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const dot = cva("inline-block size-2 shrink-0 rounded-full", {
  variants: {
    tone: { positive: "bg-(--positive)", warning: "bg-(--warning)", error: "bg-destructive", neutral: "bg-muted-foreground" },
  },
  defaultVariants: { tone: "neutral" },
})

/** Chấm trạng thái luôn đi với chữ: "Đang dạy", "Chờ duyệt". */
function StatusDot({ tone, children, className }: VariantProps<typeof dot> & { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-sm", className)}>
      <span aria-hidden className={dot({ tone })} />
      {children}
    </span>
  )
}

export { StatusDot }
