'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("NhaXes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      phoneNo: {
        type: Sequelize.ARRAY(DataTypes.STRING),
      },
      address: {
        type: Sequelize.ARRAY(DataTypes.STRING),
      },
      policy: {
        type: Sequelize.TEXT,
      },
      mainRoute: {
        type: Sequelize.ARRAY(DataTypes.STRING),
      },
      startTime: {
        type: Sequelize.ARRAY(DataTypes.STRING),
      },
      numOfTrip: {
        type: Sequelize.STRING,
      },
      ticketPrice: {
        type: Sequelize.ARRAY(DataTypes.STRING),
      },
      stars: {
        type: Sequelize.FLOAT,
      },
      imageCarCom: {
        type: Sequelize.STRING,
      },
      imageJours: {
        type: Sequelize.ARRAY(DataTypes.STRING),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('NhaXes');
  }
};