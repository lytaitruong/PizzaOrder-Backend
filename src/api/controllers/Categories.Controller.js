const CategoriesService = require('../../service/Categories.Service');
module.exports = {
    getCategories: async (request, h) =>{
        try{
            const listCategories = await CategoriesService.getCategories();
            return h.response(listCategories).code(200)
        }catch(error){
            throw error
        }
    },
    getCategory: async (request, h) =>{
        try{
            const categories = await CategoriesService.getCategory(request.params.id);
            return h.response(categories).code(201)
        }catch(error){
            throw error
        }
    },
    createCategory: async (request, h) =>{
        try{    
            const categories = await CategoriesService.createCategory(request.payload);
            return h.response(categories).code(200)
        }catch(error){
            throw error
        }
    },
    updateCategory: async (request, h) =>{
        try{
            const categories = await CategoriesService.updateCategory(request.params.id, request.payload);
            return h.response(categories).code(200)
        }catch(error){
            throw error
        }
    },
    deleteCategory: async (request, h) =>{
        try{
            const categories = await CategoriesService.deleteCategory(request.params.id)
            return h.response(categories).code(200)
        }catch(error){
            throw error;
        }
    }
};