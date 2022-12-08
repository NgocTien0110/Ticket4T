'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VeDaDat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      VeDaDat.belongsTo(models.ChuyenXe, { foreignKey: 'jourId' });
      VeDaDat.belongsTo(models.TaiKhoan, { foreignKey: 'accId' });
    }
  }
  VeDaDat.init({
    numSeats: DataTypes.INTEGER,
    statusTicket: DataTypes.STRING,
    fullName: DataTypes.STRING,
    phoneNum: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'VeDaDat',
  });
  return VeDaDat;
};