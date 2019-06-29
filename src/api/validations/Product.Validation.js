const Joi = require('@hapi/joi')
const {jwtValidator} = require('../../util')
module.exports = {
    getAllProducts: {
        query: Joi.object().keys({
            categoryId: Joi.string().default(),
            limit     : Joi.string().min(0).max(100).default(0),
            page      : Joi.string().default(1)
        })
    },
    getProduct: {
        params: Joi.object().keys({
            id: Joi.string().required().description(`Product ObjectId`)
        })
    },
    createProduct: {
        payload: Joi.object().keys({
            productName: Joi.string().required(),
            imageUri   : Joi.string().required(),
            type       : Joi.string().required(),
            description: Joi.string().required(),
            categoryId : Joi.string().required(),
            size   : Joi.object().keys({
                S: Joi.number().integer().required(),
                L: Joi.number().integer().required(),
            }),
            crust  : Joi.object().keys({
                Thin: Joi.number().integer().required(),
                Thick: Joi.number().integer().required(),
            }),
            price  : Joi.number().integer(),
            sale   : Joi.number().min(0).max(100).default(0),
            rating : Joi.number().min(0).max(5).default(0),
            topping: Joi.array().default([]),
        }),
        headers: jwtValidator
    },
    updateProduct: {
        params: Joi.object().keys({
            id  : Joi.string().required().description(`Product ObjectId`)
        }),
        payload: Joi.object().keys({
            productName: Joi.string(),
            imageUri   : Joi.string(),
            type       : Joi.string(),
            description: Joi.string(),
            categoryId : Joi.string(),
            size   : Joi.object().keys({
                S: Joi.number().integer().required(),
                L: Joi.number().integer().required(),
            }),
            crust  : Joi.object().keys({
                Thin: Joi.number().integer().required(),
                Thick: Joi.number().integer().required(),
            }),
            price  : Joi.number().integer(),
            sale   : Joi.number().min(0).max(100).default(0),
            rating: Joi.number().min(0).max(5),
            topping: Joi.array(),
        }),
        headers: jwtValidator
    },
    deleteProduct: {
        params: Joi.object().keys({
            id  : Joi.string().required().description(`Product ObjectId`)
        }),
        headers: jwtValidator
    }
}