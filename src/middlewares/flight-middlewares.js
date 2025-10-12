const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');

function validateCreateRequest(req, res, next) {
  if (!req.body.flightNumber) {
    ErrorResponse.message = "Something went wrong while creating flight";
    ErrorResponse.error = { explanation: "Flight number not found in the request body" };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.airplaneId) {
    ErrorResponse.message = "Something went wrong while creating flight";
    ErrorResponse.error = { explanation: "Airplane ID not found in the request body" };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.departureAirportId) {
    ErrorResponse.message = "Something went wrong while creating flight";
    ErrorResponse.error = { explanation: "Departure Airport ID not found in the request body" };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.arrivalAirportId) {
    ErrorResponse.message = "Something went wrong while creating flight";
    ErrorResponse.error = { explanation: "Arrival Airport ID not found in the request body" };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.departureTime) {
    ErrorResponse.message = "Something went wrong while creating flight";
    ErrorResponse.error = { explanation: "Departure time not found in the request body" };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.arrivalTime) {
    ErrorResponse.message = "Something went wrong while creating flight";
    ErrorResponse.error = { explanation: "Arrival time not found in the request body" };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.price) {
    ErrorResponse.message = "Something went wrong while creating flight";
    ErrorResponse.error = { explanation: "Price not found in the request body" };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.boardingGate) {
    ErrorResponse.message = "Something went wrong while creating flight";
    ErrorResponse.error = { explanation: "Boarding gate not found in the request body" };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.totalSeats) {
    ErrorResponse.message = "Something went wrong while creating flight";
    ErrorResponse.error = { explanation: "Total seats not found in the request body" };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

function validateUpdateSeatsRequest(req, res, next) {
  console.log('Received body:', req.body);
  
  if (!req.body.flightId) {
    ErrorResponse.message = "Something went wrong while updating seats";
    ErrorResponse.error = { explanation: "Flight ID not found in the request body" };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.seats) {
    ErrorResponse.message = "Something went wrong while updating seats";
    ErrorResponse.error = { explanation: "Number of seats not found in the request body" };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (typeof req.body.dec !== 'boolean') {
    ErrorResponse.message = "Something went wrong while updating seats";
    ErrorResponse.error = { explanation: "dec must be a boolean value (true or false)" };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

module.exports = {
  validateCreateRequest,
  validateUpdateSeatsRequest
};