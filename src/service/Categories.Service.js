const Boom            = require('@hapi/boom')
const CategoriesModel = require('../models/Categories.Model')
module.exports = {
    getCategories: async () =>{
        const listCategories = await CategoriesModel.find()
                                                    .select('categoryName imageUri')
                                                    .sort({'categoryName': 1})
        return listCategories
    },
    getCategory: async(id) =>{
        const category = await CategoriesModel.findById(id).select('categoryName imageUri')
        return (category)   ? category
                            : Boom.notFound("Category")
    },
    createCategory: async({categoryName, imageUri, listProduct}) =>{
        const category = await CategoriesModel.create({categoryName,imageUri,listProduct})
        return (category)   ? category
                            : Boom.badRequest("Category")
    },
    updateCategory: async(id, {categoryName, imageUri}) =>{
        const category =  await CategoriesModel.findByIdAndUpdate(id,{categoryName,imageUri})
        return (category)   ? category
                            : Boom.notFound("Category")
    },
    deleteCategory: async(id) =>{
        const category = await CategoriesModel.findByIdAndDelete(id);
        return (category) 
            ? category
            : Boom.notFound(`Category`); 
    }
}