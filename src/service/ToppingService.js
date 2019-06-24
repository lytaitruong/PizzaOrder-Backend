const ToppingModel = require('../models/ToppingModel');
const Boom = require('@hapi/boom');
module.exports = {
    getAllToppings: async() =>{
        const listToppings = await ToppingModel.find()
                                               .sort({'name': -1});
        if(!listToppings){
            throw Boom.notFound(`TOPPINGS NOT FOUND`)
        }
        return listToppings
    },
    createTopping: async({name, imageUrl, unitPrice}) =>{
        const topping = await ToppingModel.create({name,imageUrl,unitPrice})
        if(!topping){
            throw Boom.badRequest()
        }
        return topping;
    },
    updateTopping: async(id, {name, imageUrl, unitPrice}) =>{
        const topping = await ToppingModel.findByIdAndUpdate(id, {name, imageUrl, unitPrice})
        if(!topping){
            throw Boom.notFound(`TOPPINGS NOT FOUND`)
        }
        return topping;
    },
    deleteTopping: async(id) =>{
        const topping = await ToppingModel.findByIdAndDelete(id);
        if(!topping){
            throw Boom.notFound(`TOPPINGS NOT FOUND`)
        }
        return topping
    }
}