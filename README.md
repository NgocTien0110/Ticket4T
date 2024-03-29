# Đồ án phát triển ứng dụng web
## Các thành viên:
- 20127634 - Dương Chí Thông
- 20127641 - Đặng Ngọc Tiến
- 20127643 - Trương Gia Tiến
- 20127659 - Nguyễn Quốc Tuấn

<br>

# Hệ thống bán vé xe khách
## Yêu cầu chung
    ● Xây dựng ứng dụng Web trên nền tảng node.js, sử dụng framework Express
    ● Giao diện sử dụng Bootstrap hoặc các UI framework tương đương
    ● Cơ sở dữ liệu Postgres hoặc MongoDB
    ● Phân hệ quản trị được sử dụng template có sẵn
    ● Tham khảo: https://vexere.com/ 

## Yêu cầu chức năng

### Phân hệ người dùng cuối
    ● Tìm kiếm vé xe khách theo tuyến và ngày. Ví dụ: Sài Gòn - Đà Lạt, Hà Nội - Sapa, Đà Nẵng Huế…
    ● Đặt chỗ theo chuyến xe, mỗi đặt chỗ có thể có nhiều ghế. Gửi thông tin đặt chỗ qua email hoặc SMS
    ● Lọc tìm kiếm theo ít nhất 3 tiêu chí: Nhà xe, loại xe
    ● Thông tin chuyến xe:
        ○ Nhà xe. Ví dụ: Thành Bưởi, Phương Trang…
        ○ Điểm bắt đầu. Ví dụ: Bến xe miền Đông, Bến xe miền Tây, Bến xe Giáp Bát, Bến xe Mỹ Đình…
        ○ Điểm kết thúc
        ○ Thời gian khởi hành: Ngày + giờ:phút. Ví dụ: Ngày 12/11/2022 15:00
        ○ Thời gian đến nơi
        ○ Tổng thời gian hành trình
        ○ Hình ảnh xe
        ○ Mô tả/Chính sách
        ○ Số lượng ghế
        ○ Loại xe: Ghế ngồi, giường nằm, limousine…
        ○Giá vé
    ● Thông tin nhà xe: 
        ○ Tên
        ○ Hình ảnh
        ○ Đánh giá của khách đã sử dụng dịch vụ (dạng bình luận + đánh giá sao)
        ○ Số điện thoại liên lạc
    ● Thông tin đặt chỗ, sau khi đặt chỗ được tạo ra, ghế và số lượng ghế trên chuyến xe phải được tính toán lại, đảm bảo đủ chỗ trên chuyến xe
        ○ Mã vé
        ○ Chuyến xe
        ○ Số lượng ghế
        ○ Thông tin liên lạc: Họ tên, email, điện thoại
        ○ Tổng tiền
        ○ Tình trạng: Vừa đặt, Đã thanh toán, Đã hủy. Đặt chỗ đã hủy không còn được tính trong chuyến xe.
    ● Tài khoản người dùng: Đăng ký và kích hoạt tài khoản bằng email hoặc SMS, đăng nhập, quên mật khẩu
    ● Xem lịch sử đặt vé
### Phân hệ quản trị
    ● Đăng nhập bằng tài khoản riêng
    ● Quản lý nhà xe: Xem, thêm, xóa, sửa
    ● Quản lý chuyến xe: Thêm, xóa, sửa
    ● Quản lý đặt chỗ: Xem, sửa
## Chức năng cộng điểm
    ● Hỗ trợ nhiều điểm khởi hành, kết thúc và chức năng tìm kiếm có khả năng tìm được chuyến xe giữa chặng. Ví dụ: Hà Nội - Sân bay Nội Bài - Sapa => xe có thể bắt thêm khách ở sân bay, thời điểm khởi hành từ sân bay sau thời điểm khởi hành đầu tiên tại Hà Nội
    ● Đặt chỗ theo sơ đồ, cho phép chọn ghế khi đặt chỗ
    ● Nhiều hạng giá vé theo vị trí chỗ ngồi
    ● Tự động nhân bản chuyến xe dựa vào chuyến đã có (phân hệ quản trị)
    ● Tài khoản riêng cho nhà xe, phân quyền quản lý (phân hệ quản trị)
    ● Thanh toán qua cổng thanh toán Momo, ZaloPay, Paypal, OnePay (sử dụng tài khoản sandbox)
    ● Sử dụng AJAX để tải thêm tự động thông tin
    ● In vé PDF đính kèm email
## Yêu cầu dữ  liệu
    ● Cần có ít nhất 10 chuyến xe thuộc 4-5 nhà xe, 3-4 loại xe, có nội dung mô tả và hình ảnh minh hoạ đầy đủ
    ● Thông tin nhà xe có thông tin đánh giá và bình luận đầy đủ
## Yêu cầu phi chức năng
    ●Giao diện phải đạt được đạt được mức gần thành phẩm, không chấp nhận giao diện không phù hợp UX
    ● Đồ án (git) phải thể hiện được quá trình làm việc, cộng tác đồng đều của toàn bộ thành viên. Không chấp nhận các lý do không dùng, lỗi git… Nếu không chứng minh được quá trình làm việc thể bị trừ đến 50% điểm toàn án
