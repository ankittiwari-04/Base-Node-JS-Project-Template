'use strict';
const {
  Model
} = require('sequelize');
const { SEAT_CLASS } = require('../utils/common/enums');

module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      Seat.belongsTo(models.Airplane, {
        foreignKey: 'airplaneId',
      
      });
    }
  }
  Seat.init({
    airplaneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    row: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    col: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: Object.values(SEAT_CLASS),
      allowNull: false,
      defaultValue: SEAT_CLASS.ECONOMY
    }
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};