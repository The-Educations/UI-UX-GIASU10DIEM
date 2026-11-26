import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"
import { CheckIcon, MinusIcon } from "lucide-react"
import { cn } from "cn"

/** Ô vuông 20px; vùng chạm 44px do hàng chứa nó (CheckRow) đảm nhận. */
function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer grid size-5 shrink-0 place-content-center rounded-[5px] border border-input bg-card outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="grid place-content-center text-current">
        {props.checked === "indeterminate" ? <MinusIcon className="size-3.5" /> : <CheckIcon className="size-3.5" />}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

/** Cả hàng là vùng chạm: nhãn + mô tả + ô chọn, cao tối thiểu 44px. */
function CheckRow({ label, description, className, ...props }: React.ComponentProps<typeof Checkbox> & { label: React.ReactNode; description?: React.ReactNode }) {
  const id = React.useId()
  return (
    <label htmlFor={id} className={cn("flex min-h-11 cursor-pointer items-start gap-3 rounded-lg px-1 py-2.5 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60", className)}>
      <Checkbox id={id} className="mt-0.5" {...props} />
      <span className="grid gap-0.5 text-sm leading-snug">
        <span className="font-medium">{label}</span>
        {description ? <span className="text-[12.5px] text-muted-foreground">{description}</span> : null}
      </span>
    </label>
  )
}

export { Checkbox, CheckRow }
