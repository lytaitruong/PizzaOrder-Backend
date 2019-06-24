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
            username: Joi.string().trim().min(8).required(),
            password: Joi.string().trim().min(8).required()
        }),
    },
    signUpCustomer: {
        payload: Joi.object().keys({
            username: Joi.string().trim().min(8).required(),
            password: Joi.string().trim().min(8).required(),
            email   : Joi.string().email().trim().required(),
            scope   : Joi.string().default('user'),
        })
    },
    signOutCustomer:{
        headers: jwtValidator
    },
    updateCustomer: {
        payload: Joi.object().keys({
            email   : Joi.string().email().min(8).trim(),
            username: Joi.string().min(3).trim(),
            password: Joi.string().min(8).trim(),
            scope   : Joi.string().trim()
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
