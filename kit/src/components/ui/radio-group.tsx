import * as React from "react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"
import { cn } from "cn"

function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root data-slot="radio-group" className={cn("grid gap-1", className)} {...props} />
}

function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "grid size-5 shrink-0 place-content-center rounded-full border border-input bg-card outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="size-2.5 rounded-full bg-primary" />
    </RadioGroupPrimitive.Item>
  )
}

/** Một dòng lựa chọn, cả dòng bấm được, cao tối thiểu 44px. */
function RadioRow({ value, label, description, disabled }: { value: string; label: React.ReactNode; description?: React.ReactNode; disabled?: boolean }) {
  const id = React.useId()
  return (
    <label htmlFor={id} className="flex min-h-11 cursor-pointer items-start gap-3 rounded-lg px-1 py-2.5 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60">
      <RadioGroupItem id={id} value={value} disabled={disabled} className="mt-0.5" />
      <span className="grid gap-0.5 text-sm leading-snug">
        <span className="font-medium">{label}</span>
        {description ? <span className="text-[12.5px] text-muted-foreground">{description}</span> : null}
      </span>
    </label>
  )
}

export { RadioGroup, RadioGroupItem, RadioRow }
