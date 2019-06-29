const ToppingModel = require('../models/Topping.Model');
const Boom = require('@hapi/boom');
module.exports = {
    getAllToppings: async() =>{
        const listToppings = await ToppingModel.find()
                                               .sort({'toppingName': 1});
        return listToppings;
    },
    createTopping: async({toppingName, imageUri, unitPrice}) =>{
        const topping = await ToppingModel.create({toppingName,imageUri,unitPrice})
        return (topping)
            ? topping
            : Boom.badRequest(`Topping`)
    },
    updateTopping: async(id, {toppingName, imageUri, unitPrice}) =>{
        const topping = await ToppingModel.findByIdAndUpdate(id, {toppingName, imageUri, unitPrice})
        return (topping)
            ? topping
            : Boom.notFound(`Topping`)
    },
    deleteTopping: async(id) =>{
        const topping = await ToppingModel.findByIdAndDelete(id);
        return (topping)
            ? topping
            : Boom.notFound(`Topping`);
    }
}