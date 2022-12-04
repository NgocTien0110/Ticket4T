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
      {
        name: "Minh Phương",
        imagePath: [
          "/images/chuyenxe/minh-phuong-1",
          "/images/chuyenxe/minh-phuong-2",
          "/images/chuyenxe/minh-phuong-3",
        ],
      },
      {
        name: "Phương Trang",
        imagePath: [
          "/images/chuyenxe/phuong-trang-1",
          "/images/chuyenxe/phuong-trang-2",
          "/images/chuyenxe/phuong-trang-3",
        ],
      },
      {
        name: "Hà My",
        imagePath: [
          "/images/chuyenxe/ha-my-1",
          "/images/chuyenxe/ha-my-2",
          "/images/chuyenxe/ha-my-3",
        ],
      },
      {
        name: "Hoàng Anh",
        imagePath: [
          "/images/chuyenxe/hoang-anh-1",
          "/images/chuyenxe/hoang-anh-2",
          "/images/chuyenxe/hoang-anh-3",
        ],
      },
      {
        name: "Tiến Đạt",
        imagePath: [
          "/images/chuyenxe/tien-dat-1",
          "/images/chuyenxe/tien-dat-2",
          "/images/chuyenxe/tien-dat-3",
        ],
      },
    ];

    items.forEach((item) => {
      item.createdAt = Sequelize.literal("NOW()");
      item.updatedAt = Sequelize.literal("NOW()");
    });

    await queryInterface.bulkInsert("AnhChuyenXes", items, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("AnhChuyenXes", null, {});
  },
};
