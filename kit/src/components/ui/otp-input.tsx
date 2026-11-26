import * as React from "react"
import { cn } from "cn"

/** Mã xác minh gồm n chữ số (email, số điện thoại). Dán cả mã vào được, bàn phím số, Backspace lùi ô, SMS tự điền nhờ one-time-code. */
function OtpInput({ length = 6, value, onChange, onComplete, invalid, disabled, label, className }: { length?: number; value: string; onChange: (v: string) => void; onComplete?: (v: string) => void; invalid?: boolean; disabled?: boolean; label: string; className?: string }) {
  const refs = React.useRef<(HTMLInputElement | null)[]>([])
  const set = (next: string) => {
    const v = next.replace(/\D/g, "").slice(0, length)
    onChange(v)
    if (v.length === length) onComplete?.(v)
    return v
  }
  return (
    <div role="group" aria-label={label} className={cn("flex w-full max-w-xs gap-2", className)}>
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el }}
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          disabled={disabled}
          aria-label={`Chữ số ${i + 1}`}
          aria-invalid={invalid || undefined}
          value={value[i] ?? ""}
          onFocus={(e) => e.target.select()}
          onChange={(e) => {
            const d = e.target.value.replace(/\D/g, "").slice(-1)
            const v = set(value.slice(0, i) + d + value.slice(i + 1))
            if (d) refs.current[Math.min(i + 1, length - 1, v.length)]?.focus()
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !value[i] && i > 0) { e.preventDefault(); set(value.slice(0, i - 1)); refs.current[i - 1]?.focus() }
            if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus()
            if (e.key === "ArrowRight" && i < length - 1) refs.current[i + 1]?.focus()
          }}
          onPaste={(e) => { e.preventDefault(); const v = set(e.clipboardData.getData("text")); refs.current[Math.min(v.length, length - 1)]?.focus() }}
          className="h-12 min-h-11 w-0 min-w-0 flex-1 rounded-md border border-input bg-card text-center text-lg font-medium tabular-nums outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50"
        />
      ))}
    </div>
  )
}

export { OtpInput }
