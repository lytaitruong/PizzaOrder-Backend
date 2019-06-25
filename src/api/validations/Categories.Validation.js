const Joi = require('@hapi/joi');
const {jwtValidator} = require('../../util');
module.exports = {
    getCategory: {
        params: Joi.object().keys({
            id: Joi.string().required().description('Categories ObjectId') 
        })
    },
    createCategory: {
        payload: Joi.object().keys({
            categoryName: Joi.string().required(),
            imageUrl    : Joi.string().required(),
            listProducts: Joi.array().default([]),
            star        : Joi.number().integer().default(5)
        }),
        headers: jwtValidator
    },
    updateCategory: {
        params: Joi.object().keys({
            id: Joi.string().required().description('Categories ObjectId') 
        }),
        payload: Joi.object().keys({
            categoryName: Joi.string(),
            imageUrl    : Joi.string(),
            listProducts: Joi.array(),
        }),
        headers: jwtValidator
    },
    deleteCategory: {
        params: Joi.object().keys({
            id: Joi.string().required().description('Categories ObjectId') 
        }),
        headers: jwtValidator
    }
};