const Joi = require('@hapi/joi')
module.exports = {
    200:{
      description: 'OK',
      schema: Joi.object({
          statusCode: Joi.number().default(200),
          message   : Joi.string(),
          data      : Joi.string(),
      })
    },
    201:{
      description: 'Create Success',
      schema: Joi.object({
          statusCode: Joi.number().default(201),
          message   : Joi.string(),
          data      : Joi.string(),
      })
    },
    400:{
      description: 'Bad Request',
      schema: Joi.object({
          statusCode: Joi.number().default(400),
          message   : Joi.string(),
          data      : Joi.string(),
      })
    },
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