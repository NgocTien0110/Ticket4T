'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const items = [
        {
          name: 'Hà My',  
          description: 'Tuyến đường Hà Nội đi Điện Biên nổi bật với nhiều loại hình vận tải hàng hóa và phục vụ đi lại của người dân với những loại phương tiện đa dạng, dịch vụ hấp dẫn. Nổi bật nhất phải kể đến xe giường nằm- loại xe được yêu thích nhất hiện nay nhờ những dịch vụ uy tín, giá cả phải chăng. Điển hình nhất là cái tên Hà My- nhà xe uy tín và chất lượng tuyệt vời hàng đầu hiện nay.\nHà My chắc hẳn là cái tên không còn xa lạ với những ai thường xuyên di chuyển từ Điện Biên đi Hà Nội, đây là nhà xe nổi tiếng nhờ những dịch vụ hấp dẫn và lộ trình di chuyển phong phú, đa dạng\nHà My mang đến dòng xe giường nằm 41 chỗ thiết kế tinh tế, hiện đại, được trang bị những tính năng hữu ích dành cho một chuyến đi đường dài. Điều này được khẳng định rõ ràng bởi những phản hồi của hành khách về chất lượng nhà xe những năm gần đây.\nXe với thiết kế giường nằm 41 chỗ, được chia thành hai tầng với 3 dãy rộng rãi, luồng xe được thiết kế với không gian vừa phải giúp hành khách có thể thoải mái di chuyển. Trên xe có hệ thống điều hòa hai chiều đảm bảo không gian được thông thoáng, vệ sinh trên xe luôn đảm bảo sạch sẽ giúp hành khách có những trải nghiệm tuyệt vời nhất.\nNhà xe Hà My đánh giá cao những đóng góp và phản hồi của hành khách vì vậy dịch vụ và chất lượng luôn được ưu tiên hàng đầu. Đội ngũ nhân viên của Hà My là những người dày dặn kinh nghiệm, năng động, nhiệt huyết, tận tâm với khách hàng, lái xe dày dặn kinh nghiệm với những kỹ năng chuyên môn nghiệp vụ, giúp mỗi chuyến đi của hành khách được êm ái, an toàn.',
          phoneNo: ['0978 556 578', '0967 138 168'],
          address: ['số 20 Phạm Hùng, Mỹ Đình, Từ Liêm, Hà Nội.', 'quốc lộ 6, đường Trần Phú, phường Phú Lãm, quận Hà Đông, Hà Nội'],
          imageCarCom: './images/nhaxe/nxHaMy.png',
        },
        {
          name: 'Minh Phương',
          description: 'Tuyến đường Sài Gòn – Thừa Thiên Huế luôn là quãng đường phục vụ nhu cầu, đặc biệt là du lịch phổ biến. Và hôm nay, Ticket4T xin giới thiệu đến các bạn nhà xe Minh Phương, cái tên uy tín hàng đầu hoạt động trên tuyến đường này. Hãy cùng chúng tôi tìm hiểu qua về các thông tin mà nhà xe này hoạt động.\nMinh Phương là một trong những cái tên nổi bật về dịch vụ xe khách, đặc biệt là vận chuyển hàng hóa bằng xe khách. Nhà xe này được đánh giá rất tốt về thang điểm dịch vụ, dựa trên những trải nghiệm thực tế từ chính khách hàng.\nPhục vụ nhiều tuyến xe trong ngày, thuận lợi cho việc di chuyển của nhiều hành khách.Chi phí vé xe và dịch vụ vận chuyển hàng hóa luôn ở mức bình ổn.Thời gian vận chuyển đúng giờ, tiết kiệm nhiều thời gian hơn so với các đơn vị khác.',
          phoneNo: ['0902 843 799', '088 6060 605'],
          address: ['201 Tôn Đức Thắng, phường Hòa Minh, quận Liên Chiểu, thành phố Đà Nẵng', '292 Đinh Bộ Lĩnh, phường 26, quận Bình Thạnh, thành phố Hồ Chí Minh'],
          imageCarCom: './images/nhaxe/nxMinhPhuong.png'
        },
        {
          name: 'Phát Thủy',
          description: 'Bạn muốn đặt vé từ Điện Biên đi Sơn La? Bạn muốn đặt vé từ Điện Biên đi Hà Nội? Nhưng bạn không biết nên lựa chọn nhà xe khách nào? Ticket4T sẽ gửi đến bạn thông tin nhà xe Phát Thủy chạy tuyến Điện Biên đi Hà Nội và Sơn La để bạn tham khảo cho dự định của bạn nhé\nNhà xe Phát Thủy là nhà xe chuyên phục vụ tuyến Điện Biên – Hà Nội – Hà Nam và tuyến Điện Biên Sơn La. Các điểm ích lợi khi lựa chọn nhà xe bao gồm: Gối ôm, đèn đọc sách cá nhân, dây đai an toàn, nước khoáng đóng chai, chăn mềm, gối nằm, tủ lạnh mini, sạc điện thoại, điều hòa, khăn lạnh, wifi, búa phá kính phòng trường hợp khẩn cấp,…\nNhà xe Phát Thủy còn ăn điểm của khách hàng ở thái độ phục vụ của nhà xe. Nhân viên hỗ trợ khách hàng rất nhiệt tình từ lúc quý khách bắt đầu tham khảo thông tin đặt vé cho đến khi khách hàng xuống xe. Đội ngũ lái xe đường dài đầy kinh nghiệm, nhân viên phụ xe lịch sự, nhiệt tình.',
          phoneNo: ['0912 040 545', '0961 619 333'],
          address: ['Số 219, Đường Ngọc Hồi, Văn Điển, Thanh Trì, Hà Nội cách Bệnh Viện Nội Tiết', 'Số nhà 73 đường Giáp Bát (cách bến xe Giáp Bát 500m)'],
          imageCarCom: './images/nhaxe/nxPhatThuy.png'
        },
        {
          name: 'Hoàng Anh',
          description: 'Tuyến Quảng Ngãi – Lâm Đồng là một tuyến đường vô cùng hấp dẫn trong thị trường vận tải tỉnh Quảng Ngãi. Có rất nhiều nhà xe nổi tiếng đang khai thác tuyến đường nhộn nhịp này. Hôm nay, Ticket4T sẽ giới thiệu đến chúng ta một trong những nhà xe nổi bật nhất tuyến Quảng Ngãi – Lâm Đồng đó chính là nhà xe Hoàng Anh.\nNhà xe Hoàng Anh còn được mọi người biết đến với tên gọi Công ty xe khách Hoàng Anh chuyên vận chuyển hàng hoá, hành khách tuyến Quảng Ngãi – Lâm Đồng và ngược lại.\nVới phương châm làm việc: “ Đưa bạn đến chân trời mới – Đón bạn về với mái ấm”. Hoàng Anh luôn mong muốn là người bạn đồng hành cùng hành khách đến những chân trời mới, khám phá những điều tuyệt vời nhất và trải nghiệm những dịch vụ đẳng cấp nhất\nXe Hoàng Anh còn được hành khách quý như những chiến binh mạnh mẽ, ngang tàn luôn chinh phục mọi nẻo đường để hoàn thành sứ mệnh đưa đón hành khách đến nơi một cách an toàn.Đội ngũ tài xế lái xe lành nghề, có thâm niên, tay nghề vững chắc. Nhân viên của Hoàng Anh luôn làm việc hết mình, sẵn sàng giúp đỡ, giải đáp những thắc mắc mà hành khách hay gặp phải.',
          phoneNo: ['0911 555 911', '0263 3659 659'],
          address: ['26 Lê Thánh Tôn, Nghĩa Chánh Nam, Quảng Ngãi', '13/21 Phi Nôm , Huyện Đức Trọng, Tỉnh Lâm Đồng'],
          imageCarCom: './images/nhaxe/nxHoangAnh.png'
        },
        {
          name: 'Tiến Đạt',
          description: 'Thành phố Đông Hà – Quảng Trị là một trong những điểm đến thu hút khách du lịch khắp các nơi ghé đến, tại đây nhiều hoạt động giao thương diễn ra sôi nổi kéo theo nhiều dịch vụ vận tải phát triển. Để đáp ứng nhu cầu di chuyển của người dân nơi đây, nhiều nhà xe được ra đời, trong số đó phải kể đến nhà xe Tiến Đạt.\nNhà xe Tiến Đạt tự hào là một trong những nhà xe đạt chuẩn 5 sao, là một trong những nhà xe lớn mạnh, tiên tiến, đứng đầu trong các nhà xe trên địa bàn tỉnh Quảng Trị.\nPhương tiện di chuyển của nhà xe: Nhà xe sử dụng phương tiện di chuyển là xe 45 giường nằm phổ thông, giá cả cạnh tranh, chất lượng vượt trội, vận hành êm ái trên mọi cung đường.\nĐội ngũ nhân viên: Chăm chỉ, siêng năng tích cực và là những con người tận tâm, tận tụy với nghề.Nhà xe luôn đáp ứng các yêu cầu cơ bản về phòng và chống dịch bệnh covid, đảm bảo 100% đội ngũ nhân viên được tiêm ngừa đầy đủ, nhà xe luôn tuân thủ giữ khoảng cách an toàn cho mỗi hành khách.',
          phoneNo: ['0905 789 633', '0905 789 633'],
          address: ['26 Kim Đồng, Phường 2, Đông Hà, Quảng Trị', 'Số 20 đường Phạm Hùng – Mỹ Đình – Từ Liêm – Hà Nội'],
          imageCarCom: './images/nhaxe/nxTienDatThanh.png'
        }
    ];
    items.forEach(item => {
      item.createdAt = Sequelize.literal('NOW()');
      item.updatedAt = Sequelize.literal('NOW()');
    })
    await queryInterface.bulkInsert('NhaXes', items, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('NhaXes', null, {});
  }
};