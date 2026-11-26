import * as React from "react"
import { Tooltip as Primitive } from "radix-ui"
import { InfoIcon } from "lucide-react"
import { cn } from "cn"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

function TooltipProvider(props: React.ComponentProps<typeof Primitive.Provider>) {
  return <Primitive.Provider delayDuration={200} {...props} />
}

/** Chỉ cho chuột và bàn phím. Màn cảm ứng không có hover, dùng InfoTip. */
function Tooltip(props: React.ComponentProps<typeof Primitive.Root>) {
  return <Primitive.Root {...props} />
}
const TooltipTrigger = Primitive.Trigger

function TooltipContent({ className, sideOffset = 6, ...props }: React.ComponentProps<typeof Primitive.Content>) {
  return (
    <Primitive.Portal>
      <Primitive.Content
        sideOffset={sideOffset}
        collisionPadding={12}
        className={cn("z-50 max-w-64 rounded-md bg-foreground px-3 py-1.5 text-xs text-background", className)}
        {...props}
      />
    </Primitive.Portal>
  )
}

/** Gợi ý ngắn bấm để mở: chạy được cả trên điện thoại. */
function InfoTip({ label = "Xem giải thích", children }: { label?: string; children: React.ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" aria-label={label} className="inline-grid size-11 place-content-center rounded-full text-muted-foreground outline-none hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50">
          <InfoIcon className="size-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 text-sm">{children}</PopoverContent>
    </Popover>
  )
}

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, InfoTip }
