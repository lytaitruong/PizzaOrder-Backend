const Boom            = require('@hapi/boom')
const {Response, Time}      = require('../../util/index');
const OrderService    = require('../../service/Order.Service')
const ProductService  = require('../../service/Product.Service');
const CustomerService = require('../../service/Customer.Service');
module.exports = {
    getAllOrders: async (request, h) =>{
        try{
            const {from, to} = request.query;
            const order = await OrderService.getAllOrders(Time(from),Time(to));
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
            const id            = request.auth.credentials._id;
            const listProductId = request.payload.listOrderDetails.map(product => product._id);
            const listProduct   = await ProductService.findArray(listProductId);
            const order         = await OrderService.createOrder(id, listProduct, request.payload)
            const historyOrder  = await CustomerService.addOrder(id, order._id);
            return Response(h, order, 201)
        }catch(error){
            console.log(error);
            throw Boom.internal()
        }   
    },
    
    
    
    
    
    
    
    

}