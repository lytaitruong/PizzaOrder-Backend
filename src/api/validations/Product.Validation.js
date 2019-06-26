const Joi = require('@hapi/joi')
const {jwtValidator} = require('../../util')
module.exports = {
    getProduct: {
        params: Joi.object().keys({
            id: Joi.string().required().description(`Product ObjectId`)
        })
    },
    createProduct: {
        payload: Joi.object().keys({
            productName: Joi.string().required(),
            categoryId : Joi.string().required(),
            imageUri   : Joi.string().required(),
            type       : Joi.string().required(),
            size: Joi.object().keys({
                S: Joi.number().integer().required(),
                L: Joi.number().integer().required(),
            }),
            crust: Joi.object().keys({
                Thin  : Joi.number().integer().required(),
                Thick : Joi.number().integer().required(),
            }),
            price  : Joi.number().integer(),
            sale   : Joi.number().min(0).max(100).required(),
            rating : Joi.number().min(0).max(5).required(),
            topping: Joi.array().default([]),
        }),
        headers: jwtValidator
    },
    updateProduct: {
        params: Joi.object().keys({
            id: Joi.string().required().description(`Product ObjectId`)
        }),
        payload: Joi.object().keys({
            productName: Joi.string(),
            categoryId : Joi.string().required(),
            imageUri   : Joi.string(),
            type       : Joi.string(),
            size: Joi.object().keys({
                M: Joi.number().integer(),
                L: Joi.number().integer(),
            }),
            crust: Joi.object().keys({
                Thin  : Joi.number().integer(),
                Medium: Joi.number().integer(),
            }),
            price  : Joi.number().integer(),
            sale   : Joi.number().min(0).max(100),
            ratting: Joi.number().min(0).max(5),
            topping: Joi.array(),
        }),
        headers: jwtValidator
    },
    deleteProduct: {
        params: Joi.object().keys({
            id: Joi.string().required().description(`Product ObjectId`)
        }),
        headers: jwtValidator
    }
}