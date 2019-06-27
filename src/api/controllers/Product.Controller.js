const Boom           = require('@hapi/boom')
const {Response}     = require('../../util/index')
const ProductService = require('../../service/Product.Service');
module.exports = {
    getAllProducts: async (request, h) =>{
        try{
            const listProducts = await ProductService.getAllProducts();
            return Response(h, listProducts, 200);
        }catch(error){
            console.log(error)
            throw Boom.internal()
        }
    },
    getProduct: async (request, h) =>{
        try{
            const product = await ProductService.getProduct(request.params.productId);
            return Response(h, product, 200);
        }catch(error){
            console.log(error)
            throw Boom.internal()
        }
    },
    createProduct: async (request, h) =>{
        try{
            const product = await ProductService.createProduct(request.params.categoryId, request.payload);
            return Response(h, product, 201);
        }catch(error){
            console.log(error)
            throw Boom.internal()
        }
    },
    updateProduct: async (request, h) =>{
        try{
            const product = await ProductService.updateProduct(request.params, request.payload);
            return Response(h, product, 200);
        }catch(error){
            console.log(error)
            throw Boom.internal()
        }
    },
    deleteProduct: async (request, h) =>{
        try{
            const product = await ProductService.deleteProduct(request.params, request.payload);
            return Response(h, product, 200);
        }catch(error){
            console.log(error)
            throw Boom.internal()
        }
    }
}