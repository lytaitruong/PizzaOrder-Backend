const Joi = require('@hapi/joi')
module.exports = {
  200: data => {
    return {
      description: 'OK',
      schema: Joi.object({
        statusCode: 200,
        message: `OK`,
        data: data,
      }),
    }
  },
  201: data => {
    return {
      description: 'Create Success',
      schema: Joi.object({
        statusCode: 201,
        message: 'Create Success',
        data,
      }),
    }
  },
  400: error => {
    return {
      description: 'Bad Request',
      schema: Joi.object({
        statusCode: 400,
        message: `Bad Request`
        error: error,
      }),
    }
  },
  404: error => {
    return {
      description: 'Not Found',
      schema: Joi.object({
        statusCode: 404,
        message: `Not Found`,
        error: error,
      }),
    }
  },
  409: error =>  {
    return {
      description: 'This data is unique! Duplicate',
      schema: Joi.object({
        statusCode: 409,
        message: `Conflict data`,
        error: error,
      }),
    }
  },
  500: error => {
    return {
      description: 'Internal Server Error',
      schema: Joi.object({
        statusCode: 500,
        message: `Internal Server Error`,
        error: error,
      }),
    }
  },
}
module.exports.CODE = {
  SUCCESS: 200,
  CREATE: 201,
}

module.exports.PRODUCT = {
  ID: '_id',
  QUANTITY: 'quantity',
}
