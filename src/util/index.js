const Joi  = require('@hapi/joi');
const Boom = require('@hapi/boom');
module.exports = {
    OK: {
      CODE: 200,
      MESSAGE: 'OK',
    },
    NOT_FOUND: {
      CODE: 404,
      MESSAGE: 'CUSTOMER NOT FOUND!',
    },
    INVALID:{
      CODE: 400,
      MESSAGE: 'CANNOT VALIDATE CUSTOMER!',
    },
    NO_CONTENT: {
      CODE: 204,
      MESSAGE: 'NO CONTENT',
    },
    BAD_REQUEST: {
      CODE: 400,
      MESSAGE: 'BAD_REQUEST',
    },
}
module.exports.SwaggerResponse = {
    404:{
      description: 'Not Found',
      schema: Joi.object({
          statusCode: Joi.number().default(404),
          message   : Joi.string(),
          error     : Joi.string(),
      })
    },
    409:{
      description: 'It has been exist',
      schema: Joi.object({
          statusCode: Joi.number().default(409),
          message   : Joi.string(),
          error     : Joi.string(),
      })
    },
    500:{
      description: 'Internal Server Error',
      schema: Joi.object({
          statusCode: Joi.number().default(500),
          message   : Joi.string(),
          error     : Joi.string(),
      })
    }
}
module.exports.jwtValidator = Joi.object().keys({authorization: Joi.string().required()}).unknown()

module.exports.ResponseJSON = (statusCode, message, content) =>{
  return {
    statusCode,
    message,
    content,
  }
}


  