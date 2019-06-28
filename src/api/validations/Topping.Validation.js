const Joi            = require('@hapi/joi')
const {jwtValidator} = require('../../util');
module.exports = {
    createTopping: {
        payload: Joi.object().keys({
            toppingName: Joi.string().required(),
            imageUri   : Joi.string().required(),
            unitPrice  : Joi.number().integer().positive().required(),
        }),
        headers: jwtValidator
    },
    updateTopping: {
        params: Joi.object().keys({
            id: Joi.string().required().description(`Topping ObjectId`)
        }),
        payload: Joi.object().keys({
            toppingName: Joi.string().required(),
            imageUri   : Joi.string().required(),
            unitPrice  : Joi.number().integer().positive().required(),
        }),
        headers: jwtValidator
    },
    deleteTopping: {
        params: Joi.object().keys({
            id: Joi.string().required().description(`Topping ObjectId`)
        }),
        headers: jwtValidator
    }
}