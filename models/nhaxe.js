'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NhaXe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NhaXe.hasMany(models.ChuyenXe, { foreignKey: 'carId' });
      NhaXe.hasMany(models.Review, { foreignKey: 'carId' });
    }
  }
  NhaXe.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    phoneNo: DataTypes.STRING,
    address: DataTypes.STRING,
    imageCarCom: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'NhaXe',
  });
  return NhaXe;
};