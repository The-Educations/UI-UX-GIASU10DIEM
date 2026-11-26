# Bàn giao

Cập nhật: 26/11/2026.

## Đã làm

- Đọc Astryx và dựng trang xem thử: 172 mục component và hook, 731 ví dụ, 58 layout mẫu, 7 theme gốc, 1 theme theo màu web.
- Tìm thêm bộ UI/UX và kiểm giấy phép (`references/sources.md`).
- Chọn cách dùng: lấy thiết kế, giữ shadcn và Tailwind. Theme gốc: màu web hiện tại. Hai lựa chọn này do Claude đề xuất và được chủ dự án đồng ý chung.
- Soạn token, luật thiết kế, luật component.

Trang xem thử đã xuất bản (riêng tư, phải được chủ trang chia sẻ mới mở được): https://claude.ai/artifact/ACHVV25rSmWRzaoMByeq6Q

- Dựng `kit/`: 57 component shadcn + Tailwind, trang chấm 1–5 sao kèm lý do, xuất CSV và JSON, workflow GitHub Pages. 49 tên Astryx còn lại được ghi lý do không dựng riêng.

## Chưa làm

- [ ] Bật GitHub Pages (Settings → Pages → Source: GitHub Actions). Repo đang riêng tư; trang Pages sẽ công khai.
- [ ] Chủ dự án chấm trên trang kit, xuất tệp, đưa cho agent.
- [ ] Đưa nhánh `fix/touch-targets-44` của web (đã commit, chưa push) lên PR: vá 4 chỗ dưới 44px.

- [ ] Chấm “Ưng / Chưa ưng” cho từng component và layout. Lúc tạo repo chưa có lượt chấm nào, nên chưa loại component nào.
- [ ] Duyệt màu nền tối. Đây là đề xuất mới, web hiện chỉ có nền sáng.
- [ ] Áp token vào web. Chưa sửa gì trong repo web.
- [x] Repo web đã trỏ tới repo này trong `AGENTS.md` (PR #166).
- [ ] Lấy các mẫu trong `references/sources.md` (hiện mới có link và minh hoạ, chưa chép mã gốc).
- [ ] Đo dung lượng và tốc độ trên web thật, thử trên điện thoại tầm trung.
- [ ] Bàn lại: ô nhập trên web đang dùng chữ 14px, iPhone sẽ tự phóng to khi bấm vào. Đề xuất 16px trên màn cảm ứng.

## Làm tiếp thế nào

```bash
git clone https://github.com/The-Educations/UI-UX-GIASU10DIEM.git
```

Mở Claude Code trong thư mục đó rồi nói việc cần làm. Claude sẽ đọc `CLAUDE.md`.

Xem component trên máy: làm theo [gallery/README.md](gallery/README.md).
