'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Seats', [
      // Airplane 1 - Business class (rows 1-2)
      { airplaneId: 1, row: 1, col: 'A', type: 'business', createdAt: new Date(), updatedAt: new Date() },
      { airplaneId: 1, row: 1, col: 'B', type: 'business', createdAt: new Date(), updatedAt: new Date() },
      { airplaneId: 1, row: 1, col: 'C', type: 'business', createdAt: new Date(), updatedAt: new Date() },
      { airplaneId: 1, row: 2, col: 'A', type: 'business', createdAt: new Date(), updatedAt: new Date() },
      { airplaneId: 1, row: 2, col: 'B', type: 'business', createdAt: new Date(), updatedAt: new Date() },
      { airplaneId: 1, row: 2, col: 'C', type: 'business', createdAt: new Date(), updatedAt: new Date() },
      
      // Airplane 1 - Premium economy (rows 3-5)
      { airplaneId: 1, row: 3, col: 'A', type: 'premium-economy', createdAt: new Date(), updatedAt: new Date() },
      { airplaneId: 1, row: 3, col: 'B', type: 'premium-economy', createdAt: new Date(), updatedAt: new Date() },
      { airplaneId: 1, row: 3, col: 'C', type: 'premium-economy', createdAt: new Date(), updatedAt: new Date() },
      { airplaneId: 1, row: 3, col: 'D', type: 'premium-economy', createdAt: new Date(), updatedAt: new Date() },
      
      // Airplane 1 - Economy (rows 6-10)
      { airplaneId: 1, row: 6, col: 'A', type: 'economy', createdAt: new Date(), updatedAt: new Date() },
      { airplaneId: 1, row: 6, col: 'B', type: 'economy', createdAt: new Date(), updatedAt: new Date() },
      { airplaneId: 1, row: 6, col: 'C', type: 'economy', createdAt: new Date(), updatedAt: new Date() },
      { airplaneId: 1, row: 6, col: 'D', type: 'economy', createdAt: new Date(), updatedAt: new Date() },
      { airplaneId: 1, row: 6, col: 'E', type: 'economy', createdAt: new Date(), updatedAt: new Date() },
      { airplaneId: 1, row: 6, col: 'F', type: 'economy', createdAt: new Date(), updatedAt: new Date() },
      
      // Airplane 2 - Business class
      { airplaneId: 2, row: 1, col: 'A', type: 'business', createdAt: new Date(), updatedAt: new Date() },
      { airplaneId: 2, row: 1, col: 'B', type: 'business', createdAt: new Date(), updatedAt: new Date() },
      { airplaneId: 2, row: 1, col: 'C', type: 'business', createdAt: new Date(), updatedAt: new Date() },
      
      // Airplane 2 - Economy
      { airplaneId: 2, row: 5, col: 'A', type: 'economy', createdAt: new Date(), updatedAt: new Date() },
      { airplaneId: 2, row: 5, col: 'B', type: 'economy', createdAt: new Date(), updatedAt: new Date() },
      { airplaneId: 2, row: 5, col: 'C', type: 'economy', createdAt: new Date(), updatedAt: new Date() },
      { airplaneId: 2, row: 5, col: 'D', type: 'economy', createdAt: new Date(), updatedAt: new Date() },
      { airplaneId: 2, row: 5, col: 'E', type: 'economy', createdAt: new Date(), updatedAt: new Date() },
      { airplaneId: 2, row: 5, col: 'F', type: 'economy', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Seats', null, {});
  }
};