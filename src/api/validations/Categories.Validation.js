const Joi = require('@hapi/joi')
const { jwtValidator, joiObjectId } = require('../../util')
module.exports = {
  getCategory: {
    params: Joi.object().keys({
      id: joiObjectId,
    }),
  },
  createCategory: {
    payload: Joi.object().keys({
      categoryName: Joi.string().required(),
      imageUri: Joi.string().required(),
    }),
    headers: jwtValidator,
  },
  updateCategory: {
    params: Joi.object().keys({
      id: joiObjectId,
    }),
    payload: Joi.object().keys({
      categoryName: Joi.string().required(),
      imageUri: Joi.string().required(),
    }),
    headers: jwtValidator,
  },
  deleteCategory: {
    params: Joi.object().keys({
      id: joiObjectId,
    }),
    headers: jwtValidator,
  },
}
