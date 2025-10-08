'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    static associate(models) {
      // Airport belongs to City with cascade rules
      Airport.belongsTo(models.City, { 
        foreignKey: 'cityId',
        as: 'city',       // optional alias
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'  // change to RESTRICT if needed
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
        onUpdate: 'CASCADE', // updates in Cities.id cascade here
        onDelete: 'CASCADE'  // deletes in Cities.id cascade here
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
