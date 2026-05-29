# 💕 Kỷ niệm 1 Tháng Yêu Nhau - Website

Website tuyệt đẹp để kỷ niệm 1 tháng yêu nhau với nhiều hiệu ứng lãng mạn và dễ thương!

## ✨ Tính Năng

- 🎨 Giao diện đẹp, lãng mạn với gradient hồng pastel
- 💕 Trái tim bay liên tục trên background
- 🎉 Hiệu ứng confetti khi hoàn thành quiz
- 🎵 Nhạc nền có thể bật/tắt
- 📱 Responsive trên máy tính, tablet, điện thoại
- ✨ Hiệu ứng glow text, hover animation, transition mượt
- 🎯 Quiz 4 câu hỏi với feedback hài hước
- 💌 Lời nhắn bí mật trong popup
- 🚀 Deploy trực tiếp lên GitHub Pages

## 📁 Cấu Trúc Thư Mục

```
love-anniversary/
├── index.html           # File HTML chính
├── style.css            # Styling & animations
├── script.js            # Logic & interactions
├── README.md            # Tài liệu này
└── assets/
    ├── images/
    │   ├── couple.png      # Ảnh couple (tùy chỉnh)
    │   ├── photo1.jpg      # Ảnh thêm (tùy chỉnh)
    │   └── photo2.jpg      # Ảnh thêm (tùy chỉnh)
    └── music/
        └── love.mp3        # Nhạc nền (tùy chỉnh)
```

## 🚀 Cách Chạy

### 1. Chạy Cục Bộ
- Mở file `index.html` bằng trình duyệt
- Hoặc dùng Live Server trong VS Code

### 2. Chuẩn Bị Assets

**Thêm ảnh:**
- Đặt ảnh vào thư mục `assets/images/`
- Hỗ trợ: `.jpg`, `.png`, `.webp`
- Dung lượng tối ưu: < 2MB mỗi file

**Thêm nhạc:**
- Đặt nhạc vào `assets/music/`
- Tên file: `love.mp3` (hoặc thay đổi src trong HTML)
- Hỗ trợ: `.mp3`, `.ogg`, `.wav`
- Dung lượng tối ưu: < 10MB

## ✏️ Tùy Chỉnh Nội Dung

### Thay Đổi Câu Hỏi Quiz

Mở `script.js` tìm phần `quizData`:

```javascript
const quizData = [
    {
        question: "Câu hỏi của bạn? ❤️",
        answers: [
            "Đáp án 1",
            "Đáp án 2",
            "Đáp án 3",
            "Đáp án 4"
        ],
        feedback: "Phản hồi của bạn! 💕"
    }
];
```

### Thay Đổi Lời Nhắn

Mở `index.html` tìm phần `<div class="love-letter">`:

```html
<p>
    Lời nhắn của bạn ở đây.<br><br>
    Có thể viết nhiều dòng! 💕
</p>
```

### Thay Đổi Nội Dung Trang Kết Thúc

Mở `index.html` tìm phần `.ending-content`:

```html
<p class="thank-you">Nội dung cảm ơn của bạn</p>
```

### Thay Đổi Tiêu Đề & Nội Dung

Tìm các thẻ trong `index.html`:
- `<h1 class="main-title">` - Tiêu đề trang 1
- `<div class="intro-text">` - Nội dung trang 1
- `<h1 class="ending-title">` - Tiêu đề trang 3

## 🎨 Tùy Chỉnh Giao Diện

### Thay Đổi Màu Sắc

Mở `style.css` và tìm:
- `#ff69b4` - Màu hồng chính
- `#ff1493` - Màu hồng đậm
- `#d63384` - Màu chữ chính
- Thay đổi hex color codes

### Thay Đổi Font

Tìm trong `style.css`:
```css
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
```

Thay đổi thành font khác hoặc import Google Fonts

### Điều Chỉnh Tốc Độ Animation

Tìm các giá trị `animation-duration` trong CSS:
- `3s` - 3 giây (trái tim bay)
- `0.8s` - 0.8 giây (transition trang)

## 🎵 Sử Dụng Nhạc

### Thay Đổi File Nhạc

**Cách 1:** Dùng file `love.mp3`
- Đặt file vào `assets/music/love.mp3`

**Cách 2:** Dùng file khác
- Mở `index.html`
- Tìm: `<source src="assets/music/love.mp3"`
- Thay đổi đường dẫn

### Mục Kiến Nhạc Không Hoạt Động

Một số trình duyệt yêu cầu:
- Người dùng tương tác trước (click, scroll)
- Thì nhạc mới tự động phát

Giải pháp: Bấm nút 🔊 để phát nhạc thủ công

### Disable Nhạc

Để tắt nhạc hoàn toàn:
```html
<!-- Comment lại thẻ audio -->
<!-- <audio id="backgroundMusic" loop>
    <source src="assets/music/love.mp3" type="audio/mpeg">
</audio> -->
```

## 📱 Responsive Design

Website tự động thích ứng với:
- 📱 Điện thoại (< 480px)
- 📱 Tablet (480px - 768px)
- 💻 Máy tính (> 768px)

Kiểm tra responsive: Nhấn F12 trong trình duyệt

## 🚀 Deploy Lên GitHub Pages

### Cách 1: Repository Cá Nhân

1. Tạo repo tên: `username.github.io`
2. Clone repo về máy
3. Copy toàn bộ file vào repo
4. Commit & Push:
```bash
git add .
git commit -m "Add anniversary website"
git push
```
5. Vào `https://username.github.io` để xem

### Cách 2: Repository Bất Kỳ

1. Tạo repo bất kỳ, ví dụ: `anniversary`
2. Copy toàn bộ file vào repo
3. Commit & Push như trên
4. Vào Settings → Pages
5. Chọn Branch: `main`, Folder: `/ (root)`
6. Vào `https://username.github.io/anniversary/` để xem

### Cách 3: Deploy Nhanh với GitHub CLI

```bash
# Clone repo
git clone https://github.com/your-username/love-anniversary

# Chuyển vào thư mục
cd love-anniversary

# Copy file vào
# (copy tất cả file index.html, style.css, script.js, assets/)

# Commit
git add .
git commit -m "Initial commit"
git push origin main

# Bật GitHub Pages tự động từ branch main
```

## 🛠️ Hỗ Trợ & Khắc Phục Sự Cố

### Ảnh Không Hiển Thị
- Kiểm tra đường dẫn file
- Đảm bảo file tồn tại trong `assets/images/`
- Thử refresh trang (Ctrl+Shift+R)

### Nhạc Không Phát
- Kiểm tra file `love.mp3` tồn tại
- Thử file mp3 khác
- Một số trình duyệt yêu cầu bấm nút 🔊 trước

### Trang Không Load
- Xóa cache trình duyệt
- Thử trình duyệt khác
- Kiểm tra console (F12) xem lỗi gì

### Hiệu Ứng Chậm
- Giảm số lượng trái tim: Thay `500` thành `1000` trong `script.js`
- Giảm số lượng confetti: Thay `50` thành `20` trong `script.js`
- Đóng các tab khác để giải phóng bộ nhớ

## 📝 License

Tự do sử dụng cho mục đích cá nhân.

---

**Tạo bởi:** ❤️ Với tình yêu
**Lần cập nhật:** 2026
