const Joi = require('@hapi/joi')
const { jwtValidator, joiObjectId } = require('../../util')
module.exports = {
  createTopping: {
    payload: Joi.object().keys({
      toppingName: Joi.string().required(),
      imageUri: Joi.string().required(),
      unitPrice: Joi.number()
        .integer()
        .positive()
        .required(),
    }),
    headers: jwtValidator,
  },
  updateTopping: {
    params: Joi.object().keys({
      id: joiObjectId,
    }),
    payload: Joi.object().keys({
      toppingName: Joi.string().required(),
      imageUri: Joi.string().required(),
      unitPrice: Joi.number()
        .integer()
        .positive()
        .required(),
    }),
    headers: jwtValidator,
  },
  deleteTopping: {
    params: Joi.object().keys({
      id: joiObjectId,
    }),
    headers: jwtValidator,
  },
}
