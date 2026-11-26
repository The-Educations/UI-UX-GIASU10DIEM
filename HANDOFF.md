# Bàn giao

Cập nhật: 26/11/2026.

## Đã làm

- Đọc Astryx và dựng trang xem thử: 172 mục component và hook, 731 ví dụ, 58 layout mẫu, 7 theme gốc, 1 theme theo màu web.
- Tìm thêm bộ UI/UX và kiểm giấy phép (`references/sources.md`).
- Chọn cách dùng: lấy thiết kế, giữ shadcn và Tailwind. Theme gốc: màu web hiện tại. Hai lựa chọn này do Claude đề xuất và được chủ dự án đồng ý chung.
- Soạn token, luật thiết kế, luật component.
- Tìm thêm nguồn ngoài Astryx theo tính năng của web (Cal.com, shadcn-admin, Mantine, Ark UI, Primer, GOV.UK, Ant Design…), kiểm giấy phép bằng GitHub, viết bản đồ tính năng → component ở `guidelines/web-features.md`. Dựng thêm 6 component từ đó: otp-input, day-strip, time-slot-picker, timeline, stat-tile, result-state.

Trang xem thử đã xuất bản (riêng tư, phải được chủ trang chia sẻ mới mở được): https://claude.ai/artifact/ACHVV25rSmWRzaoMByeq6Q

- Dựng `kit/`: 63 component shadcn + Tailwind, trang chấm 1–5 sao kèm lý do, xuất CSV và JSON, workflow GitHub Pages. 49 tên Astryx còn lại được ghi lý do không dựng riêng.

- Làm lại theo nền tảng (26/11/2026, tối): `guidelines/platforms.md` (nguồn: MDN, W3C, Chrome, Tailwind), `tokens/platform.css`, lịch tuần (điện thoại theo ngày, màn rộng là lưới), ô ngày giờ, Button loading, Tabs cuộn, Sheet và Toast chừa vùng an toàn. Cột `remade` trong tệp xuất ghi chỗ khác bản web.
- Sửa lỗi thanh đầu trang chấm không dính khi cuộn (lỗi do tôi gây ra ở lần sửa trước, bắt được nhờ test cuộn).
- CI: `kit/scripts/audit.mjs` duyệt Chromium, Firefox, WebKit, iPhone 15, Pixel 7; `.github/workflows/ci.yml` chạy nó trên mỗi PR. Pages bật tại https://the-educations.github.io/UI-UX-GIASU10DIEM/.
- Web: PR thêm test thanh điều hướng dính và workflow cross-browser (không chặn deploy). CI chính của web vốn đã đủ (typecheck, test, audit, build, wrangler dry-run, e2e 4 phần, deploy kèm smoke); 15 lần deploy gần nhất đều thành công.

## Chưa làm

- [ ] Chấm lại trang kit và ghi lý do ở từng mục không ưng; chưa có lý do thì chưa biết sửa gì ngoài phần nền tảng đã làm.
- [ ] Chưa kiểm trên iOS và Android thật, Windows High Contrast thật, trình đọc màn hình.
- [ ] Chủ dự án chấm trên trang kit, xuất tệp, đưa cho agent.
- [ ] Đưa nhánh `fix/touch-targets-44` của web (đã commit, chưa push) lên PR: vá 4 chỗ dưới 44px.

- [ ] Chấm “Ưng / Chưa ưng” cho từng component và layout. Lúc tạo repo chưa có lượt chấm nào, nên chưa loại component nào.
- [ ] Duyệt màu nền tối. Đây là đề xuất mới, web hiện chỉ có nền sáng.
- [ ] Áp token vào web. Chưa sửa gì trong repo web.
- [x] Repo web trỏ tới repo này trong `docs/ui-ux-kit.md` (PR #166). `AGENTS.md` và `CLAUDE.md` của web bị git ignore toàn máy nên không đưa lên được.
- [ ] Lấy các mẫu trong `references/sources.md` (hiện mới có link và minh hoạ, chưa chép mã gốc).
- [ ] Đo dung lượng và tốc độ trên web thật, thử trên điện thoại tầm trung.
- [ ] Bàn lại: ô nhập trên web đang dùng chữ 14px, iPhone sẽ tự phóng to khi bấm vào. Đề xuất 16px trên màn cảm ứng.

## Làm tiếp thế nào

```bash
git clone https://github.com/The-Educations/UI-UX-GIASU10DIEM.git
```

Mở Claude Code trong thư mục đó rồi nói việc cần làm. Claude sẽ đọc `CLAUDE.md`.

Xem component trên máy: làm theo [gallery/README.md](gallery/README.md).
