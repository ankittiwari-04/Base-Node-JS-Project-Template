const express = require('express');
const router = express.Router();
const airplaneController = require('../../controllers/airplane.controller');

router.post('/airplanes', airplaneController.createAirplane);


module.exports = router;
