# Trang chấm component

Một trang tĩnh: xem từng component viết bằng shadcn và Tailwind 4 (cùng stack với web), chấm 1 đến 5 sao, ghi lý do, rồi xuất CSV hoặc JSON cho agent sửa.

```bash
npm ci
npm run dev        # xem trên máy
npm run build      # ra dist/, tự kiểm kiểu
node src/page/export.check.ts   # kiểm xuất CSV, JSON
```

## Thêm một component

1. Viết file trong `src/components/ui/` (giữ kiểu shadcn: `data-slot`, `cn`, token từ `tokens/theme.css`).
2. Viết demo trong `src/demos/`, thêm vào `src/demos/index.ts`.
3. Thêm một dòng vào `src/registry.ts`.

## Đã biết

- `src/components/ui/` chứa 24 file chép nguyên từ web (`app/src/components/ui/`), còn lại là bản đề xuất mới. Cột `status` trong tệp xuất cho biết mục nào là "web đã có".
- `src/styles.css` chép luật nền từ web. Cuối file có khối vá 44px, đã làm bên web ở nhánh `fix/touch-targets-44`.
- Lượt chấm lưu trong `localStorage` của từng trình duyệt. Không có máy chủ, nên mỗi người xuất tệp của riêng mình.
- Mỗi demo chạy trong một iframe để media query (`md:`, `lg:`) phản ứng theo bề ngang khung 390, 768 hay đầy đủ.

## Xuất bản

Workflow `.github/workflows/pages.yml` build và đưa `dist/` lên GitHub Pages khi push vào `main`. Cần vào Settings → Pages → Source chọn "GitHub Actions" một lần.
