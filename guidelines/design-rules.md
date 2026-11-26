# Luật thiết kế

“Web” nghĩa là lấy từ web đang chạy. “Đề xuất” là luật mới, chưa duyệt.

## Chữ (web)

| Vai trò | Cỡ và độ đậm |
|---|---|
| Thân bài | 14px, dòng 1.65 |
| h1 | clamp(24px, 2.2vw, 30px), 600, giãn chữ -0.035em |
| h2 | 18px, 550 |
| h3 | 16px, 550 |
| Chữ phụ | 12px |

- Giao diện dùng Be Vietnam Pro. Lora chỉ cho tên gia sư và dấu hiệu thương hiệu.
- Không thêm font mới nếu font đó không có bộ `vietnamese` trên Google Fonts. Figtree, Outfit, DM Sans, Poppins, Fustat, Albert Sans đều thiếu.
- Đề xuất: ô nhập 16px trên màn cảm ứng để iPhone không tự phóng to.

## Màu và bề mặt (web)

- Đỏ `--primary` dành cho hành động chính và trạng thái đang chọn.
- Phân tầng bằng độ đậm nhạt (`--surface-side`, `--surface-hover`, `--surface-active`), không bằng bóng đổ.
- Trạng thái tốt dùng `--positive`, cần chú ý dùng `--warning`, nguy hiểm dùng `--destructive`. Luôn kèm chữ hoặc icon, không chỉ dựa vào màu.
- Lớp học và người dùng màu pastel đi theo cặp nền và chữ.

## Nút

- Mỗi màn hình tối đa một nút chính (`default`). Còn lại dùng `secondary`, `outline` hoặc `ghost`.
- Nhãn nói rõ việc xảy ra: “Đặt học thử”, “Lưu thay đổi”. Không dùng “OK”, “Bấm vào đây”.
- Việc mất thời gian phải có trạng thái đang xử lý và chặn bấm hai lần.
- Hành động không hoàn tác được phải hỏi lại.
- Chỉ chuyển trang thì dùng link, không dùng nút.
- Nút chỉ có icon phải có `aria-label`.
- Cao tối thiểu 44px, bo 10px, không bóng, nhấn thì co còn 0.98 (web).

## Form

- Mỗi ô có nhãn nhìn thấy được, không dùng placeholder thay nhãn.
- Lỗi đặt ngay dưới ô, nói sai gì và sửa thế nào.
- Chọn đúng bàn phím (`type`, `inputMode`, `autoComplete`).
- Ô nhập cao tối thiểu 44px, rộng hết khung (web).
- Gửi lỗi thì giữ nguyên những gì người dùng đã gõ.

## Bố cục (web)

- Khung sau đăng nhập: thanh bên 248px trên máy tính, thanh trên 64px, thanh dưới cho điện thoại và máy tính bảng. Lề 40px trên máy tính.
- Trang nội dung rộng tối đa 1160px.
- Kiểm ở 390px. Không cuộn ngang, bảng rộng thì cuộn trong khung riêng.
- Dùng `100dvh` thay `100vh`, chừa vùng an toàn của điện thoại.

## Chuyển động

- 140ms cho phản hồi nhỏ, 220ms mặc định, 360ms cho thay đổi lớn, dùng `--ease-out` (web).
- Chỉ chuyển `transform` và `opacity` khi được. Không dùng `transition: all`.
- Tắt hoặc giảm khi `prefers-reduced-motion`.
- Không dùng hiệu ứng WebGL hay nền động trên màn hình làm việc.

## Trợ năng

- Viền focus 2px màu `--ring`, cách 4px (web). Không xoá viền focus.
- Chữ thường đạt tương phản 4.5:1.
- Làm được hết bằng bàn phím. Hộp thoại giữ focus và trả focus khi đóng.

## Trạng thái bắt buộc

Mỗi danh sách hoặc trang dữ liệu có đủ: đang tải (khung xương), trống (nói cách tạo mục đầu tiên), lỗi (cách thử lại).

## Chữ giao diện

- Tiếng Việt, ngắn, chủ động. Số tiền viết `200.000đ`.
- Ngày giờ định dạng bằng `Intl` với `vi-VN`.
