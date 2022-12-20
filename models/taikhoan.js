'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaiKhoan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TaiKhoan.hasMany(models.VeDaDat, { foreignKey: 'accId' });
      TaiKhoan.hasMany(models.Review, { foreignKey: 'accId' });
    }
  }
  TaiKhoan.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNum: DataTypes.STRING,
    fullName: DataTypes.STRING,
    dob: DataTypes.STRING,
    isMale: DataTypes.BOOLEAN,
    imageAccount: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    isVerified: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'TaiKhoan',
  });
  return TaiKhoan;
};