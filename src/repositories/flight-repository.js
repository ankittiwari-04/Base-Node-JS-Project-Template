// repositories/flight-repository.js
const Sequelize = require('sequelize');
const CrudRepository = require('./crud-repository');
const { Flight, Airplane, Airport, City } = require('../models');

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter, sort) {
        try {
            console.log('=== Starting getAllFlights ===');
            console.log('Filter:', JSON.stringify(filter));
            console.log('Sort:', JSON.stringify(sort));
            
            // First try a simple query with no includes
            const simpleTest = await Flight.findAll({ limit: 5 });
            console.log('Simple query returned:', simpleTest.length, 'flights');
            
            if (simpleTest.length > 0) {
                console.log('Sample flight:', JSON.stringify(simpleTest[0], null, 2));
            }
            
            // Now try with includes
            const response = await Flight.findAll({
                where: filter,
                order: sort,
                include: [
                    {
                        model: Airplane,
                        required: false,
                        as: 'airplane_detail',
                        attributes: ['id', 'modelNumber', 'capacity']
                    },
                    {
                        model: Airport,
                        required: false,
                        as: 'departure_airport',
                        attributes: ['id', 'name', 'code', 'cityId'],
                        include: [
                            {
                                model: City,
                                required: true,
                                as: 'city',
                                attributes: ['id', 'name']
                            }
                        ]
                    },
                    {
                        model: Airport,
                        required: false,
                        as: 'arrival_airport',
                        attributes: ['id', 'name', 'code', 'cityId'],
                        include: [
                            {
                                model: City,
                                required: true,
                                as: 'city',
                                attributes: ['id', 'name']
                            }
                        ]
                    }
                ]
            });
            
            console.log('Query with includes returned:', response.length, 'flights');
            console.log('=== End getAllFlights ===');
            
            return response;
        } catch (error) {
            console.error('Error in getAllFlights repository:', error);
            throw error;
        }
    }
}

module.exports = FlightRepository;