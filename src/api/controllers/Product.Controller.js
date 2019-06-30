const Boom           = require('@hapi/boom')
const {Response}     = require('../../util/index')
const ProductService = require('../../service/Product.Service');
const OrderService   = require('../../service/Order.Service');
module.exports = {
    getBestSellers: async (request, h) =>{
        const {from, to} = request.query
        const order = await OrderService.getAllOrders(getTime(from),)
    },
    getAllProducts: async (request, h) =>{
        try{
            const product = await ProductService.getAllProducts(request.query);
            return Response(h, product, 200);
        }catch(error){
            console.log(error)
            throw Boom.internal()
        }
    },
    getProduct: async (request, h) =>{
        try{
            const product = await ProductService.getProduct(request.params.id);
            return Response(h, product, 200);
        }catch(error){
            console.log(error)
            throw Boom.internal()
        }
    },
    createProduct: async (request, h) =>{
        try{
            const product = await ProductService.createProduct(request.payload);
            return Response(h, product, 201);
        }catch(error){
            console.log(error)
            throw Boom.internal()
        }
    },
    updateProduct: async (request, h) =>{
        try{
            const product = await ProductService.updateProduct(request.params.id, request.payload);
            return Response(h, product, 200);
        }catch(error){
            console.log(error)
            throw Boom.internal()
        }
    },
    deleteProduct: async (request, h) =>{
        try{
            const product = await ProductService.deleteProduct(request.params.id);
            return Response(h, product, 200);
        }catch(error){
            console.log(error)
            throw Boom.internal()
        }
    }
}