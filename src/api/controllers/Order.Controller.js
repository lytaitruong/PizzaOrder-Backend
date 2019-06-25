const OrderService = require('../../service/Order.Service')
module.exports = {
    getAllOrders: async (request, h) =>{
        try{
            const listOrders = await OrderService.getAllOrders();
            return h.response(listOrders).code(200);
        }catch(error){
            throw error;
        }
    },
    getOrder: async (request, h) =>{
        try{
            const id = request.auth.credentials.id; 
            const order = await OrderService.getOrder(request.params.id);
            return h.response(order).code(200)
        }catch(error){
            throw error;
        }
    },
    createOrder: async (request, h) =>{
        try{
            const id = request.auth.credentials.id;
            const order = await OrderService.createOrder(id, request.payload);
            return h.response(order).code(201)
        }catch(error){
            throw error;
        }
    },
    deleteOrder: async (request, h) =>{
        try{
            const id = request.auth.credentials.id;
            const order = await OrderService.deleteOrder(request.params.id);
            return h.response(order).code(200);
        }catch(error){
            throw error;
        }
    }
}