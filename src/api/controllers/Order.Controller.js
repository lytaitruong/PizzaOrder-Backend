const Boom              = require('@hapi/boom')
const {Response}          = require('../../util/index');
const OrderService      = require('../../service/Order.Service')
const ProductService    = require('../../service/Product.Service');
module.exports = {
    getAllOrders: async (request, h) =>{
        try{
            const order = await OrderService.getAllOrders(request.query);
            return Response(h, order, 200)
        }catch(error){
            console.log(error);
            throw Boom.internal()
        }
    },
    getOrder: async (request, h) =>{
        try{
            const order = await OrderService.getOrder(request.params.id);
            return Response(h, order, 200);
        }catch(error){
            console.log(error);
            throw Boom.internal()
        }
    },
    createOrder: async (request, h) =>{
        try{
            const id = request.auth.credentials._id;
            const order = await OrderService.createOrder(id, request.payload);
            return Response(h, order, 201)
        }catch(error){
            console.log(error);
            throw Boom.internal()
        }
    },
    deleteOrder: async (request, h) =>{
        try{
            const order = await OrderService.deleteOrder(request.params.id);
            return Response(h, order, 200);
        }catch(error){
            console.log(error);
            throw Boom.internal()
        }
    }
}