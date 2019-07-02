const Boom              = require('@hapi/boom')
const OrderService      = require('../../service/Order.Service');
const ProductService    = require('../../service/Product.Service');
const BestSellerService = require('../../service/BestSeller.Service')
const CategoriesService = require('../../service/Categories.Service');
const {Time, Response} = require('../../util')
module.exports = {
    getBestSeller: async (request, h) =>{
        const {from, to}       = request.query;
        const listOrder        = await OrderService.getAllOrders(Time(from), Time(to));
        const listCategories   = await CategoriesService.getCategories();
        const countProduct     = BestSellerService.countProductOrder(listOrder);
        const listBestSeller   = BestSellerService.ObjectToArray(countProduct, "_id", "quantity")
        const listProduct      = await ProductService.findArray(
            listBestSeller.map(product => product._id),
            "productName type description imageUri categoryId");
        const BestSellerProduct= BestSellerService.classifyCategories(listBestSeller,listProduct,listCategories); 
        return Response(h, BestSellerProduct, 201);
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