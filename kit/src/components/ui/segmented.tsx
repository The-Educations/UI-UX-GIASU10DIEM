import * as React from "react"
import { RadioGroup as Primitive } from "radix-ui"
import { cn } from "cn"

/** Chuyển giữa 2 đến 4 chế độ xem. Luôn có một mục được chọn, nên dựng trên radio, không phải toggle. */
function SegmentedControl({ options, className, ...props }: React.ComponentProps<typeof Primitive.Root> & { options: { value: string; label: React.ReactNode }[] }) {
  return (
    <Primitive.Root data-slot="segmented" orientation="horizontal" className={cn("inline-flex w-full max-w-full gap-1 rounded-[10px] bg-muted p-0.5 sm:w-fit", className)} {...props}>
      {options.map((o) => (
        <Primitive.Item
          key={o.value}
          value={o.value}
          className="flex min-h-11 min-w-0 flex-1 items-center justify-center rounded-[8px] px-4 text-sm font-medium whitespace-nowrap text-muted-foreground outline-none transition-colors duration-[var(--duration-fast)] focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[state=checked]:bg-card data-[state=checked]:text-foreground"
        >
          {o.label}
        </Primitive.Item>
      ))}
    </Primitive.Root>
  )
}

export { SegmentedControl }
