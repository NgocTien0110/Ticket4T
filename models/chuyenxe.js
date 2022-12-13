'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChuyenXe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ChuyenXe.belongsTo(models.NhaXe, { foreignKey: 'carId' });
      ChuyenXe.belongsTo(models.LoaiXe, { foreignKey: 'cateCarId' });
      ChuyenXe.hasMany(models.VeDaDat, { foreignKey: 'jourId' });
    }
  }
  ChuyenXe.init({
    startProvince: DataTypes.STRING,
    endProvince: DataTypes.STRING,
    startLocation: DataTypes.STRING,
    endLocation: DataTypes.STRING,
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING,
    startTime: DataTypes.STRING,
    endTime: DataTypes.STRING,
    locationImage: DataTypes.STRING,
    numSeats: DataTypes.INTEGER,
    totalNumSeats: DataTypes.INTEGER,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'ChuyenXe',
  });
  return ChuyenXe;
};