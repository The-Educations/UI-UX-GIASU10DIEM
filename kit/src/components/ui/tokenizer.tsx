import * as React from "react"
import { XIcon } from "lucide-react"
import { cn } from "cn"

/** Nhập nhiều giá trị ngắn (môn dạy, khu vực). Enter hoặc dấu phẩy để thêm, Backspace để xoá chip cuối. */
function Tokenizer({ value, onChange, label, max = 8, className }: { value: string[]; onChange: (v: string[]) => void; label: string; max?: number; className?: string }) {
  const [draft, setDraft] = React.useState("")
  const ref = React.useRef<HTMLInputElement>(null)
  const add = () => {
    const t = draft.trim()
    if (t && value.length < max && !value.some((v) => v.toLowerCase() === t.toLowerCase())) onChange([...value, t])
    setDraft("")
  }
  return (
    <div onClick={() => ref.current?.focus()} className={cn("flex min-h-11 w-full flex-wrap items-center gap-2 rounded-md border border-input bg-card px-2 py-1.5 focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50", className)}>
      {value.map((v) => (
        <span key={v} className="inline-flex min-h-8 max-w-full items-center gap-1 rounded-full bg-secondary pr-1 pl-3 text-[13px] text-secondary-foreground">
          <span className="truncate">{v}</span>
          <button type="button" aria-label={`Bỏ ${v}`} onClick={() => onChange(value.filter((x) => x !== v))} className="-my-1.5 grid size-11 place-content-center rounded-full outline-none hover:bg-black/5 focus-visible:ring-[3px] focus-visible:ring-ring/50">
            <XIcon className="size-3.5" />
          </button>
        </span>
      ))}
      <input
        ref={ref}
        aria-label={label}
        value={draft}
        disabled={value.length >= max}
        placeholder={value.length >= max ? `Tối đa ${max}` : ""}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add() }
          if (e.key === "Backspace" && !draft && value.length) onChange(value.slice(0, -1))
        }}
        onBlur={add}
        className="min-h-9 min-w-24 flex-1 bg-transparent px-1 text-[15px] outline-none disabled:cursor-not-allowed"
      />
    </div>
  )
}

export { Tokenizer }
