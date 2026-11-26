# Đa nền tảng: điện thoại, máy tính, trình duyệt

Luật cho mọi component. Mỗi dòng ghi nguồn đã đọc ngày 26/11/2026. Luật thực thi bằng CSS nằm ở [tokens/platform.css](../tokens/platform.css).

**Mức hỗ trợ tối thiểu** (do Tailwind 4 đặt): Chrome 111, Safari 16.4, Firefox 128 ([Tailwind: Compatibility](https://tailwindcss.com/docs/compatibility)). Máy dưới mức này sẽ vỡ giao diện; web cần quyết định có chặn hay cho vào bản đơn giản.

## Cái đã kiểm bằng máy, cái chưa

| Đã kiểm | Chưa kiểm |
|---|---|
| Chromium, Firefox, WebKit (engine của Safari) bằng Playwright, ở 360, 390, 1280px | iOS thật (phóng to khi focus, bàn phím ảo, thanh địa chỉ co giãn) |
| Mô phỏng iPhone 15 và Pixel 7 (khung hình và cảm ứng) | Android thật, trình duyệt Samsung, Firefox Android |
| Cuộn, thanh dính, xuất tệp, bàn phím, vùng chạm | Windows High Contrast thật, trình đọc màn hình (VoiceOver, TalkBack, NVDA) |

Chạy kiểm: `cd kit && npm run build && npx vite preview --port 4173 & node scripts/audit.mjs`.

## Chạm và con trỏ

- Vùng chạm tối thiểu **44px** (luật dự án). Apple khuyên 44pt, Android 48dp; WCAG 2.2 mức AA chỉ đòi 24px, mức AAA đòi 44px ([W3C 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)). Nút chính trên Android nên cao 48px nếu còn chỗ.
- Hover chỉ là phần thêm. Tailwind 4 chỉ bật `hover:` khi máy có hover thật, nên màn cảm ứng không bị kẹt trạng thái hover.
- Kéo bằng chuột chỉ dùng cho chuột (`pointerType === "mouse"`). Trên cảm ứng, kéo là cuộn trang; việc chọn nhiều ô phải có cách khác (bấm từng ô, nút "chọn cả buổi").
- Chỗ cuộn ngang cần cách cuộn cho chuột: thanh cuộn thấy được hoặc nút trước/sau (Windows không có cử chỉ vuốt).

## Ô nhập

- Chữ trong ô nhập **tối thiểu 16px trên cảm ứng**, nếu không iOS Safari tự phóng to trang khi bấm vào. Web đã làm đúng (đo ngày 26/11/2026: ô email và mật khẩu của trang đăng nhập đều 16px ở iPhone 15 và Pixel 7, kể cả khi không có `platform.css`). Luật trong `platform.css` là lớp bảo vệ cho kit và cho trang mới; bản web không chép nó.
- Ngày giờ: iOS bỏ qua `min`, `max`, `step` của ô ngày giờ ([MDN: input date](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/date)), và vẻ ngoài của ô khác nhau theo hệ điều hành. Vì vậy: kiểm lại bằng JS và báo lỗi bằng chữ; in dòng "Thứ 4, 02/12/2026" bên dưới để xác nhận; chọn giờ bằng `<select>` thay cho `type="time"`. Xem `date-field.tsx`, `time-select.tsx`.
- `showPicker()` có ở Chrome 99, Firefox 101, Safari 16 nhưng bảng tương thích của MDN không xác nhận cho ô ngày giờ trên iOS. Phát hiện tính năng trước khi gọi, đừng dựa vào nó.
- Đặt `inputMode`, `autoComplete`, `enterKeyHint` đúng loại ô (số điện thoại, mã một lần `one-time-code`).

## Khung nhìn và bàn phím ảo

- Dùng `100dvh`, không dùng `100vh`; chừa `env(safe-area-inset-*)` (cần `viewport-fit=cover`).
- Khi bàn phím mở, iOS Safari **không** co trang, chỉ `visualViewport` co lại; phần tử cố định ở đáy bị che. Chrome Android mặc định cũng vậy, nhưng nghe theo `interactive-widget=resizes-content` ([Chrome: viewport meta](https://developer.chrome.com/docs/web-platform/viewport-meta/#interactive-widget)). Kit đặt meta này và dùng `lib/keyboard.ts` để ẩn thanh dưới khi bàn phím mở.
- Thanh dính (`position: sticky`) chỉ dính trong khung cha của nó. Đặt `sticky` ở phần tử cao bằng cả trang, không ở phần tử con trong một khối ngắn. Có phép kiểm cuộn trong `kit/scripts/audit.mjs`.
- Anchor dưới thanh dính cần `scroll-padding-top`.

## Windows và màn hình tương phản cao

- Windows High Contrast bật `forced-colors: active`: màu nền bị đè, bóng đổ bị bỏ ([MDN: forced-colors](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/forced-colors)). Trạng thái "đang chọn" không được chỉ dựa vào màu nền: thêm viền hoặc `outline` bằng màu hệ thống (`Highlight`, `ButtonText`). Đã làm trong `platform.css`; chưa thử trên Windows thật.
- Thanh cuộn Windows chiếm chỗ, macOS và iOS thì nổi. Khung cuộn dùng `scrollbar-width: thin`, đừng ẩn hẳn thanh cuộn ngang.

## Trình duyệt

- Bảng tương thích của MDN ghi ô giờ (`type="time"`) và ô ngày giờ không hỗ trợ hoặc chỉ hỗ trợ một phần ở vài trình duyệt (Firefox desktop, iOS). Chưa tự kiểm từng bản, nên dùng `<select>` cho giờ để khỏi phụ thuộc.
- Màu hệ thống của ô gốc (ô ngày, thanh cuộn) theo `color-scheme`; `theme.css` đã đặt `light` và `dark`.
- Mọi chuyển động tắt hoặc giảm khi `prefers-reduced-motion` (nằm trong `platform.css`).
