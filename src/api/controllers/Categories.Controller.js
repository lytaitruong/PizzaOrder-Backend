const Boom              = require('@hapi/boom')
const {Response}        = require('../../util/index')
const CategoriesService = require('../../service/Categories.Service');
module.exports = {
    getCategories: async (request, h) =>{
        try{
            const categories = await CategoriesService.getCategories(request.query);
            return Response(h , categories, 200);
        }catch(error){
            console.log(error);
            throw Boom.internal()
        }
    },
    getCategory: async (request, h) =>{
        try{
            const category = await CategoriesService.getCategory(request.params.id);
            return Response(h, category, 200)
        }catch(error){
            console.log(error);
            throw Boom.internal()
        }
    },
    createCategory: async (request, h) =>{
        try{    
            const category = await CategoriesService.createCategory(request.payload);
            return Response(h, category, 201)
        }catch(error){
            console.log(error);
            throw Boom.internal()
        }
    },
    updateCategory: async (request, h) =>{
        try{
            const category = await CategoriesService.updateCategory(request.params.id, request.payload);
            return Response(h, category, 200)
        }catch(error){
            console.log(error);
            throw Boom.internal()
        }
    },
    deleteCategory: async (request, h) =>{
        try{
            const category = await CategoriesService.deleteCategory(request.params.id)
            return Response(h, category, 200);
        }catch(error){
            console.log(error);
            throw Boom.internal()
        }
    }
};