const Joi            = require('@hapi/joi')
const {jwtValidator} = require('../../util');
module.exports = {
    getAllToppings: {
    },
    getTopping: {
        params: Joi.object().keys({
            id: Joi.string().required().description(`Topping ObjectId`)
        })
    },
    createTopping: {
        payload: Joi.object().keys({
            name     : Joi.string().required(),
            imageUrl : Joi.string().required(),
            unitPrice: Joi.number().integer().positive().required(),
        }),
        //headers: jwtValidator
    },
    updateTopping: {
        params: Joi.object().keys({
            id: Joi.string().required().description(`Topping ObjectId`)
        }),
        payload: Joi.object().keys({
            name     : Joi.string(),
            imageUrl : Joi.string(),
            unitPrice: Joi.number().integer().positive(),
        }),
        //headers: jwtValidator
    },
    deleteTopping: {
        params: Joi.object().keys({
            id: Joi.string().required().description(`Topping ObjectId`)
        }),
        //headers: jwtValidator
    }
}