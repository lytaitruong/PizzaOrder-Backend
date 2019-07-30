const Joi = require('@hapi/joi')
Joi.objectID = require('joi-objectid')(Joi)
const Time = date => {
  return new Date(date).getTime()
}
const getDate = time => {
  return time ? new Date(time).toLocaleDateString() : new Date().toLocaleDateString()
}

const joiObjectId = Joi.objectID()
  .required()
  .description(`ObjectId`)

const jwtValidator = Joi.object()
  .keys({
    authorization: Joi.string().required(),
  })
  .description('This action must be authenticate before!')
  .unknown()

module.exports = {
  Time,
  getDate,
  joiObjectId,
  jwtValidator,
}
