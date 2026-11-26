import * as React from "react"
import { CheckIcon, ClipboardIcon, DownloadIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Banner } from "@/components/ui/banner"
import { buildCsv, buildJson, buildPrompt, summary, type Ratings } from "./export.ts"
import { prefs } from "./store.ts"

function save(name: string, type: string, text: string) {
  const url = URL.createObjectURL(new Blob([text], { type }))
  const a = Object.assign(document.createElement("a"), { href: url, download: name })
  document.body.append(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function ExportDialog({ ratings, storageOk, children }: { ratings: Ratings; storageOk: boolean; children: React.ReactNode }) {
  const [rater, setRater] = React.useState(() => prefs.get("rater") ?? "")
  const [copied, setCopied] = React.useState<"" | "ok" | "fail">("")
  const s = summary(ratings)
  const stamp = new Date().toISOString().slice(0, 10)
  const file = `cham-component-gs10-${stamp}`

  const copy = async () => {
    try { await navigator.clipboard.writeText(buildPrompt(ratings, rater)); setCopied("ok") } catch { setCopied("fail") }
  }

  return (
    <Dialog onOpenChange={() => setCopied("")}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xuất kết quả</DialogTitle>
          <DialogDescription>
            {s.rated}/{s.total} mục đã chấm, {s.needs_fix} mục cần sửa. Tệp có sẵn lời dặn cho agent và đường dẫn file cần sửa.
          </DialogDescription>
        </DialogHeader>
        {storageOk ? null : <Banner tone="warning" title="Trình duyệt không cho lưu">Kết quả sẽ mất khi đóng tab. Xuất tệp trước khi rời trang.</Banner>}
        <Field>
          <FieldLabel htmlFor="rater">Tên người chấm (không bắt buộc)</FieldLabel>
          <Input id="rater" autoComplete="name" value={rater} onChange={(e) => { setRater(e.target.value); prefs.set("rater", e.target.value) }} />
        </Field>
        <div className="grid gap-2 sm:grid-cols-2">
          <Button onClick={() => save(`${file}.json`, "application/json", buildJson(ratings, rater))}><DownloadIcon />Tải JSON</Button>
          <Button variant="secondary" onClick={() => save(`${file}.csv`, "text/csv;charset=utf-8", buildCsv(ratings))}><DownloadIcon />Tải CSV</Button>
        </div>
        <Button variant="outline" onClick={copy}>{copied === "ok" ? <CheckIcon /> : <ClipboardIcon />}{copied === "ok" ? "Đã chép" : "Chép lời nhắc cho agent"}</Button>
        {copied === "fail" ? <p role="alert" className="m-0 text-[13px] text-destructive">Trình duyệt chặn việc chép. Hãy tải JSON thay thế.</p> : null}
      </DialogContent>
    </Dialog>
  )
}
