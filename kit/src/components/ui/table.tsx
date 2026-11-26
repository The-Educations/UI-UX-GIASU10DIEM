import * as React from "react"
import { cn } from "cn"

/** Khung cuộn riêng: bảng rộng cuộn trong khung, trang không bao giờ cuộn ngang. Có thể focus để cuộn bằng phím mũi tên. */
function ScrollableArea({ className, label, ...props }: React.ComponentProps<"div"> & { label: string }) {
  return <div role="region" aria-label={label} tabIndex={0} className={cn("w-full overflow-x-auto overscroll-x-contain rounded-xl border bg-card outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50", className)} {...props} />
}

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return <table data-slot="table" className={cn("w-full min-w-[34rem] border-collapse text-left text-sm", className)} {...props} />
}
function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return <th scope="col" className={cn("h-11 border-b bg-muted px-4 text-[12.5px] font-medium whitespace-nowrap text-muted-foreground", className)} {...props} />
}
function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return <tr className={cn("border-b last:border-b-0 hover:bg-(--surface-hover)", className)} {...props} />
}
function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return <td className={cn("min-h-11 px-4 py-3 align-middle", className)} {...props} />
}

export { ScrollableArea, Table, TableHead, TableRow, TableCell }
