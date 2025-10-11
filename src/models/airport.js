// models/airport.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    static associate(models) {
      Airport.belongsTo(models.City, {
        foreignKey: 'cityId',
        as: 'city'
      });
      
      Airport.hasMany(models.Flight, {
        foreignKey: 'departureAirportId',
        as: 'departing_flights'
      });
      
      Airport.hasMany(models.Flight, {
        foreignKey: 'arrivalAirportId', 
        as: 'arriving_flights'
      });
    }
  }

  Airport.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Airport',
  });

  return Airport;
};