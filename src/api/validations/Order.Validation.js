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
      phoneNumber: Joi.string()
        .regex(/^[0-9]{10}$/)
        .required(),
      typePayment: Joi.string()
        .valid(['cash', 'visa', 'mastercard'])
        .required(),
      listOrderDetails: Joi.array().required(),
    }),
    headers: jwtValidator,
  },
  updateOrder: {
    params: Joi.object().keys({
      id: joiObjectId,
    }),
    payload: {
      address: Joi.string(),
      phoneNumber: Joi.string().regex(/^[0-9]{10}$/),
      typePayment: Joi.string().valid(['cash','visa','mastercard']),
      status: Joi.string().valid(['delivery','successed','cancelled'])
    },
    headers: jwtValidator
  },
  deleteOrder: {
    params: Joi.object().keys({
      id: joiObjectId,
    }),
    headers: jwtValidator
  },
}
