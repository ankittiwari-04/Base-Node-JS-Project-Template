const { Airport } = require('../models');

class AirportRepository {
  async createAirport(data) {
    try {
      const airport = await Airport.create(data);
      return airport;
    } catch (error) {
      throw error;
    }
  }

  async getAirports() {
    try {
      const airports = await Airport.findAll();
      return airports;
    } catch (error) {
      throw error;
    }
  }

  async getAirport(id) {
    try {
      const airport = await Airport.findByPk(id);
      return airport;
    } catch (error) {
      throw error;
    }
  }

  async destroyAirport(id) {
    try {
      const result = await Airport.destroy({
        where: { id }
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AirportRepository;
