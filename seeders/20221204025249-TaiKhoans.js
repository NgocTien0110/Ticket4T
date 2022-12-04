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
        , dob: '2002-12-04', sex: 'Nam', imageAccount: '/images/accImageDefault.png', accountType: 'user'
      },
      {
        email: 'dct20@gmail.com', password: '123456', phoneNum: '0223456789', fullName: 'Dương Chí Thông'
        , dob: '2002-06-04', sex: 'Nữ', imageAccount: '/images/accImageDefault.png', accountType: 'user'
      },
      {
        email: 'admin4T@gmail.com', password: 'admin4T', phoneNum: '0345678920', fullName: 'Nhóm 5'
        , dob: '2002-03-04', sex: 'Nam', imageAccount: '/images/accImageDefault.png', accountType: 'admin'
      },
      {
        email: 'tgt20@gmail.com', password: '123456', phoneNum: '0334567899', fullName: 'Trương Gia Tiến'
        , dob: '2002-03-29', sex: 'Nam', imageAccount: '/images/accImageDefault.png', accountType: 'user'
      },
      {
        email: 'dnt20@gmail.com', password: '123456', phoneNum: '0425678930', fullName: 'Đặng Ngọc Tiến'
        , dob: '2002-03-25', sex: 'Nam', imageAccount: '/images/accImageDefault.png', accountType: 'user'
      },
      {
        email: 'hienphuong2008@gmail.com', password: '123456', phoneNum: '0315627890', fullName: 'Hiền Phương'
        , dob: '2006-03-04', sex: 'Nữ', imageAccount: '/images/accImageDefault.png', accountType: 'user'
      },
      {
        email: 'nvv20@gmail.com', password: '123456', phoneNum: '0345672230', fullName: 'Nguyễn Văn Việt'
        , dob: '2002-10-04', sex: 'Nam', imageAccount: '/images/accImageDefault.png', accountType: 'user'
      },
      {
        email: 'bhv20@gmail.com', password: '123456', phoneNum: '0234673890', fullName: 'Bùi Hoàng Vũ'
        , dob: '2002-02-12', sex: 'Nam', imageAccount: '/images/accImageDefault.png', accountType: 'user'
      },
      {
        email: 'nav20@gmail.com', password: '123456', phoneNum: '0123671890', fullName: 'Ngô Anh Vũ'
        , dob: '2002-03-05', sex: 'Nam', imageAccount: '/images/accImageDefault.png', accountType: 'user'
      },
      {
        email: 'vhgt20@gmail.com', password: '123456', phoneNum: '0345621230', fullName: 'Võ Hoàng Gia Tín'
        , dob: '2002-03-15', sex: 'Nam', imageAccount: '/images/accImageDefault.png', accountType: 'user'
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
