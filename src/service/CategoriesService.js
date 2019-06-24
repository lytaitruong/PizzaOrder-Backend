const Boom = require('@hapi/boom')
const CategoriesModel = require('../models/CategoriesModel')
module.exports = {
    getCategories: async () =>{
        const listCategories = await CategoriesModel.find()
                                                    .sort({'categoryName': -1})
        if(!listCategories){
            throw Boom.notFound("CATEGORY NOT FOUND");
        }
        return listCategories;
    },
    getCategory: async(id) =>{
        const category = await CategoriesModel.findById(id)
                                              .select('categoryName imageUrl');
        if(!category){
            throw Boom.notFound(`CATEGORY NOT FOUND`)
        }
        return category
    },
    createCategory: async({categoryName, imageUrl, listProducts}) =>{
        const category = await CategoriesModel.create({categoryName,imageUrl,listProducts})
        if(!category){
            throw Boom.badRequest()
        }
        return category
    },
    updateCategory: async(id, {categoryName, imageUrl}) =>{
        const category =  await CategoriesModel.findByIdAndUpdate(id,{categoryName, imageUrl})
        if(!category){
            throw Boom.notFound(`CATEGORY NOT FOUND`)
        }
        return category
    },
    deleteCategory: async(id) =>{
        const category = await CategoriesModel.findOneAndDelete(id)
        if(!category){
            throw Boom.notFound(`CATEGORY NOT FOUND`)
        }
        return category
    }
}