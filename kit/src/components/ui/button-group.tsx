import * as React from "react"
import { cn } from "cn"

/** 2 đến 4 nút cùng việc trên cùng một đối tượng. Nối liền, bo ở hai đầu. */
function ButtonGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="group"
      data-slot="button-group"
      className={cn("inline-flex w-fit max-w-full [&>[data-slot=button]]:rounded-none [&>[data-slot=button]]:first:rounded-l-[10px] [&>[data-slot=button]]:last:rounded-r-[10px] [&>[data-slot=button]:not(:first-child)]:-ml-px [&>[data-slot=button]:focus-visible]:z-10", className)}
      {...props}
    />
  )
}

export { ButtonGroup }
