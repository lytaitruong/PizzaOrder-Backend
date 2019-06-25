const Joi = require('@hapi/joi');
const {jwtValidator} = require('../../util');
module.exports = {
    getAllOrders: {
        //headers: jwtValidator    
    },
    getOrder: {
        params: Joi.object().keys({
            id: Joi.string().required().description(`Order ObjectId`)
        })
        //headers: jwtValidator
    },
    createOrder: {
        payload: Joi.object().keys({
            address    : Joi.string().required(),
            coupon     : Joi.number().integer().min(0).max(100).default(0),
            listOrdersDetails: Joi.array().not([]).required()
        })
        //headers: jwtValidator
    },
    deleteOrder: {
        params: Joi.object().keys({
            id: Joi.string().required().description(`Order ObjectId`)
        })
        //headers: jwtValidator
    }
}


listOrdersDetails:[
    {
        
    }
]