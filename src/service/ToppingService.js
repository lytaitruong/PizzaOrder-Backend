const ToppingModel = require('../models/ToppingModel');
const Boom = require('@hapi/boom');
module.exports = {
    getAllToppings: async() =>{
        const listToppings = await ToppingModel.find()
                                               .sort({'name': 1});
        if(!listToppings){
            throw Boom.notFound(`Data Topping is empty`)
        };
        return listToppings
    },
    getTopping: async(id) =>{
        console.log(id);
        const topping = await ToppingModel.findById(id);
        console.log(topping);
        if(!topping){
            throw Boom.notFound(`Topping NOT FOUND`)
        }
        return topping;
    },
    createTopping: async({name, imageUrl, unitPrice}) =>{
        //Middleware
        //Check name is conflict 
        //
        const topping = await ToppingModel.create({name,imageUrl,unitPrice})
        if(!topping){
            throw Boom.notFound(`Topping NOT FOUND`)
        }
        return `CREATE SUCCESS`
    },
    updateTopping: async(id, {name, imageUrl, unitPrice}) =>{
        //Middleware conflict name
        const topping =  await ToppingModel.findOneAndUpdate(
            {_id : id},
            {$set: {name, imageUrl, unitPrice}},
            {new : true}
        )
        if(!topping){
            throw Boom.notFound(`Topping NOT FOUND`)
        }
        return `UPDATE SUCCESS`
    },
    deleteTopping: async(id) =>{
        const topping = await ToppingModel.findByIdAndDelete(id);
        if(!topping){
            throw Boom.notFound(`Topping NOT FOUND`)
        }
        return `DELETE SUCCESS`

    }
}