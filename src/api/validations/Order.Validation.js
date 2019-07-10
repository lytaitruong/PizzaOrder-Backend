const Joi = require('@hapi/joi')
const { jwtValidator, joiObjectId, getDate } = require('../../util')
const orderDetails = Joi.object().keys({
  productName: Joi.string(),
  imageUri: Joi.string(),
  type: Joi.string(),
  description: Joi.string(),
  categoryId: joiObjectId,
  sale: Joi.number()
    .min(0)
    .max(100)
    .default(0),
  rating: Joi.number()
    .min(0)
    .max(5),
  topping: Joi.array(),
})
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
      listOrderDetails: Joi.array().items(orderDetails),
    }),
    headers: jwtValidator,
  },
  updateOrder: {
    params: Joi.object().keys({
      id: joiObjectId
    }),
    payload: Joi.object().keys({

    }),
    headers: jwtValidator
  },
  deleteOrder: {
    params: Joi.object().keys({
      id: joiObjectId,
    }),
  },
}
