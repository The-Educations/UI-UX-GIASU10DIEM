const fmt = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("vi-VN", o)
const full = fmt({ weekday: "long", day: "numeric", month: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })
const day = fmt({ day: "numeric", month: "numeric", year: "numeric" })

/** Ngày giờ theo vi-VN. Gần thì nói "5 phút trước", xa thì ghi ngày; con trỏ vào hiện đầy đủ. */
function Timestamp({ date, now = Date.now() }: { date: Date; now?: number }) {
  const diff = Math.round((date.getTime() - now) / 60000)
  const rtf = new Intl.RelativeTimeFormat("vi", { numeric: "auto" })
  const text = Math.abs(diff) < 60 ? rtf.format(diff, "minute") : Math.abs(diff) < 1440 ? rtf.format(Math.round(diff / 60), "hour") : Math.abs(diff) < 10080 ? rtf.format(Math.round(diff / 1440), "day") : day.format(date)
  return <time dateTime={date.toISOString()} title={full.format(date)}>{text}</time>
}

/** 200000 → "200.000đ" */
const money = (n: number) => `${new Intl.NumberFormat("vi-VN").format(n)}đ`

export { Timestamp, money }
