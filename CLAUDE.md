# Luật cho agent khi làm giao diện Gia Sư 10 Điểm

Trả lời và viết chữ giao diện bằng tiếng Việt, trừ khi được bảo khác.

## Đọc trước khi viết UI

1. `guidelines/design-rules.md` (bắt buộc).
2. `tokens/theme.css` (bắt buộc). Chỉ dùng token ở đây.
3. `guidelines/components/<nhóm>.md` cho component sắp đụng tới.
4. `guidelines/layouts.md` khi dựng trang mới, rồi mở file mẫu trong `references/layouts/`.
5. `guidelines/platforms.md` khi component có ô nhập, ngày giờ, thanh dính, bàn phím ảo hoặc cuộn: luật cho iOS, Android, Windows, macOS và từng trình duyệt.
6. `guidelines/web-features.md` khi làm một tính năng cụ thể: nó chỉ ra component nào đã có trong `kit/`, nguồn tham khảo và trạng thái phải có.
7. Khi được đưa tệp chấm sao (JSON hoặc CSV xuất từ `kit/`): mỗi dòng có `stars`, `reason`, `kit_file`, `web_file`. Cột `remade` cho biết bản kit đã khác bản web ở đâu. Sửa theo `reason` cho dòng từ 1 đến 3 sao hoặc có `reason`, giữ nguyên `kit_file` và `web_file` khớp nhau.

## Luật cứng

- Web chạy React 19, Tailwind 4, shadcn trên Radix. Không thêm thư viện nền thứ hai (Base UI, React Aria) và không cài `@astryxdesign/core` vào web nếu chưa được đồng ý.
- File trong `references/layouts/` viết bằng component Astryx và StyleX. Chỉ lấy bố cục và cách xử lý trạng thái, viết lại bằng shadcn và Tailwind. Không chép nguyên.
- Không tự đặt màu, bo góc, thời gian chuyển động mới. Thiếu token thì đề xuất thêm vào `tokens/theme.css`.
- Mỗi màn hình tối đa một nút chính.
- Vùng chạm tối thiểu 44px.
- Kiểm ở bề ngang 390px, không được cuộn ngang. Kiểm cả chữ tiếng Việt có dấu.
- Mọi chuyển động phải tắt hoặc giảm khi `prefers-reduced-motion`.
- Có đủ trạng thái: đang tải, trống, lỗi, bị khoá.
- Chép mã bên ngoài thì phải đúng giấy phép, xem `references/sources.md`.

## Khi xong

Báo rõ đã kiểm gì (khổ màn hình, sáng hay tối, bàn phím) và chưa kiểm gì.
