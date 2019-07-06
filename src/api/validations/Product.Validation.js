const Joi = require('@hapi/joi')
const { jwtValidator, joiObjectId, getDate } = require('../../util')
module.exports = {
  getBestSeller: {
    query: Joi.object().keys({
      from: Joi.date().default(getDate('01-01-2019')),
      to: Joi.date().default(getDate()),
    }),
  },
  getAllProducts: {
    query: Joi.object().keys({
      categoryId: Joi.string().default(),
      limit: Joi.number()
        .integer()
        .default(0),
      page: Joi.number()
        .integer()
        .default(1),
    }),
  },
  getProduct: {
    params: Joi.object().keys({
      id: joiObjectId,
    }),
  },
  createProduct: {
    payload: Joi.object().keys({
      productName: Joi.string().required(),
      imageUri: Joi.string().required(),
      type: Joi.string().required(),
      description: Joi.string().required(),
      categoryId: Joi.string().required(),
      size: Joi.object().keys({
        S: Joi.number()
          .integer()
          .required(),
        L: Joi.number()
          .integer()
          .required(),
      }),
      crust: Joi.object().keys({
        Thin: Joi.number()
          .integer()
          .required(),
        Thick: Joi.number()
          .integer()
          .required(),
      }),
      price: Joi.number().integer(),
      sale: Joi.number()
        .min(0)
        .max(100)
        .default(0),
      rating: Joi.number()
        .min(0)
        .max(5)
        .default(0),
      topping: Joi.array().default([]),
    }),
    headers: jwtValidator,
  },
  updateProduct: {
    params: Joi.object().keys({
      id: joiObjectId,
    }),
    payload: Joi.object().keys({
      productName: Joi.string(),
      imageUri: Joi.string(),
      type: Joi.string(),
      description: Joi.string(),
      categoryId: Joi.string(),
      size: Joi.object().keys({
        S: Joi.number()
          .integer()
          .required(),
        L: Joi.number()
          .integer()
          .required(),
      }),
      crust: Joi.object().keys({
        Thin: Joi.number()
          .integer()
          .required(),
        Thick: Joi.number()
          .integer()
          .required(),
      }),
      price: Joi.number().integer(),
      sale: Joi.number()
        .min(0)
        .max(100)
        .default(0),
      rating: Joi.number()
        .min(0)
        .max(5),
      topping: Joi.array(),
    }),
    headers: jwtValidator,
  },
  deleteProduct: {
    params: Joi.object().keys({
      id: joiObjectId,
    }),
    headers: jwtValidator,
  },
}
