const { StatusCodes } = require('http-status-codes');
const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { compareTime } = require('../utils/helpers/datetime-helpers');

const flightRepository = new FlightRepository();

// Create Flight
async function createFlight(data) {
    try {
        // Arrival must be after departure
        if (!compareTime(data.arrivalTime, data.departureTime)) {
            throw new AppError(
                'Arrival time cannot be before departure time',
                StatusCodes.BAD_REQUEST
            );
        }

        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        throw new AppError(
            'Cannot create a new Flight object',
            error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

// Get All Flights with filters and sort
async function getAllFlights(query) {
    try {
        let customFilter = {};

        // Filter by trips: e.g., trips=MUM-DEL
        if (query.trips) {
            const [departure, arrival] = query.trips.split('-');
            customFilter.departureAirportCode = departure;
            customFilter.arrivalAirportCode = arrival;
        }

        // Filter by price range
        if (query.minPrice || query.maxPrice) {
            customFilter.price = {};
            if (query.minPrice) customFilter.price['$gte'] = Number(query.minPrice);
            if (query.maxPrice) customFilter.price['$lte'] = Number(query.maxPrice);
        }

        // Filter by dates
        if (query.departureDate) customFilter.departureTime = { $gte: new Date(query.departureDate) };
        if (query.arrivalDate) customFilter.arrivalTime = { $lte: new Date(query.arrivalDate) };

        // Sorting
        let sortFilters = [];
        if (query.sort) {
            const params = query.sort.split(',');
            sortFilters = params.map(param => param.split('_')); // e.g., "price_ASC" -> ["price","ASC"]
        }

        const flights = await flightRepository.getAllFlights({ filter: customFilter, sort: sortFilters });
        return flights;

    } catch (error) {
        throw new AppError(
            'Cannot fetch data of all the flights',
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

module.exports = {
    createFlight,
    getAllFlights
};
