'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    static associate(models) {
      // Airport belongs to City with cascade rules
      Airport.belongsTo(models.City, { 
        foreignKey: 'cityId',
        as: 'city',       
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'  
      });

      // Airport has many flights as departure airport
      Airport.hasMany(models.Flight, {
        foreignKey: 'departureAirportId',
        as: 'departingFlights',   
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

      // Airport has many flights as arrival airport
      Airport.hasMany(models.Flight, {
        foreignKey: 'arrivalAirportId',
        as: 'arrivingFlights',    
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }
  }

  Airport.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      address: {
        type: DataTypes.STRING,
        unique: true
      },
      cityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Cities', // table name
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    },
    {
      sequelize,
      modelName: 'Airport',
      tableName: 'Airports',
      timestamps: true
    }
  );

  return Airport;
};
