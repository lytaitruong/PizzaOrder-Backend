const Joi = require('@hapi/joi');
const {jwtValidator} = require('../../util');
module.exports = {
    getAllCustomers: {
        query: Joi.object().keys({
            top   : Joi.number().integer().positive().default(100),
            page  : Joi.number().integer().positive().default(1),
            sort  : Joi.string().default('CustomerName'),
            status: Joi.number().integer().default(1)
        }),
        headers: jwtValidator
    },
    getInfoCustomer: {
        headers: jwtValidator
    },
    signUpCustomer: {
        payload: Joi.object().keys({
            username: Joi.string().min(6).max(32).trim().required(),
            password: Joi.string().min(8).max(32).trim().required(),
            email   : Joi.string().email().min(8).trim().required()
        })
    },
    signInCustomer: {
        payload: Joi.object().keys({
            username: Joi.string().min(6).max(32).trim().required(),
            password: Joi.string().min(8).max(32).trim().required(),
        })
    },
    updateCustomer: {
        payload: Joi.object().keys({
            password: Joi.string().min(8).max(32).trim(),
            //imgUrl  : Joi.string().regex(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g),
            /**
             * Viettel 09, 03   Mobi 09, 07     Vina 09, 08     Vietnam 09,05
             * [0-0]{8} is a tails telecom company
             */
            phoneNum: Joi.number().integer(),
            address : Joi.string(),
        }),
        headers: jwtValidator
    },
    deleteCustomer: {
        headers: jwtValidator
    }
}