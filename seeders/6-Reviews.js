'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const items = [
      {
        stars: 3,
        comment: 'Chất lượng phục vụ khá tốt, tuy nhiên suốt dọc đường xe rung lắc khá nhiều làm cho tôi cảm thấy khó chịu',
        carId: 1,
        accId: 1,
      },
      {
        stars: 5,
        comment: 'Tôi cảm thấy khá ấn tượng với dịch vụ mà nhà xe mang đến cho khách hàng, các bạn nhân viên sẵn sàng có mặt để hỗ trợ khách hàng nếu có',
        carId: 1,
        accId: 2,
      },
      {
        stars: 1,
        comment: 'Quá tệ, mặc dù chất lượng xe khá tốt nhưng chất lượng phục vụ lại không được như vậy, hơn thế nữa tài xế còn chạy rất ẩu, coi thường tính mạng của hành khách và những người trên xe',
        carId: 2,
        accId: 4,
      },
      {
        stars: 2,
        comment: 'Tôi không thể nói gì hơn ngoài 2 từ \"khủng khiếp\", tôi chưa từng đi qua nhà xe nào có chất lượng tệ đến như vậy, cạch mặt từ đây',
        carId: 2,
        accId: 7,
      },
      {
        stars: 4,
        comment: 'Ngồi xe không dằn sốc, tôi là một người hay say xe, cứ người thấy mùi xe là tôi khum chịu được, nhưng khi vào trong xe, tôi cảm thấy bình thường, không khí trong xe dễ chịu, bác tài lái xe êm, như tìm được chân lý',
        carId: 3,
        accId: 5,
      },
      {
        stars: 5,
        comment: 'Hãng làm ăn rất uy tín, thái độ tốt, nhân viên lịch sự dễ thương, giá vé xe ngày tết vừa phải, hãng không hét giá cao như một số xe khác trong khu vực',
        carId: 3,
        accId: 6,
      },
      {
        stars: 5,
        comment: 'Mình hay lên Đà Lạt bằng xe Xuân Hải lắm, nhà xe làm ăn uy tín. Luôn đưa đón đúng giờ, không lúc nào để mình phải chờ đợi, cũng có thể do mình đi nhiều lần quá rồi nên biết rõ khung giờ nhà xe xuất phát, cứ đến là xe chuẩn bị khởi hành. Nhân viên nhiệt tình, vui vẻ, giá vé phải chăng. Phù hợp với những bạn muốn đi du lịch tiết kiệm',
        carId: 3,
        accId: 1,
      },
      {
        stars: 5,
        comment: 'Mình lên xe vào ban đêm, bước lên xe lấy ngay cái chăn mà nhà xe đã chuẩn bị sẵn, cuộn tròn trong đó. Nằm chợp mắt một xíu là đến Đà Lạt, mà phải công nhận bác tài lái xe mượt thật, không có cảm giác là xe đang chạy luôn. Bác tài xứng đáng được 5 sao nha',
        carId: 4,
        accId: 8,
      },
      {
        stars: 2,
        comment: 'Chất lượng dịch vụ cũng tạm được, đáng để trải nghiệm',
        carId: 5,
        accId: 9,
      },
      {
        stars: 1,
        comment: 'Khi gọi book vé thì nhân viên tổng đài trả lời hời hợt, chất lượng xe không như những gì quảng cáo trên trang web, xe cũ, tài xế thì gắt gỏng còn phụ xe thì như không quan tâm đến hành khách, suốt cả chuyến đi như một cực hình.\nTôi sẽ không bao giờ đi xe của nhà xe này nữa.',
        carId: 5,
        accId: 10,
      },
    ];


    items.forEach(item => {
      item.createdAt = Sequelize.literal('NOW()');
      item.updatedAt = Sequelize.literal('NOW()');
    })
    await queryInterface.bulkInsert('Reviews', items, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
