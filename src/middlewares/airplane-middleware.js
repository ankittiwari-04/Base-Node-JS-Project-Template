const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next) {
    if (!req.body.modelNumber) {
        // Create a new error response object
        const errorResponse = { 
            message: 'Something went wrong while creating airplane',
            error: new AppError(['Model Number not found in the incoming request in the correct form'])
        };
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(errorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest
};
