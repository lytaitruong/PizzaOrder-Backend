const Joi = require('@hapi/joi')
const Boom = require('@hapi/boom')
Joi.objectID = require('joi-objectid')(Joi)
module.exports.Time = date => {
  return new Date(date).getTime()
}
module.exports.getDate = time => {
  return time ? new Date(time).toLocaleDateString() : new Date().toLocaleDateString()
}
module.exports.Response = (h, data, statusCode) => {
  return Boom.isBoom(data) ? data : h.response(data).code(statusCode)
}
module.exports.HandlerError = (err, h) => {
  console.log(err)
  if (err.name === 'MongoError') {
    switch (err.code) {
      case 11000:
        throw Boom.conflict('This data have been exist')
      default:
        throw Boom.internal()
    }
  }
}

module.exports.joiObjectId = Joi.objectID()
  .required()
  .description(`ObjectId`)

module.exports.jwtValidator = Joi.object()
  .keys({
    authorization: Joi.string().required(),
  })
  .description('This action must be authenticate before!')
  .unknown()
