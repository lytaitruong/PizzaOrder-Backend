const ProductService = require('../../service/ProductService');
module.exports = {
    getAllProducts: async (request, h) =>{
        try{
            const listProducts = await ProductService.getAllProducts();
            return h.response(listProducts).code(200);
        }catch(error){
            throw error
        }
    },
    getProduct: async (request, h) =>{
        try{
            const product = await ProductService.getProduct(request.params.id);
            return h.response(product).code(200)
        }catch(error){
            throw error;
        }
    },
    createProduct: async (request, h) =>{
        try{
            const product = await ProductService.createProduct(request.payload);
            return h.response(product).code(201)
        }catch(error){
            throw error;
        }
    },
    updateProduct: async (request, h) =>{
        try{
            console.log(`HERE`);
            const product = await ProductService.updateProduct(request.params.id, request.payload);
            return h.response(product).code(200)
        }catch(error){
            throw error
        }
    },
    deleteProduct: async (request, h) =>{
        try{
            const product = await ProductService.deleteProduct(request.params.id,request.payload);
            return h.response(product).code(200)
        }catch(error){
            throw error
        }
    }
}