import * as React from "react"
import { MinusIcon, PlusIcon } from "lucide-react"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

/** Số buổi, số học viên: nút − và + 44px, gõ trực tiếp được, bàn phím số trên điện thoại. */
function NumberInput({ value, onChange, min = 0, max = 99, step = 1, label, className }: { value: number; onChange: (n: number) => void; min?: number; max?: number; step?: number; label: string; className?: string }) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n))
  return (
    <div role="group" aria-label={label} className={cn("flex w-full max-w-48 items-center gap-2", className)}>
      <Button type="button" variant="outline" size="icon" aria-label={`Giảm ${label}`} disabled={value <= min} onClick={() => onChange(clamp(value - step))}>
        <MinusIcon />
      </Button>
      <Input
        inputMode="numeric"
        aria-label={label}
        className="min-w-0 text-center tabular-nums"
        value={value}
        onChange={(e) => {
          const n = parseInt(e.target.value.replace(/\D/g, ""), 10)
          onChange(Number.isNaN(n) ? min : clamp(n))
        }}
      />
      <Button type="button" variant="outline" size="icon" aria-label={`Tăng ${label}`} disabled={value >= max} onClick={() => onChange(clamp(value + step))}>
        <PlusIcon />
      </Button>
    </div>
  )
}

export { NumberInput }
