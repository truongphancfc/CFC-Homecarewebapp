# CFC Homecare Studio

Web app tĩnh (HTML/CSS/JS thuần) — deploy được lên Vercel static, Netlify, Cloudflare Pages, cPanel, hoặc mở trực tiếp `index.html`.

Giao diện nền tối tone tím/xanh Homecare, layout kiểu panel + stage tham chiếu thietke.cobay.vn.

## Thành phần

- `index.html`: 4 tab chính — Công cụ tạo ảnh, Máy tính lợi nhuận, Trở thành đối tác, Về chúng tôi.
- `styles.css`: theme tối tím/xanh, font Montserrat + Be Vietnam Pro, animation reveal/hover.
- `app.js`: canvas tạo ảnh PNG + batch, máy tính tiết kiệm dạng slider, bản đồ biểu trưng SVG.
- `assets/`: logo Z (tím & xanh), ảnh 3 dòng sản phẩm ZeO/Oplus/PANO.

## 4 chức năng

1. **Công cụ tạo ảnh** — logo Z cố định trên khung (tím ZeO / xanh Homecare), upload ảnh nền + logo NPP (tuỳ chọn), bật/tắt brandname `ZeO — Oplus — PANO`, tạo hàng loạt từ danh sách, tải PNG.
2. **Máy tính lợi nhuận** — cho khách hàng: chọn dòng sản phẩm, kéo thanh trượt số lần giặt/tuần → hiện tiết kiệm mỗi năm so với sản phẩm thường.
3. **Trở thành đối tác** — quyền lợi NPP/Đại lý, bản đồ Việt Nam biểu trưng (chấm sáng), 2 đầu mối liên hệ theo miền.
4. **Về chúng tôi** — kênh TikTok (@cfchomecare), YouTube (@zeovietnamofficial), Shopee (shopee.vn/zeovietnamofficial), bộ sản phẩm và các so sánh thực tế.

## Sửa số liệu máy tính lợi nhuận

Toàn bộ giả định nằm trong `CALC_CONFIG` ở đầu `app.js` (chi phí mỗi lần giặt CFC vs thường cho từng dòng ZeO/Oplus/PANO). Thay số thật vào một chỗ này là xong — các dòng mô tả (`rows`, `hint`) sửa cùng chỗ.

## Chạy thử local

```bash
python3 -m http.server 4173 --directory cfc-homecare-webapp
# mở http://localhost:4173
```
