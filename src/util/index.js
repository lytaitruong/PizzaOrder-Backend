const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');

module.exports.Time = (date) => {
  return new Date(date).getTime()
}
module.exports.getDate = (time) => {
  return (time) ? new Date(time).toLocaleDateString() : new Date().toLocaleDateString()
}


module.exports.jwtValidator = Joi.object().keys({
  authorization: Joi.string().required()
}).unknown()


module.exports.Response = (h, data, statusCode) => {
  return (Boom.isBoom(data)) ? data :
    h.response(data).code(statusCode)
}