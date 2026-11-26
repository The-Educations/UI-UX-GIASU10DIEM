# UI/UX Gia Sư 10 Điểm

Bộ UI/UX chung cho web [Gia-Su-10-Diem](https://github.com/The-Educations/Gia-Su-10-Diem). Mỗi lần làm giao diện, người và Claude đều dựa vào repo này.

Thiết kế tham khảo từ [Astryx](https://github.com/meta/astryx) của Meta (MIT, bản 0.7.17, còn Beta). Màu, chữ và bo góc lấy từ web đang chạy.

## Bắt đầu từ đâu

| Bạn là | Đọc |
|---|---|
| Người mới vào làm tiếp | [HANDOFF.md](HANDOFF.md) |
| Claude hoặc agent khác | [CLAUDE.md](CLAUDE.md) |
| Muốn xem component bằng mắt | [gallery/](gallery/README.md) |

## Xem trang chấm component trên máy

Cần Node 22 trở lên. Ở thư mục gốc repo:

```bash
npm run dev
```

Trình duyệt tự mở http://localhost:5173/. Gốc repo trước đây không có `package.json` nên `npm run dev` báo lỗi; giờ đã có.

## Trong repo có gì

| Đường dẫn | Nội dung |
|---|---|
| `tokens/theme.css` | Token màu, chữ, bo góc, chuyển động cho Tailwind 4 và shadcn |
| `tokens/astryx-brand-theme.js` | Cùng bộ màu, dưới dạng theme Astryx |
| `guidelines/design-rules.md` | Luật thiết kế của web mình |
| `guidelines/components/` | Nên và không nên cho từng component, trích từ tài liệu Astryx |
| `guidelines/layouts.md` | 58 layout mẫu và cái nào hợp trang nào |
| `references/layouts/` | Mã nguồn các layout hợp với web, để tham khảo bố cục |
| `references/sources.md` | Bộ UI/UX tìm thêm, kèm giấy phép |
| `gallery/` | Trang xem thử toàn bộ component |
| `kit/` | Trang chấm sao component viết bằng shadcn và Tailwind, xuất CSV hoặc JSON cho agent ([kit/README.md](kit/README.md)) |

## Cách dùng (đã chọn)

Lấy thiết kế, giữ code đang có: web vẫn chạy shadcn và Tailwind 4, chỉ chỉnh cho đúng token và luật ở đây. Không cài `@astryxdesign/core` vào web.

Lý do: đo thử một trang chỉ có 5 component Astryx (Card, TextInput, Selector, Button, Dialog) thì tải thêm khoảng 240 KB JavaScript và 50 KB CSS (gzip) so với trang React trống. Đổi sang Astryx còn phải thay gần hết giao diện hiện có.

## Giấy phép

Phần trích từ Astryx giữ giấy phép MIT của Meta, xem [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
