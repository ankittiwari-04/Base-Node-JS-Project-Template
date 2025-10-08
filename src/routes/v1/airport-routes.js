const express = require('express');

const { AirportController } = require('../../controllers');
const { AirportMiddlewares } = require('../../middlewares'); // requires middleware index

const router = express.Router();

// /api/v1/airports POST - with validation middleware
router.post(
  '/',
  AirportMiddlewares.validateCreateRequest,
  AirportController.createAirport
);

// /api/v1/airports GET - fetch all
router.get('/', AirportController.getAirports);

// /api/v1/airports/:id GET - fetch single airport
router.get('/:id', AirportController.getAirport);

// /api/v1/airports/:id DELETE - delete airport
router.delete('/:id', AirportController.destroyAirport);

module.exports = router;
