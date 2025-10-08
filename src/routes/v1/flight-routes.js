const express = require('express');

const { FlightController } = require('../../controllers');
const { FlightMiddlewares } = require('../../middlewares');

const router = express.Router();

// /api/v1/flights POST - create a new flight
router.post(
  '/',
  FlightMiddlewares.validateCreateRequest,
  FlightController.createFlight
);

// /api/v1/flights GET - fetch all flights
router.get(
  '/',
  FlightController.getAllFlights
);

module.exports = router;
