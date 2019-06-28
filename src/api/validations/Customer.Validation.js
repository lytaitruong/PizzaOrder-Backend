const Joi            = require('@hapi/joi');
const {jwtValidator} = require('../../util');
module.exports = {
    getAllCustomers: {
        query: Joi.object().keys({
            limit   : Joi.number().integer().positive().max(100).default(0),
            page    : Joi.number().integer().default(1),
        }),
        headers: jwtValidator
    },
    getInformation: {
        params: Joi.object().keys({
            id: Joi.string().required().description(`customer ObjectId`)
        }),
        headers: jwtValidator
    },
    signUpCustomer: {
        payload: Joi.object().keys({
            email   : Joi.string().min(8).required().email(),
            name    : Joi.string().min(8).required(),
            password: Joi.string().min(8).required(),
        })
    },
    updateCustomer: {
        params : Joi.object().keys({
            id : Joi.string().required().description(`customer ObjectId`)
        }),
        payload: Joi.object().keys({
            name       : Joi.string().min(8),
            phoneNumber: Joi.string().min(8),
            scope      : Joi.string(),
        }),
        headers: jwtValidator
    },
    deleteCustomer: {
        params: Joi.object().keys({
            id: Joi.string().required().description(`customer ObjectId`)
        }),
        headers: jwtValidator
    },
    signInCustomer: {
        payload: Joi.object().keys({
            email   : Joi.string().trim().min(8).required(),
            password: Joi.string().trim().min(8).required(),
        }),
    },
    signOutCustomer:{
        headers: jwtValidator
    },
    changePassword: {
        payload: Joi.object().keys({
            password   : Joi.string().trim().min(8).required(),
            newPassword: Joi.string().trim().min(8).required(),
            autPassword: Joi.string().trim().min(8).required(),
        }),
        headers: jwtValidator
    }
};
