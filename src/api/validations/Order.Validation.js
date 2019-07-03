const Joi = require('@hapi/joi')
const { jwtValidator, getDate } = require('../../util')
module.exports = {
  getAllOrders: {
    query: Joi.object().keys({
      from: Joi.date().default(getDate('01-01-2019')),
      to: Joi.date().default(getDate()),
    }),
    headers: jwtValidator,
  },
  getOrder: {
    params: Joi.object().keys({
      id: Joi.string()
        .required()
        .description(`Order ObjectId`),
    }),
    headers: jwtValidator,
  },
  createOrder: {
    payload: Joi.object().keys({
      address: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      typePayment: Joi.string().required(),
      listOrderDetails: Joi.array().required(),
    }),
    headers: jwtValidator,
  },
}
