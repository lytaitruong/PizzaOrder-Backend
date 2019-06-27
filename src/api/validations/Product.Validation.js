const Joi = require('@hapi/joi')
const {jwtValidator} = require('../../util')
module.exports = {
    getProduct: {
        params: Joi.object().keys({
            productId: Joi.string().required().description(`Product ObjectId`)
        })
    },
    createProduct: {
        params: Joi.object().keys({
            categoryId: Joi.string().required().description(`Categories ObjectId`)
        }),
        payload: Joi.object().keys({
            productName: Joi.string().required(),
            imageUri   : Joi.string().required(),
            type       : Joi.string().required(),
            size   : {
                S: Joi.number().integer().required(),
                L: Joi.number().integer().required(),
            },
            crust  : {
                Thin: Joi.number().integer().required(),
                Thick: Joi.number().integer().required(),
            },
            price  : Joi.number().integer(),
            sale   : Joi.number().min(0).max(100).default(0),
            rating : Joi.number().min(0).max(5).required(),
            topping: Joi.array().default([]),
        }),
        headers: jwtValidator
    },
    updateProduct: {
        params: Joi.object().keys({
            categoryId : Joi.string().required().description(`Categories ObjectId`),
            productId  : Joi.string().required().description(`Product ObjectId`)
        }),
        payload: Joi.object().keys({
            productName: Joi.string(),
            imageUri   : Joi.string(),
            type       : Joi.string(),
            size   : {
                S: Joi.number().integer().required(),
                L: Joi.number().integer().required(),
            },
            crust  : {
                Thin: Joi.number().integer().required(),
                Thick: Joi.number().integer().required(),
            },
            price  : Joi.number().integer(),
            sale   : Joi.number().min(0).max(100).default(0),
            rating: Joi.number().min(0).max(5),
            topping: Joi.array(),
        }),
        headers: jwtValidator
    },
    deleteProduct: {
        params: Joi.object().keys({
            categoryId : Joi.string().required().description(`Categories ObjectId`),
            productId  : Joi.string().required().description(`Product ObjectId`)
        }),
        headers: jwtValidator
    }
}