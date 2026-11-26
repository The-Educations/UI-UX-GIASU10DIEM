import * as React from "react"
import { Slider as SliderPrimitive } from "radix-ui"
import { cn } from "cn"

/** Thanh trượt: đường 6px, núm 24px trong vùng chạm cao 44px. */
function Slider({ className, defaultValue, value, ...props }: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const thumbs = (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [0]).length
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      className={cn("relative flex h-11 w-full touch-none items-center select-none data-[disabled]:opacity-50", className)}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-muted">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbs }, (_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          className="block size-6 rounded-full border-2 border-primary bg-card outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
