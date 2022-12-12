'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const items = [
      {
        email: 'nqtuan20@gmail.com', password: '123456', phoneNum: '0123456789', fullName: 'Nguyễn Quốc Tuấn'
        , dob: '2002-12-04', isMale: true, imageAccount: '/images/default.jpg', isAdmin: false
      },
      {
        email: 'dct20@gmail.com', password: '123456', phoneNum: '0223456789', fullName: 'Dương Chí Thông'
        , dob: '2002-06-04', isMale: false, imageAccount: '/images/default.jpg', isAdmin: false
      },
      {
        email: 'admin@gmail.com', password: 'admin', phoneNum: '0345678920', fullName: 'Nhóm 5'
        , dob: '2002-03-04', isMale: true, imageAccount: '/images/default.jpg', isAdmin: true
      },
      {
        email: 'tgt20@gmail.com', password: '123456', phoneNum: '0334567899', fullName: 'Trương Gia Tiến'
        , dob: '2002-03-29', isMale: true, imageAccount: '/images/default.jpg', isAdmin: false
      },
      {
        email: 'dnt20@gmail.com', password: '123456', phoneNum: '0425678930', fullName: 'Đặng Ngọc Tiến'
        , dob: '2002-03-25', isMale: true, imageAccount: '/images/default.jpg', isAdmin: false
      },
      {
        email: 'hienphuong2008@gmail.com', password: '123456', phoneNum: '0315627890', fullName: 'Hiền Phương'
        , dob: '2006-03-04', isMale: false, imageAccount: '/images/default.jpg', isAdmin: false
      },
      {
        email: 'nvv20@gmail.com', password: '123456', phoneNum: '0345672230', fullName: 'Nguyễn Văn Việt'
        , dob: '2002-10-04', isMale: true, imageAccount: '/images/default.jpg', isAdmin: false
      },
      {
        email: 'bhv20@gmail.com', password: '123456', phoneNum: '0234673890', fullName: 'Bùi Hoàng Vũ'
        , dob: '2002-02-12', isMale: true, imageAccount: '/images/default.jpg', isAdmin: false
      },
      {
        email: 'nav20@gmail.com', password: '123456', phoneNum: '0123671890', fullName: 'Ngô Anh Vũ'
        , dob: '2002-03-05', isMale: true, imageAccount: '/images/default.jpg', isAdmin: false
      },
      {
        email: 'vhgt20@gmail.com', password: '123456', phoneNum: '0345621230', fullName: 'Võ Hoàng Gia Tín'
        , dob: '2002-03-15', isMale: true, imageAccount: '/images/default.jpg', isAdmin: false
      }];
    items.forEach(item => {
      item.createdAt = Sequelize.literal('NOW()');
      item.updatedAt = Sequelize.literal('NOW()');
    })
    await queryInterface.bulkInsert('TaiKhoans', items, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
