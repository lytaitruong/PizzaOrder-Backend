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
            imageUri    : Joi.string().required(),
            listProduct : Joi.array().default([]),
        }),
        headers: jwtValidator
    },
    updateCategory: {
        params: Joi.object().keys({
            id: Joi.string().required().description('Categories ObjectId') 
        }),
        payload: Joi.object().keys({
            categoryName: Joi.string(),
            imageUri    : Joi.string(),
            listProduct : Joi.array(),
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