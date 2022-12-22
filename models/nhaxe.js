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
  NhaXe.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      phoneNo: DataTypes.ARRAY(DataTypes.STRING),
      address: DataTypes.ARRAY(DataTypes.STRING),
      policy: DataTypes.TEXT,
      mainRoute: DataTypes.ARRAY(DataTypes.STRING),
      // startTime: DataTypes.ARRAY(DataTypes.STRING),
      // numOfTrip: DataTypes.STRING,
      // ticketPrice: DataTypes.ARRAY(DataTypes.STRING),
      stars: DataTypes.FLOAT,
      imageCarCom: DataTypes.STRING,
      imageJours: DataTypes.ARRAY(DataTypes.STRING),
    },
    {
      sequelize,
      modelName: "NhaXe",
    }
  );
  return NhaXe;
};