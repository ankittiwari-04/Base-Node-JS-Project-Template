const { StatusCodes } = require('http-status-codes');
const { ErrorResponse, SuccessResponse } = require('../utils/common');
const { FlightService } = require('../services');   // ⬅️ FlightService

/**
 * POST : /flights
 * req-body {
 * flightNumber: 'UK 808',
 * airplaneId: 'a380',
 * departureAirportId: 12,
 * arrivalAirportId: 11,
 * arrivalTime: '11:10:00',
 * departureTime: '9:10:00',
 * price: 2000,
 * boardingGate: '12A',
 * totalSeats: 120
 * }
 */
async function createFlight(req, res) {
  try {
    const flight = await FlightService.createFlight({
      flightNumber: req.body.flightNumber,
      airplaneId: req.body.airplaneId,
      departureAirportId: req.body.departureAirportId,
      arrivalAirportId: req.body.arrivalAirportId,
      departureTime: req.body.departureTime,
      arrivalTime: req.body.arrivalTime,
      price: req.body.price,
      boardingGate: req.body.boardingGate,
      totalSeats: req.body.totalSeats
    });

    SuccessResponse.data = flight;
    return res
      .status(StatusCodes.CREATED)
      .json(SuccessResponse);

  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

/**
 * GET : /flights
 * Query params supported:
 *  - trips=MUM-DEL
 *  - price=2000-8000
 *  - travellers=2
 *  - tripDate=2025-10-12
 */
async function getAllFlights(req, res) {
  try {
    const flights = await FlightService.getAllFlights(req.query);

    SuccessResponse.data = flights;
    return res
      .status(StatusCodes.OK)
      .json(SuccessResponse);

  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

module.exports = {
  createFlight,
  getAllFlights
};
