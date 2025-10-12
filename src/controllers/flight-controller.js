const { StatusCodes } = require('http-status-codes');
const FlightService = require('../services/flight-service');

async function createFlight(req, res) {
    try {
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats
        });
        
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Successfully created flight',
            data: flight,
            error: {}
        });
        
    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message || 'Something went wrong',
            data: {},
            error: {
                statusCode: error.statusCode,
                name: error.name,
                explanation: error.explanation
            }
        });
    }
}

async function getFlight(req, res) {
    try {
        const flight = await FlightService.getFlight(req.params.id);
        
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully fetched flight',
            data: flight,
            error: {}
        });
        
    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message || 'Something went wrong',
            data: {},
            error: {
                statusCode: error.statusCode,
                name: error.name,
                explanation: error.explanation
            }
        });
    }
}

async function getAllFlights(req, res) {
    try {
        const flights = await FlightService.getAllFlights(req.query);
        
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully fetched flights',
            data: flights,
            error: {}
        });
        
    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message || 'Something went wrong',
            data: {},
            error: {
                statusCode: error.statusCode,
                name: error.name,
                explanation: error.explanation
            }
        });
    }
}

async function updateSeats(req, res) {
    try {
        const response = await FlightService.updateSeats({
            flightId: req.body.flightId,
            seats: req.body.seats,
            dec: req.body.dec
        });
        
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully updated seats',
            data: response,
            error: {}
        });
        
    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message || 'Something went wrong',
            data: {},
            error: {
                statusCode: error.statusCode,
                name: error.name,
                explanation: error.explanation
            }
        });
    }
}

module.exports = {
    createFlight,
    getFlight,
    getAllFlights,
    updateSeats
};