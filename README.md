# UI/UX Gia Sư 10 Điểm

Bộ UI/UX chung cho web [Gia-Su-10-Diem](https://github.com/The-Educations/Gia-Su-10-Diem). Người và agent đều dựa vào repo này mỗi lần làm giao diện.

Gốc thiết kế là [Astryx](https://github.com/meta/astryx) của Meta (MIT, bản 0.7.17, còn Beta), bổ sung ý tưởng từ nhiều thư viện khác chọn theo tính năng của web. Màu, chữ và bo góc lấy từ web đang chạy. Code viết bằng shadcn và Tailwind 4, cùng stack với web.

## Dùng thế nào

| Bạn muốn | Làm |
|---|---|
| Xem và chấm component | `npm run dev` ở thư mục gốc (cần Node 22 trở lên). Trình duyệt mở http://localhost:5173/ |
| Đưa kết quả cho agent sửa | Chấm sao, bấm **Xuất kết quả**, tải JSON hoặc CSV (hoặc chép lời nhắc), rồi đưa cho agent. Mỗi dòng ghi sẵn file cần sửa |
| Làm giao diện cho một trang web | Mở [guidelines/web-features.md](guidelines/web-features.md), tìm trang, lấy component và luật |
| Là agent | Đọc [CLAUDE.md](CLAUDE.md) |
| Người mới vào làm tiếp | Đọc [HANDOFF.md](HANDOFF.md) |

## Quy trình

1. Mở trang chấm, xem từng component ở bề ngang điện thoại, máy tính bảng, máy tính (có nền tối đề xuất).
2. Chấm 1 đến 5 sao, ghi lý do hoặc chỗ cần chỉnh nếu có. Kết quả lưu trong trình duyệt của bạn, không gửi đi đâu.
3. Xuất tệp. Agent sửa file `kit_file` và `web_file` theo lý do, giữ đúng token và luật 44px.
4. Mục nào ưng thì đưa vào web.

## Trong repo có gì

| Đường dẫn | Nội dung |
|---|---|
| `kit/` | Trang chấm sao: 63 component shadcn + Tailwind có ví dụ sống, xuất CSV và JSON. Xem [kit/README.md](kit/README.md) |
| `guidelines/web-features.md` | Mỗi tính năng của web dùng component nào, tham khảo nguồn nào, trạng thái nào phải có |
| `guidelines/design-rules.md` | Luật thiết kế của web mình |
| `guidelines/components/` | Nên và không nên cho từng component, trích từ tài liệu Astryx |
| `guidelines/layouts.md` | 58 layout mẫu và cái nào hợp trang nào |
| `tokens/theme.css` | Token màu, chữ, bo góc, chuyển động cho Tailwind 4 và shadcn |
| `tokens/astryx-brand-theme.js` | Cùng bộ màu, dưới dạng theme Astryx |
| `references/layouts/` | Mã nguồn các layout hợp với web, để tham khảo bố cục |
| `references/sources.md` | Các thư viện và repo đã tham khảo, kèm giấy phép và cách dùng |
| `gallery/` | Trang xem thử toàn bộ ví dụ gốc của Astryx |

## Quyết định đã chọn

Lấy thiết kế, giữ code đang có: web vẫn chạy shadcn và Tailwind 4, chỉ chỉnh cho đúng token và luật ở đây. Không cài `@astryxdesign/core` vào web.

Lý do: đo thử một trang chỉ có 5 component Astryx (Card, TextInput, Selector, Button, Dialog) thì tải thêm khoảng 240 KB JavaScript và 50 KB CSS (gzip) so với trang React trống. Đổi sang Astryx còn phải thay gần hết giao diện hiện có.

## Giấy phép

Phần trích từ Astryx giữ giấy phép MIT của Meta, xem [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Các nguồn khác chỉ lấy ý tưởng, mã trong `kit/` do mình viết lại; nguồn nào được phép chép, nguồn nào không, xem [references/sources.md](references/sources.md).
