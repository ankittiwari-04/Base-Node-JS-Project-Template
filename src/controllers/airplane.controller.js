const { ErrorResponse, SuccessResponse } = require('../utils/common');
const { Airplane } = require('../models');   // if you're using Sequelize models

// Example function to create an airplane
async function createAirplane(req, res) {
  try {
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity
    });

    SuccessResponse.data = airplane;
    return res
      .status(StatusCodes.CREATED)
      .json(SuccessResponse);

  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode)
      .json(ErrorResponse);
  }
}async function getAirplanes(req,res) {
    try{
        const airplanes=await AirplaneService.getAirplanes();
        SuccessResponse.data= airplanes;
        return res
      .status(StatusCodes.ok)
      .json(SuccessResponse);

    }catch(error){
 ErrorResponse.error = error;
    return res
      .status(error.statusCode)
      .json(ErrorResponse);
  }
        }
    


module.exports = {
  createAirplane,
  getAirplanes
};

