import * as React from "react"
import { Accordion as Primitive } from "radix-ui"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "cn"

const Accordion = Primitive.Root

function AccordionItem({ className, ...props }: React.ComponentProps<typeof Primitive.Item>) {
  return <Primitive.Item className={cn("border-b last:border-b-0", className)} {...props} />
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof Primitive.Trigger>) {
  return (
    <Primitive.Header className="flex">
      <Primitive.Trigger
        className={cn("group flex min-h-11 flex-1 items-center justify-between gap-4 rounded-md py-3 text-left text-sm font-medium outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50", className)}
        {...props}
      >
        {children}
        <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-data-[state=open]:rotate-180" />
      </Primitive.Trigger>
    </Primitive.Header>
  )
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof Primitive.Content>) {
  return (
    <Primitive.Content className="overflow-hidden text-sm data-[state=closed]:animate-[acc-up_var(--duration-base)_var(--ease-out)] data-[state=open]:animate-[acc-down_var(--duration-base)_var(--ease-out)]" {...props}>
      <div className={cn("pb-4 text-muted-foreground", className)}>{children}</div>
    </Primitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
