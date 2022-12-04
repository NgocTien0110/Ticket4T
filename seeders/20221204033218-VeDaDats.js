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
      { numSeats: 2, totalPrice: 0, status: 'Vừa đặt', jourId: 1, accId: 1 },
      { numSeats: 1, totalPrice: 0, status: 'Đã thanh toán', jourId: 2, accId: 2 },
      { numSeats: 1, totalPrice: 0, status: 'Vừa đặt', jourId: 3, accId: 1 },
      { numSeats: 3, totalPrice: 0, status: 'Đã hủy', jourId: 4, accId: 4 },
      { numSeats: 1, totalPrice: 0, status: 'Đã thanh toán', jourId: 5, accId: 5 },
      { numSeats: 2, totalPrice: 0, status: 'Vừa đặt', jourId: 6, accId: 6 },
      { numSeats: 3, totalPrice: 0, status: 'Đã thanh toán', jourId: 7, accId: 1 },
      { numSeats: 5, totalPrice: 0, status: 'Vừa đặt', jourId: 8, accId: 8 },
      { numSeats: 2, totalPrice: 0, status: 'Đã hủy', jourId: 9, accId: 9 },
      { numSeats: 3, totalPrice: 0, status: 'Đã thanh toán', jourId: 10, accId: 10 },
      { numSeats: 4, totalPrice: 0, status: 'Vừa đặt', jourId: 1, accId: 4 },
      { numSeats: 1, totalPrice: 0, status: 'Đã hủy', jourId: 2, accId: 5 },
      { numSeats: 2, totalPrice: 0, status: 'Đã thanh toán', jourId: 2, accId: 2 },
      { numSeats: 3, totalPrice: 0, status: 'Vừa đặt', jourId: 6, accId: 1 },
      { numSeats: 2, totalPrice: 0, status: 'Đã thanh toán', jourId: 5, accId: 5 }];
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
