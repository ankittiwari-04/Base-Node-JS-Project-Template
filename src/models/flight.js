'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    static associate(models) {
      // Associations
      Flight.belongsTo(models.Airplane, { foreignKey: 'airplaneId' });
      Flight.belongsTo(models.Airport, { foreignKey:  'departureAirportId', foreignKey: 'departureAirportId' });
      Flight.belongsTo(models.Airport, { foreignKey:  'arrivalAirportId', foreignKey: 'arrivalAirportId' });
    }
  }

  Flight.init(
    {
      flightNumber: {
        type: DataTypes.STRING,
        allowNull: false,  // required
        unique: true
      },
      airplaneId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      departureAirportId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      arrivalAirportId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      departureTime: {
        type: DataTypes.DATE,
        allowNull: false
      },
      arrivalTime: {
        type: DataTypes.DATE,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      boardingGate: {
        type: DataTypes.STRING,
        allowNull: false
      },
      totalSeats: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Flight',
     
    }
  );

  return Flight;
};
