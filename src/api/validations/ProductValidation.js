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
                S: Joi.number().integer().required(),
                M: Joi.number().integer().required(),
                L: Joi.number().integer().required(),
            }).required(),
            crust: Joi.object().keys({
                Thin : Joi.number().integer().required(),
                Thick: Joi.number().integer().required(),
            }).required(),
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
                S: Joi.number().integer(),
                M: Joi.number().integer(),
                L: Joi.number().integer(),
            }),
            crust: Joi.object().keys({
                Thin : Joi.number().integer(),
                Thick: Joi.number().integer(),
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