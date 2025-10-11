
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

        console.log('Custom Filter:', customFilter);
        console.log('Sort Filter:', sortFilter);

        const flights = await flightsRepository.getAllFlights(customFilter, sortFilter);
        
        console.log('Flights found:', flights.length);
        
        return flights;
        
    } catch (error) {
        console.error('Error in getAllFlights:', error);
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError(
            `Cannot fetch data of all the flights: ${error.message}`, 
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

module.exports = {
    createFlight,
    getAllFlights
};