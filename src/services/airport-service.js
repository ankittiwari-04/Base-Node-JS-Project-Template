const { StatusCodes } = require('http-status-codes');
const { AirportRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const airportRepository = new AirportRepository();

// Create airport
async function createAirport(data) {
  try {
    const airport = await airportRepository.create(data);
    return airport;
  } catch (error) {
    throw new AppError(
      'Cannot create a new Airport object',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

// Get all airports
async function getAirports() {
  try {
    const airports = await airportRepository.getAll();
    return airports;
  } catch (error) {
    throw new AppError(
      'Cannot fetch data of all the airports',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

// Get single airport
async function getAirport(id) {
  try {
    const airport = await airportRepository.get(id);
    return airport;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError('The airport you requested is not present', error.statusCode);
    }
    throw new AppError(
      'Cannot fetch data of the airport',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

// Destroy airport
async function destroyAirport(id) {
  try {
    const response = await airportRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError('The airport you want to delete is not present', error.statusCode);
    }
    throw new AppError(
      'Cannot delete the airport',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createAirport,
  getAirports,
  getAirport,
  destroyAirport
};
