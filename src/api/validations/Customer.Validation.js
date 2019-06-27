const Joi            = require('@hapi/joi');
const {jwtValidator} = require('../../util');
module.exports = {
    getAllCustomers: {
        query: Joi.object().keys({
            limit   : Joi.number().integer().min(1).max(100).default(0),
            page    : Joi.number().integer().default(1),
        }),
        headers: jwtValidator
    },
    getInformation: {
        headers: jwtValidator
    },
    signInCustomer: {
        payload: Joi.object().keys({
            email   : Joi.string().trim().min(8).required(),
            password: Joi.string().trim().min(8).required(),
        }),
    },
    signUpCustomer: {
        payload: Joi.object().keys({
            email   : Joi.string().email().required(),
            name    : Joi.string().min(8).required(),
            password: Joi.string().min(8).required(),
            scope   : Joi.string().default('user'),
        })
    },
    signOutCustomer:{
        headers: jwtValidator
    },
    updateCustomer: {
        payload: Joi.object().keys({
            email   : Joi.string().email().min(8).trim(),
            username: Joi.string().min(8).trim(),
            password: Joi.string().min(8).trim(),
            scope   : Joi.string().trim(),
            phoneNumber: Joi.number().integer()
        }),
        headers: jwtValidator
    },
    deleteCustomer: {
        params: Joi.object().keys({
            id: Joi.string().required().description(`customer ObjectId`)
        }),
        headers: jwtValidator
    }
};
