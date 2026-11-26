import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

/** Chọn một trong danh sách dài (quận, trường). Gõ để lọc, bỏ dấu khi so khớp. */
function Typeahead({ options, value, onChange, placeholder, searchLabel, emptyText = "Không có kết quả. Thử gõ ít chữ hơn.", className }: { options: string[]; value: string; onChange: (v: string) => void; placeholder: string; searchLabel: string; emptyText?: string; className?: string }) {
  const [open, setOpen] = React.useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type="button" variant="outline" role="combobox" aria-expanded={open} className={cn("w-full justify-between bg-card font-normal", className)}>
          <span className={cn("truncate", !value && "text-muted-foreground")}>{value || placeholder}</span>
          <ChevronsUpDownIcon className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="start">
        <Command filter={(v, s) => (v.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().includes(s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase()) ? 1 : 0)}>
          <CommandInput placeholder={searchLabel} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            {options.map((o) => (
              <CommandItem key={o} value={o} className="min-h-11" onSelect={() => { onChange(o === value ? "" : o); setOpen(false) }}>
                {o}
                <CheckIcon className={cn("ml-auto", o === value ? "opacity-100" : "opacity-0")} />
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { Typeahead }
