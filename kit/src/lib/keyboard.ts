/**
 * Bàn phím ảo trên điện thoại. iOS Safari không co trang khi bàn phím mở (chỉ visualViewport co lại),
 * Chrome Android mặc định cũng vậy. Đặt data-keyboard trên <html> khi vùng nhìn thấy mất hơn 25% chiều cao,
 * để CSS ẩn thanh dưới. Chạy một lần khi khởi động; máy tính không có visualViewport co lại nên không làm gì.
 */
export function installKeyboardFlag() {
  const vv = window.visualViewport
  if (!vv) return
  const on = () => {
    const open = vv.height < window.innerHeight * 0.75 && document.activeElement instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)
    document.documentElement.toggleAttribute("data-keyboard", open)
  }
  vv.addEventListener("resize", on)
  vv.addEventListener("scroll", on)
  document.addEventListener("focusout", () => setTimeout(on, 50))
}
