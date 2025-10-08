const CrudRepository = require('./crud-repository');
const { Flight } = require('../models');

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }

  // filter = { field: value }, sort = [["field", "ASC"], ["field2", "DESC"]]
  async getAllFlights({ filter = {}, sort = [] }) {
    try {
      // Convert empty sort to default if needed
      const order = sort.length ? sort : [['departureTime', 'ASC']];

      const response = await Flight.findAll({
        where: filter,
        order: sort
      });

      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = FlightRepository;
