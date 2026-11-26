import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"
import { cn } from "cn"

/** Công tắc 44×26; thumb trượt bằng transform, tắt hiệu ứng khi giảm chuyển động. */
function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-[26px] w-11 shrink-0 items-center rounded-full border border-transparent bg-input outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="pointer-events-none block size-5 translate-x-0.5 rounded-full bg-card shadow-none transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out)] data-[state=checked]:translate-x-[20px]" />
    </SwitchPrimitive.Root>
  )
}

function SwitchRow({ label, description, ...props }: React.ComponentProps<typeof Switch> & { label: React.ReactNode; description?: React.ReactNode }) {
  const id = React.useId()
  return (
    <label htmlFor={id} className="flex min-h-11 cursor-pointer items-center justify-between gap-4 py-2 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60">
      <span className="grid gap-0.5 text-sm leading-snug">
        <span className="font-medium">{label}</span>
        {description ? <span className="text-[12.5px] text-muted-foreground">{description}</span> : null}
      </span>
      <Switch id={id} {...props} />
    </label>
  )
}

export { Switch, SwitchRow }
