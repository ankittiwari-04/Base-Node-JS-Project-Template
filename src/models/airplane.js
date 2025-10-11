'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    static associate(models) {
      Airplane.hasMany(models.Flight, {
        foreignKey: 'airplaneId',
        as: 'flights'
      });
      
      Airplane.hasMany(models.Seat, {
        foreignKey: 'airplaneId',
        as: 'seats'
      });
    }
  }

  Airplane.init({
    modelNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Airplane',
  });

  return Airplane;
};