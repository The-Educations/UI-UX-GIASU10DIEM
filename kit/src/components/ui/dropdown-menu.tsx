import * as React from "react"
import { DropdownMenu as Primitive } from "radix-ui"
import { cn } from "cn"

const DropdownMenu = Primitive.Root
const DropdownMenuTrigger = Primitive.Trigger

function DropdownMenuContent({ className, sideOffset = 6, ...props }: React.ComponentProps<typeof Primitive.Content>) {
  return (
    <Primitive.Portal>
      <Primitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        collisionPadding={12}
        className={cn(
          "z-50 min-w-48 max-w-[calc(100vw-24px)] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-lg border bg-popover p-1 text-popover-foreground outline-none",
          className
        )}
        {...props}
      />
    </Primitive.Portal>
  )
}

function DropdownMenuItem({ className, destructive, ...props }: React.ComponentProps<typeof Primitive.Item> & { destructive?: boolean }) {
  return (
    <Primitive.Item
      data-slot="dropdown-menu-item"
      className={cn(
        "relative flex min-h-11 cursor-pointer items-center gap-2 rounded-md px-3 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-accent [&_svg]:size-4 [&_svg]:shrink-0",
        destructive && "text-destructive data-[highlighted]:bg-destructive/10",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuLabel({ className, ...props }: React.ComponentProps<typeof Primitive.Label>) {
  return <Primitive.Label className={cn("px-3 py-2 text-[12.5px] font-medium text-muted-foreground", className)} {...props} />
}

function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof Primitive.Separator>) {
  return <Primitive.Separator className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
}

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator }
