import * as React from "react"
import { FileIcon, UploadIcon, XIcon } from "lucide-react"
import { cn } from "cn"

/** Chọn hoặc kéo thả tệp. Nút bấm là đường chính (điện thoại không kéo thả được); kiểm loại và dung lượng ngay khi chọn. */
function FileInput({ accept, maxMB = 5, label, file, onFile, className }: { accept: string; maxMB?: number; label: string; file: File | null; onFile: (f: File | null) => void; className?: string }) {
  const ref = React.useRef<HTMLInputElement>(null)
  const [over, setOver] = React.useState(false)
  const [error, setError] = React.useState("")
  const take = (f?: File) => {
    if (!f) return
    if (f.size > maxMB * 1024 * 1024) return setError(`Tệp nặng ${(f.size / 1048576).toFixed(1).replace(".", ",")} MB, tối đa ${maxMB} MB. Hãy chọn tệp nhẹ hơn.`)
    setError("")
    onFile(f)
  }
  return (
    <div className={cn("grid gap-2", className)}>
      {file ? (
        <div className="flex min-h-11 items-center gap-3 rounded-lg border bg-card px-3 py-2 text-sm">
          <FileIcon className="size-4 shrink-0 text-muted-foreground" />
          <span className="min-w-0 flex-1 truncate">{file.name}</span>
          <button type="button" aria-label={`Bỏ tệp ${file.name}`} onClick={() => onFile(null)} className="-my-2 -mr-2 grid size-11 place-content-center rounded-lg outline-none hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50">
            <XIcon className="size-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => ref.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setOver(true) }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => { e.preventDefault(); setOver(false); take(e.dataTransfer.files[0]) }}
          data-over={over || undefined}
          className="flex min-h-28 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-input bg-card p-4 text-center text-sm outline-none transition-colors duration-[var(--duration-fast)] hover:bg-(--surface-hover) focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[over]:border-primary data-[over]:bg-primary/5"
        >
          <UploadIcon className="size-5 text-muted-foreground" />
          <span className="font-medium">{label}</span>
          <span className="text-[12.5px] text-muted-foreground">Tối đa {maxMB} MB</span>
        </button>
      )}
      <input ref={ref} type="file" accept={accept} className="sr-only" tabIndex={-1} onChange={(e) => { take(e.target.files?.[0]); e.target.value = "" }} />
      {error ? <p role="alert" className="text-sm text-destructive">{error}</p> : null}
    </div>
  )
}

export { FileInput }
