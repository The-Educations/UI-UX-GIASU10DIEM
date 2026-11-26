import * as React from "react"
import { AlertDialog as Primitive } from "radix-ui"
import { cn } from "cn"
import { buttonVariants } from "@/components/ui/button"

const AlertDialog = Primitive.Root
const AlertDialogTrigger = Primitive.Trigger

/** Hỏi lại trước việc không hoàn tác được. Focus rơi vào nút Huỷ, không phải nút xoá. */
function AlertDialogContent({ className, ...props }: React.ComponentProps<typeof Primitive.Content>) {
  return (
    <Primitive.Portal>
      <Primitive.Overlay data-slot="dialog-overlay" className="fixed inset-0 z-50 bg-black/50" />
      <Primitive.Content
        data-slot="dialog-content"
        className={cn("fixed top-1/2 left-1/2 z-50 grid w-[calc(100%-32px)] max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl border bg-popover p-6 text-popover-foreground outline-none", className)}
        {...props}
      />
    </Primitive.Portal>
  )
}

function AlertDialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("grid gap-2", className)} {...props} />
}
function AlertDialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />
}
function AlertDialogTitle({ className, ...props }: React.ComponentProps<typeof Primitive.Title>) {
  return <Primitive.Title className={cn("text-base font-semibold", className)} {...props} />
}
function AlertDialogDescription({ className, ...props }: React.ComponentProps<typeof Primitive.Description>) {
  return <Primitive.Description className={cn("text-sm text-muted-foreground", className)} {...props} />
}
function AlertDialogAction({ className, ...props }: React.ComponentProps<typeof Primitive.Action>) {
  return <Primitive.Action data-slot="button" className={cn(buttonVariants({ variant: "destructive" }), className)} {...props} />
}
function AlertDialogCancel({ className, ...props }: React.ComponentProps<typeof Primitive.Cancel>) {
  return <Primitive.Cancel data-slot="button" className={cn(buttonVariants({ variant: "outline" }), className)} {...props} />
}

export { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel }
