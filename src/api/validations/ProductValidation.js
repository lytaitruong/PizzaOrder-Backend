const Joi = require('@hapi/joi')
const {jwtValidator} = require('../../util')
module.exports = {
    getAllProducts: {

    },
    getProduct: {
        params: Joi.object().keys({
            id: Joi.string().required().description(`Product ObjectId`)
        })
    },
    createProduct: {
        payload: Joi.object().keys({
            productName: Joi.string().required(),
            categoryId : Joi.string().required(),
            size: Joi.object().keys({
                M: Joi.number().integer().required(),
                L: Joi.number().integer().required(),
            }),
            crust: Joi.object().keys({
                Thin  : Joi.number().integer().required(),
                Medium: Joi.number().integer().required(),
            }),
            topping: Joi.array().default([]),
            star   : Joi.number().integer().min(0).max(5).default(0)
        })
        //headers: jwtValidator
    },
    updateProduct: {
        params: Joi.object().keys({
            id: Joi.string().required().description(`Product ObjectId`)
        }),
        payload: Joi.object().keys({
            productName: Joi.string(),
            categoryId : Joi.string().required(),
            size: Joi.object().keys({
                M: Joi.number().integer(),
                L: Joi.number().integer(),
            }),
            crust: Joi.object().keys({
                Thin  : Joi.number().integer(),
                Medium: Joi.number().integer(),
            }),
            topping: Joi.array(),
            star   : Joi.number().integer().min(0).max(5)
        })
        //headers: jwtValidator
    },
    deleteProduct: {
        params: Joi.object().keys({
            id: Joi.string().required().description(`Product ObjectId`)
        }),
        //headers: jwtValidator
    }
}