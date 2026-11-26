import * as React from "react"
import { cn } from "cn"

/** Ô nhập có phần gắn liền: "+84" đứng trước, "đ" đứng sau. Viền và vòng focus thuộc về cả nhóm. */
function InputGroup({ prefix, suffix, className, ...props }: Omit<React.ComponentProps<"input">, "prefix"> & { prefix?: React.ReactNode; suffix?: React.ReactNode }) {
  return (
    <div data-slot="input-group" className={cn("flex min-h-11 w-full items-stretch overflow-hidden rounded-md border border-input bg-card focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 has-[[aria-invalid=true]]:border-destructive has-[:disabled]:opacity-60", className)}>
      {prefix ? <span className="flex items-center border-r bg-muted px-3 text-sm text-muted-foreground">{prefix}</span> : null}
      <input className="min-h-11 min-w-0 flex-1 bg-transparent px-3 text-[15px] outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed" {...props} />
      {suffix ? <span className="flex items-center border-l bg-muted px-3 text-sm text-muted-foreground">{suffix}</span> : null}
    </div>
  )
}

export { InputGroup }
