'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Airports', { // table name is case-sensitive
      fields: ['cityId'], // column to add constraint on
      type: 'foreign key',
      name: 'city_fk_constraint', // optional: name of the constraint
      references: {
        table: 'Cities', // target table
        field: 'id'      // target column
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Airports', 'city_fk_constraint');
  }
};
