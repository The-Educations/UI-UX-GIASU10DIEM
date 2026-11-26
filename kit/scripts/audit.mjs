// Kiểm chéo trình duyệt và thiết bị cho trang chấm và mọi demo.
// Chạy: npm run build && npx vite preview --port 4173 &  rồi  node scripts/audit.mjs [url] [chromium,firefox,webkit]
// Thoát mã 1 nếu có lỗi. Chỉ kiểm bằng engine trình duyệt: iPhone/Pixel ở đây là mô phỏng cảm ứng và khung hình, KHÔNG phải máy thật.
import { chromium, firefox, webkit, devices } from "playwright"

const base = process.argv[2] ?? "http://localhost:4173/"
const only = (process.argv[3] ?? "chromium,firefox,webkit").split(",")
const engines = { chromium, firefox, webkit }

const profiles = [
  { name: "Desktop 1280", engines: ["chromium", "firefox", "webkit"], ctx: { viewport: { width: 1280, height: 800 } } },
  { name: "Android (Pixel 7)", engines: ["chromium"], ctx: devices["Pixel 7"] },
  { name: "iPhone 15", engines: ["webkit"], ctx: devices["iPhone 15"] },
  { name: "Điện thoại hẹp 360", engines: ["chromium", "firefox", "webkit"], ctx: { viewport: { width: 360, height: 740 }, hasTouch: true, isMobile: false } },
]

const problems = []
const note = (where, msg) => problems.push(`${where}: ${msg}`)

async function checkDemo(page, where, id) {
  await page.goto(`${base}#/demo/${id}`)
  await page.reload({ waitUntil: "networkidle" })
  await page.waitForTimeout(200)
  const r = await page.evaluate(() => {
    const small = []
    document.querySelectorAll("button, input:not([type=file]), select, textarea, [role=radio], [role=checkbox], [role=switch], [role=combobox]").forEach((el) => {
      if (el.hasAttribute("data-allow-small") || el.classList.contains("sr-only")) return
      const cs = getComputedStyle(el)
      if (cs.display === "none" || cs.visibility === "hidden") return
      const box = el.closest("label") && el.matches("input,[role=checkbox],[role=radio],[role=switch]") ? el.closest("label") : el
      const b = box.getBoundingClientRect()
      if (b.width && b.height && (b.height < 43.5 || b.width < 43.5)) small.push(`${el.tagName.toLowerCase()} "${(el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 20)}" ${Math.round(b.width)}x${Math.round(b.height)}`)
    })
    return { over: document.documentElement.scrollWidth - document.documentElement.clientWidth, small: [...new Set(small)] }
  })
  if (r.over > 0) note(where, `${id} tràn ngang ${r.over}px`)
  if (r.small.length) note(where, `${id} vùng chạm < 44px: ${r.small.join("; ")}`)
}

async function checkPage(page, where) {
  await page.goto(base, { waitUntil: "networkidle" })
  const isMobile = (page.viewportSize()?.width ?? 1280) < 768
  const ids = await page.$$eval("article[id]", (a) => a.map((x) => x.id))
  if (ids.length < 50) note(where, `chỉ thấy ${ids.length} thẻ component`)
  // thanh đầu phải dính khi cuộn
  await page.evaluate(() => scrollTo(0, 3000))
  await page.waitForTimeout(400)
  const s = await page.evaluate(() => {
    const b = [...document.querySelectorAll("button")].find((x) => x.textContent?.includes("Xuất kết quả"))?.getBoundingClientRect()
    return { top: b ? Math.round(b.top) : null, visible: !!b && b.top >= 0 && b.bottom <= innerHeight, overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth }
  })
  if (!s.visible) note(where, `thanh đầu không dính khi cuộn (nút Xuất kết quả ở top=${s.top})`)
  if (s.overflow > 0) note(where, `trang chính tràn ngang ${s.overflow}px`)
  if (isMobile) {
    // cuộn lên thì hàng bộ lọc hiện lại
    await page.evaluate(() => scrollBy(0, -200)); await page.waitForTimeout(500)
    const shown = await page.evaluate(() => document.querySelector('[role="radiogroup"][aria-label="Lọc theo trạng thái"]')?.getBoundingClientRect().height ?? 0)
    if (!shown) note(where, "cuộn lên mà hàng bộ lọc không hiện lại")
  }
  // chấm sao bằng bàn phím và xuất
  await page.evaluate(() => scrollTo(0, 0))
  const first = page.locator("article [role=radio]").first()
  await first.focus(); await page.keyboard.press("ArrowRight"); await page.keyboard.press("ArrowRight")
  const checked = await page.locator("article").first().locator('[role=radio][aria-checked="true"]').getAttribute("aria-label")
  if (checked !== "2 sao") note(where, `bàn phím chấm sao ra "${checked}", cần "2 sao"`)
  await page.getByRole("button", { name: "Xuất kết quả" }).click()
  const [dl] = await Promise.all([page.waitForEvent("download", { timeout: 5000 }), page.getByRole("button", { name: "Tải JSON" }).click()])
  const text = await (await import("node:fs")).promises.readFile(await dl.path(), "utf8")
  const j = JSON.parse(text)
  if (j.summary?.rated !== 1) note(where, `xuất JSON đếm ${j.summary?.rated} mục đã chấm, cần 1`)
  await page.keyboard.press("Escape")
  await page.evaluate(() => localStorage.clear())
  return ids
}

for (const p of profiles) {
  for (const e of p.engines.filter((x) => only.includes(x))) {
    const where = `${e} · ${p.name}`
    const browser = await engines[e].launch()
    const ctx = await browser.newContext({ ...p.ctx, acceptDownloads: true })
    const page = await ctx.newPage()
    page.on("pageerror", (err) => note(where, `lỗi trang: ${err.message.slice(0, 120)}`))
    page.on("console", (m) => m.type() === "error" && note(where, `console error: ${m.text().slice(0, 120)}`))
    try {
      const ids = await checkPage(page, where)
      for (const id of ids) await checkDemo(page, where, id)
      console.log(`✓ ${where}: ${ids.length} demo`)
    } catch (err) {
      note(where, `không chạy hết: ${String(err.message).split("\n")[0]}`)
    }
    await browser.close()
  }
}

const uniq = [...new Set(problems)]
console.log(uniq.length ? `\n${uniq.length} vấn đề:\n- ${uniq.join("\n- ")}` : "\nKhông có vấn đề.")
process.exit(uniq.length ? 1 : 0)
