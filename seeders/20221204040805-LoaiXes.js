"use strict";

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
      { name: "ghế ngồi" },
      { name: "giường nằm" },
      { name: "giường nằm đôi" },
      { name: "limousine" },
    ];

    items.forEach((item) => {
      item.createAt = Sequelize.literal("NOW()");
      item.updateAt = Sequelize.literal("NOW()");
    });
    await queryInterface.bulkInsert("LoaiXes", items, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
