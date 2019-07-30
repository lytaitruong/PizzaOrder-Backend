const Joi = require('@hapi/joi')
const { jwtValidator, joiObjectId } = require('../../util')
module.exports = {
  getAllCustomers: {
    query: Joi.object().keys({
      limit: Joi.number()
        .integer()
        .min(0)
        .max(100)
        .default(0),
      page: Joi.number()
        .integer()
        .default(1),
    }),
    headers: jwtValidator,
  },
  getInformation: {
    params: Joi.object().keys({
      id: joiObjectId,
    }),
    headers: jwtValidator,
  },
  signUpCustomer: {
    payload: Joi.object().keys({
      email: Joi.string()
        .min(8)
        .email({ minDomainSegments: 2 })
        .required(),
      name: Joi.string()
        .regex(/^[a-zA-Z0-9 ]{8,30}$/)
        .required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{8,30}$/)
        .required(),
      phoneNumber: Joi.string()
        .regex(/^[0-9]{10}$/)
        .required(),
    }),
  },
  updateCustomer: {
    params: Joi.object().keys({
      id: joiObjectId,
    }),
    payload: Joi.object().keys({
      name: Joi.string().regex(/^[a-zA-Z0-9 ]{8,30}$/),
      phoneNumber: Joi.string().regex(/^[0-9]{10}$/),
      scope: Joi.string().valid(['user', 'admin']),
    }),
    headers: jwtValidator,
  },
  deleteCustomer: {
    params: Joi.object().keys({
      id: joiObjectId,
    }),
    headers: jwtValidator,
  },
  signInCustomer: {
    payload: Joi.object().keys({
      email: Joi.string()
        .min(8)
        .email({ minDomainSegments: 2 })
        .required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{8,30}$/)
        .required(),
    }),
  },
  signOutCustomer: {
    headers: jwtValidator,
  },
  changePassword: {
    payload: Joi.object().keys({
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{8,30}$/)
        .required(),
      newPassword: Joi.string()
        .regex(/^[a-zA-Z0-9]{8,30}$/)
        .required(),
      autPassword: Joi.string()
        .regex(/^[a-zA-Z0-9]{8,30}$/)
        .required(),
    }),
    headers: jwtValidator,
  },
}
