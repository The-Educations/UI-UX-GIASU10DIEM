# Từ tính năng của web đến component

Tra theo trang đang làm: cần component nào (đã có trong `kit/` hay web), tham khảo nguồn nào, trạng thái nào không được quên. Nguồn và giấy phép ở [../references/sources.md](../references/sources.md).

Cột "Có sẵn" ghi `web` nếu file đã nằm trong `app/src/components/ui/`, `kit` nếu mới có bản đề xuất trong `kit/src/components/ui/`.

| Tính năng (đường dẫn web) | Component | Có sẵn | Tham khảo | Trạng thái phải có |
|---|---|---|---|---|
| Tìm gia sư (`/tutors`) | Card, ClickableCard, Typeahead, MultiSelector, Sheet (bộ lọc ở điện thoại), Pagination | web: sheet, toggle-group · kit: card, typeahead, pagination | shadcn Item, Ant Design Pagination | tải (Skeleton), không có kết quả (gợi ý bỏ lọc), lỗi mạng |
| Hồ sơ gia sư (`/tutors/:id`) | Tabs, StarDisplay, MetadataList, Avatar, Badge | web: tabs, avatar, badge · kit: star-rating, list | Mantine Rating | chưa có đánh giá, gia sư không còn nhận lớp (khoá), 404 |
| Đặt buổi học thử, lịch rảnh (`/schedule`, `/calendar`, `/availability`) | DayStrip, TimeSlotPicker, ScrollableArea, Stepper | kit: day-strip, time-slot-picker, table, stepper | Cal.com Booker, Kibo mini-calendar | gia sư chưa mở lịch, ngày kín, chưa xác minh số điện thoại (khoá) |
| Lớp học (`/classes`) | Card, StatusDot, Timeline, MetadataList, AlertDialog (huỷ lớp) | kit: card, status-dot, timeline, alert-dialog | Mantine Timeline, Ant Design Steps | chưa có lớp, lớp đã đủ học viên (khoá) |
| Tin nhắn (`/messages`) | Chat (Bubble, Message), FileInput, Textarea, InfoTip | web: bubble, message, textarea · kit: file-input, tooltip | shadcn-admin chats | chưa có tin, gửi lỗi (thử lại), tệp quá nặng |
| Ví và nạp tiền (`/wallet`) | StatTile, Table hoặc List, Timeline (trạng thái nạp), InputGroup (đ), Banner | kit: stat-tile, table, list, timeline, input-group, banner | HyperUI stats, Primer Banner | chưa có giao dịch, nạp thất bại, quá hạn mức (khoá) |
| Cộng đồng, tin tức (`/community`, `/news`) | List, Item, Badge, Timestamp, Pagination | kit: list, timestamp, pagination | Primer ActionList | chưa có bài, bài bị ẩn (khoá) |
| Đăng nhập, đăng ký, xác minh (`/auth`, `/verify-email`) | Field, OtpInput, CheckRow, Banner, ResultState | web: field · kit: otp-input, checkbox, banner, result-state | GOV.UK error-summary, error-message | sai mã, sai quá nhiều lần (khoá), hết hạn liên kết |
| Onboarding gia sư (`/onboarding`, `/studio`) | Stepper, FormLayout, FileInput, Tokenizer, Field | kit: stepper, form-layout, file-input, tokenizer | GOV.UK character-count, Ant Design Steps | thiếu mục nào (nhảy tới mục thiếu), tệp lỗi |
| Quản trị (`/admin`) | Table, ScrollableArea, DropdownMenu (thao tác dòng), Tabs, StatTile, AlertDialog | kit: table, dropdown-menu, stat-tile, alert-dialog · web: tabs | shadcn-admin users, tasks | rỗng, lỗi tải, thao tác không hoàn tác phải hỏi lại |
| Chuông thông báo | Popover, List, Item, Badge | web: popover · kit: list | Mantine Notification | chưa có thông báo, lỗi tải |
| Trang lỗi, bảo trì | ResultState, Banner, ErrorBoundary | kit: result-state, banner | shadcn-admin errors, Ant Design Result | 403, 404, 500, bảo trì |

## Luật chung cho mọi dòng trên

- Mỗi màn hình tối đa một nút chính. Vùng chạm tối thiểu 44px. Kiểm ở 390px.
- Lỗi đặt ngay dưới ô, nói sai gì và sửa thế nào (cách viết lấy theo GOV.UK).
- Số tiền `200.000đ`, ngày giờ bằng `Intl` với `vi-VN`.
- Thiếu component cho một tính năng thì thêm vào `kit/` theo [kit/README.md](../kit/README.md), để người chủ chấm sao trước khi đưa vào web.
