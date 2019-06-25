const ToppingService = require('../../service/Topping.Service');
module.exports = {
    getAllToppings: async (request, h) =>{
        try{
            const listToppings = await ToppingService.getAllToppings();
            return h.response(listToppings).code(200)
        }catch(error){
            throw error
        }
    },
    createTopping: async (request, h) =>{
        try{
            const topping = await ToppingService.createTopping(request.payload)
            return h.response(topping).code(201)
        }catch(error){
            throw error
        }
    },
    updateTopping: async (request, h) =>{
        try{
            const topping = await ToppingService.updateTopping(request.params.id, request.payload)
            return h.response(topping).code(200)
        }catch(error){
            throw error;
        }
    },
    deleteTopping: async (request, h) =>{
        try{
            const topping = await ToppingService.deleteTopping(request.params.id)
            return h.response(topping).code(200);
        }catch(error){
            throw error
        }
    }
}