const express = require('express');

const { AirplaneController } = require('../../controllers');
const { AirplaneMiddlewares } = require('../../middlewares'); // Requires middleware index

const router = express.Router();

// /api/v1/airplanes POST - Includes validation middleware
router.post(
    '/', 
    AirplaneMiddlewares.validateCreateRequest,
    AirplaneController.createAirplane
);

router.get('/', AirplaneController.getAirplanes);
router.get('/:id', AirplaneController.getAirplane);
router.delete('/:id', AirplaneController.destroyAirplane);

module.exports = router;