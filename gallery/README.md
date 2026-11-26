# Trang xem thử

Dựng toàn bộ ví dụ component và layout của Astryx thành một trang tĩnh, có theme theo màu web.

Cần Node 22 trở lên, git và mạng.

```bash
npm ci --ignore-scripts
```

```bash
npm run setup
```

```bash
npm run build
```

Rồi mở `out/preview.html` bằng trình duyệt.

- `npm run setup` tải đúng bản Astryx đã ghim vào `.cache/` (chỉ các thư mục cần).
- `npm run check` mở từng trang bằng Google Chrome đã cài và báo ví dụ lỗi.
- Mở trên máy thì lượt chấm chỉ lưu trong trình duyệt. Muốn chấm chung phải dùng bản artifact.
- `out/index.html`, `out/app.js`, `out/app.css` là bản để xuất artifact.
- Theme theo màu web nằm ở `src/brand.js`.
