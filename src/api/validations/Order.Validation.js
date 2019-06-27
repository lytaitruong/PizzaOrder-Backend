const Joi = require('@hapi/joi');
const {jwtValidator} = require('../../util');
module.exports = {
    getAllOrders: {
        query: Joi.object().keys({
            from: Joi.date().default('2019-01-01'),
            to  : Joi.date().default(Date.now()),
        }),
        headers: jwtValidator
    },
    getOrder: {
        params: Joi.object().keys({
            id: Joi.string().required()
        }),
        headers: jwtValidator
    },
    createOrder: {
        payload: Joi.object().keys({
            address         : Joi.string().required(),
            phoneNumber     : Joi.string().required(),
            listOrderDetails: Joi.array().not([]).required()
        }),
        headers: jwtValidator
    },
    deleteOrder: {
        params: Joi.object().keys({
            id: Joi.string().required().description(`Order ObjectId`)
        }),
        headers: jwtValidator
    }
}