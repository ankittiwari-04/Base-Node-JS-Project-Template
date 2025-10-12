const { Op } = require('sequelize');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const FlightsRepository = require('../repositories/flight-repository');

const flightsRepository = new FlightsRepository();

async function createFlight(data) {
    try {
        const flight = await flightsRepository.create(data);
        return flight;
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError(
            'Cannot create a new flight object',
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function getFlight(id) {
    try {
        const flight = await flightsRepository.get(id);
        return flight;
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError('Flight not found', StatusCodes.NOT_FOUND);
        }
        throw new AppError(
            'Cannot fetch flight data',
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function getAllFlights(query) {
    try {
        let customFilter = {};
        let sortFilter = [];
        
        if (query.trips) {
            const [departure, arrival] = query.trips.split('-');
            const airportMap = {
                'DEL': 5,  
                'BOM': 6,  
                'BLR': 7,  
                'HYD': 8   
            };

            if (!airportMap[departure] || !airportMap[arrival]) {
                throw new AppError('Invalid airport code in trips parameter', StatusCodes.BAD_REQUEST);
            }

            customFilter.departureAirportId = airportMap[departure];
            customFilter.arrivalAirportId = airportMap[arrival];
        }

        if (query.price) {
            const [minPrice, maxPrice] = query.price.split('-').map(Number);
            customFilter.price = {
                [Op.between]: [minPrice || 0, maxPrice || 999999]
            };
        }

        if (query.sort) {
            const params = query.sort.split(',');
            const sortFilters = params.map((param) => param.split('_'));
            sortFilter = sortFilters;
        }

        const flights = await flightsRepository.getAllFlights(customFilter, sortFilter);
        return flights;
        
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError(
            `Cannot fetch data of all the flights: ${error.message}`, 
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function updateSeats(data) {
    try {
        const response = await flightsRepository.updateRemainingSeats(
            data.flightId, 
            data.seats, 
            data.dec
        );
        return response;
    } catch (error) {
        throw new AppError(
            'Cannot update seats',
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

module.exports = {
    createFlight,
    getFlight,
    getAllFlights,
    updateSeats
};