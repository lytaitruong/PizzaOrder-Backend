const Joi = require('@hapi/joi')
module.exports = {
  200: {
    description: 'OK',
    schema: Joi.object({
      statusCode: 200,
      message: Joi.string(),
      data: Joi.string(),
    }),
  },
  201: {
    description: 'Create Success',
    schema: Joi.object({
      statusCode: 201,
      message: Joi.string(),
      data: Joi.string(),
    }),
  },
  400: {
    description: 'Bad Request',
    schema: Joi.object({
      statusCode: 400,
      message: Joi.string(),
      data: Joi.string(),
    }),
  },
  404: {
    description: 'Not Found',
    schema: Joi.object({
      statusCode: 404,
      message: Joi.string(),
      error: Joi.string(),
    }),
  },
  409: {
    description: 'This data is unique! Duplicate',
    schema: Joi.object({
      statusCode: 409,
      message: Joi.string(),
      error: Joi.string(),
    }),
  },
  500: {
    description: 'Internal Server Error',
    schema: Joi.object({
      statusCode: 500,
      message: Joi.string(),
      error: Joi.string(),
    }),
  },
}
module.exports.CODE = {
  SUCCESS: 200,
  CREATE: 201,
}
