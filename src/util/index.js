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
  return data ? h.response(data).code(statusCode) : Boom.badRequest(`Invalid Params ID`)
}
module.exports.HandlerError = err => {
  console.log(err)
  const { code } = err
  if (code) {
    switch (err.code) {
      case 11000:
        throw Boom.conflict('This data have been exist')
    }
  }
  throw Boom.internal()
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
