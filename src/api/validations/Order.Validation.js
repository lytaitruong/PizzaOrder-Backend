const Joi = require('@hapi/joi')
const { jwtValidator, joiObjectId, getDate } = require('../../util')
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
      id: joiObjectId,
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
