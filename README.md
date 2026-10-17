# Kết nối tri thức

Trang web tự học 6 tháng để chuẩn bị phỏng vấn xin việc, dựng từ tài liệu «Подготовка к работе»: Toán ứng dụng; Vật lý ứng dụng và tin học; UAV và xử lý ảnh; AI, vệ tinh và dữ liệu vũ trụ; Ngôn ngữ (Anh, Trung, Nga); kỹ năng nghiên cứu sinh; chuẩn bị phỏng vấn.

Trang tĩnh thuần HTML/CSS/JavaScript, không cần máy chủ, không cần cài đặt. Mở `index.html` bằng trình duyệt là dùng được ngay; đưa lên GitHub Pages để học trên mọi thiết bị.

## Có gì bên trong

- **133 môn học** chia theo cấp Бакалавриат, Магистратура, Аспирантура và công cụ. Mỗi môn có tên Nga, Việt, Anh; chủ đề chính; trọng tâm ôn phỏng vấn; số giờ ước tính.
- **Khoảng 1 200 tài liệu**: sách, giáo trình miễn phí, khoá học, video YouTube, RuTube, VK Video, bài giảng, tạp chí, công cụ, nguồn dữ liệu. Link video và khoá học được kiểm tra tồn tại vào tháng 10/2026. Sách bản in mở tìm kiếm trên Google Sách.
- **Nút tìm nhanh** cho từng môn trên YouTube, RuTube, VK Видео, Stepik, Coursera, КиберЛенинка, Google Scholar, arXiv, Хабр (với tiếng Trung có thêm Bilibili).
- **Lộ trình tự sinh** theo ngày phỏng vấn, số giờ mỗi tuần, các hướng ưu tiên; xuất sang lịch `.ics` (Google Calendar, lịch điện thoại); in được.
- **131 thẻ câu hỏi phỏng vấn** (tiếng Nga) với ôn tập lặp ngắt quãng; **phỏng vấn thử** có hẹn giờ, đọc câu hỏi thành tiếng, ghi âm câu trả lời để tự nghe lại; thêm được thẻ của riêng bạn.
- **Theo dõi tiến độ**: trạng thái từng môn, tự chấm sao, đánh dấu tài liệu đã xem, yêu thích, ghi chú theo môn (xuất Markdown), đồng hồ Pomodoro tự ghi thời gian học, lịch nhịp học 26 tuần, biểu đồ radar mức tự tin.
- Giao diện sáng/tối, dùng tốt trên điện thoại, phím tắt (`/` tìm kiếm, `?` xem danh sách phím tắt).

## Đưa lên GitHub Pages

1. Tạo repository mới trên GitHub, ví dụ `ketnoi-tri-thuc` (để Public).
2. Bấm **Add file → Upload files**, kéo toàn bộ nội dung thư mục này vào (gồm `index.html`, thư mục `assets`, `README.md`, `.nojekyll`), bấm **Commit changes**.
   Tệp `.nojekyll` bắt đầu bằng dấu chấm nên Windows Explorer có thể ẩn; nếu không tải lên được cũng không sao, trang vẫn chạy.
3. Vào **Settings → Pages**, mục *Build and deployment* chọn *Deploy from a branch*, Branch `main`, thư mục `/ (root)`, bấm **Save**.
4. Sau 1–2 phút trang có địa chỉ `https://<tên-tài-khoản>.github.io/ketnoi-tri-thuc/`.

## Dữ liệu tiến độ được lưu ở đâu

Trong trình duyệt bạn đang dùng (`localStorage`, khoá `ktt-state-v1`). Không có máy chủ, không gửi dữ liệu đi đâu. Mỗi trình duyệt, mỗi thiết bị có tiến độ riêng: dùng nút cài đặt ở góc phải trên để **xuất tệp sao lưu** rồi **nhập** ở máy khác. Xoá dữ liệu duyệt web sẽ xoá tiến độ, nên hãy sao lưu định kỳ.

## Cấu trúc tệp

```
index.html            khung trang
assets/style.css      giao diện
assets/app.js         toàn bộ chức năng
assets/data.js        hướng học, môn học, tài liệu gốc
assets/data-extra.js  link video, khoá học đã kiểm chứng
assets/cards.js       thẻ câu hỏi phỏng vấn
assets/favicon.svg    biểu tượng
```

## Tự thêm hoặc sửa tài liệu

- Nhanh nhất: mở một môn, phần **Thêm link của bạn vào môn này** (chỉ lưu trong trình duyệt của bạn).
- Thêm vĩnh viễn cho mọi thiết bị: sửa `assets/data.js`, trong mảng `r` của môn thêm một dòng
  `['youtube', 'Tên video', 'https://…', 'ru', 'Ghi chú ngắn'],`
  Loại có thể là `course`, `youtube`, `rutube`, `vk`, `free`, `notes`, `book`, `paper`, `site`, `tool`, `data`, `practice`, `journal`, `law`, `job`. Sách bản in để url là `''`.
- Thêm câu hỏi phỏng vấn: sửa `assets/cards.js`, mỗi thẻ có `id` không trùng, `t` (mã hướng: `math`, `phys`, `uav`, `ai`, `lang`, `research`, `career`), `s` (mã môn), `q`, `a`.

Sau khi sửa, tải tệp mới lên GitHub (Upload files, ghi đè) là trang cập nhật.

## Lưu ý về link

Link có thể đổi theo thời gian (đặc biệt RuTube, khoá học trả phí, văn bản pháp luật). Nếu link nào hỏng, dùng các nút «Tìm thêm» trong môn đó. Một số khoá (Arzamas, Nature Masterclasses, Sketch Engine, Coursera có chứng chỉ) cần đăng ký hoặc trả phí; ghi chú cạnh link có nói rõ. Các văn bản pháp luật Nga về UAV và hoạt động vũ trụ được để dạng liên kết tìm kiếm để luôn mở bản đang có hiệu lực.
