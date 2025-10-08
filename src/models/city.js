'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index.js` file will call this method automatically.
     */
    static associate(models) {
      // Correct association: City has many Airports
      City.hasMany(models.Airport, {
        foreignKey: 'cityId', // should match the column name in Airport
        as: 'airports',       // optional alias for easier querying
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }
  }

  City.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      sequelize,
      modelName: 'City',
      tableName: 'Cities',
      timestamps: true
    }
  );

  return City;
};
