const express = require('express');
const router = express.Router();

const flightRoutes = require('./flight-routes');
const airplaneRoutes = require('./airplane-routes');
const airportRoutes = require('./airport-routes');
const cityRoutes = require('./city-routes');

router.use('/flights', flightRoutes);
router.use('/airplanes', airplaneRoutes);
router.use('/airports', airportRoutes);
router.use('/cities', cityRoutes);

module.exports = router;