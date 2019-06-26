const ToppingModel = require('../models/Topping.Model');
const Boom = require('@hapi/boom');
module.exports = {
    getAllToppings: async() =>{
        const listToppings = await ToppingModel.find()
                                               .sort({'name': -1});
        return listToppings;
    },
    createTopping: async({name, imageUri, unitPrice}) =>{
        const topping = await ToppingModel.create({name,imageUri,unitPrice})
        return (topping)
            ? topping
            : Boom.badRequest(`Topping`)
    },
    updateTopping: async(id, {name, imageUri, unitPrice}) =>{
        const topping = await ToppingModel.findByIdAndUpdate(id, {name, imageUri, unitPrice})
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