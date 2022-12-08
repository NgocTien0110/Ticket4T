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
        numSeats: 2, statusTicket: 'Vừa đặt', email: "nqtuan20@gmail.com",
        phoneNum: "0123456789", fullName: "Nguyễn Quốc Tuấn", jourId: 1, accId: 1
      },
      {
        numSeats: 1, statusTicket: 'Đã thanh toán', email: "dct20@gmail.com",
        phoneNum: "0223456789", fullName: "Dương Chí Thông", jourId: 2, accId: 2
      },
      {
        numSeats: 1, statusTicket: 'Vừa đặt', email: "nqtuan20@gmail.com",
        phoneNum: "0123456789", fullName: "Nguyễn Quốc Tuấn", jourId: 3, accId: 1
      },
      {
        numSeats: 3, statusTicket: 'Đã hủy', email: "tgt20@gmail.com",
        phoneNum: "0334567899", fullName: "Trương Gia Tiến", jourId: 4, accId: 4
      },
      {
        numSeats: 1, statusTicket: 'Đã thanh toán', email: "dnt20@gmail.com",
        phoneNum: "0425678930", fullName: "Đặng Ngọc Tiến", jourId: 5, accId: 5
      },
      {
        numSeats: 2, statusTicket: 'Vừa đặt', email: "hienphuong2008@gmail.com",
        phoneNum: "0315627890", fullName: "Hiền Phương", jourId: 6, accId: 6
      },
      {
        numSeats: 3, statusTicket: 'Đã thanh toán', email: "nqtuan20@gmail.com",
        phoneNum: "0123456789", fullName: "Nguyễn Quốc Tuấn", jourId: 7, accId: 1
      },
      {
        numSeats: 5, statusTicket: 'Vừa đặt', email: "bhv20@gmail.com",
        phoneNum: "0234673890", fullName: "Bùi Hoàng Vũ", jourId: 8, accId: 8
      },
      {
        numSeats: 2, statusTicket: 'Đã hủy', email: "hienphuong2008@gmail.com",
        phoneNum: "0315627890", fullName: "Hiền Phương", jourId: 9, accId: 6
      },
      {
        numSeats: 3, statusTicket: 'Đã thanh toán', email: "vhgt20@gmail.com",
        phoneNum: "0345621230", fullName: "Võ Hoàng Gia Tín", jourId: 10, accId: 10
      },
      {
        numSeats: 4, statusTicket: 'Vừa đặt', email: "tgt20@gmail.com",
        phoneNum: "0334567899", fullName: "Trương Gia Tiến", jourId: 1, accId: 4
      },
      {
        numSeats: 1, statusTicket: 'Đã hủy', email: "dnt20@gmail.com",
        phoneNum: "0425678930", fullName: "Đặng Ngọc Tiến", jourId: 2, accId: 5
      },
      {
        numSeats: 2, statusTicket: 'Đã thanh toán', email: "dct20@gmail.com",
        phoneNum: "0223456789", fullName: "Dương Chí Thông", jourId: 2, accId: 2
      },
      {
        numSeats: 3, statusTicket: 'Vừa đặt', email: "nqtuan20@gmail.com",
        phoneNum: "0123456789", fullName: "Nguyễn Quốc Tuấn", jourId: 6, accId: 1
      },
      {
        numSeats: 2, statusTicket: 'Đã thanh toán', email: "dnt20@gmail.com",
        phoneNum: "0425678930", fullName: "Đặng Ngọc Tiến", jourId: 5, accId: 5
      }];
    items.forEach(item => {
      item.createdAt = Sequelize.literal('NOW()');
      item.updatedAt = Sequelize.literal('NOW()');
    })
    await queryInterface.bulkInsert('VeDaDats', items, {});
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
