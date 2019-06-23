const Boom = require('@hapi/boom')
const CategoriesModel = require('../models/CategoriesModel')
module.exports = {
    getCategories: async () =>{
        const listCategories = await CategoriesModel.find()
                                                    .select('categoryName imageUrl')
                                                    .limit(10)
                                                    .sort({'categoryName': 1})
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
    createCategory: async({categoryName, imageUrl, listProduct}) =>{
        // if(await CategoriesModel.findOne({categoryName: this.categoryName})){
        //     throw Boom.conflict('This categoryName have been exist')
        // }
        const category = await new CategoriesModel({
            categoryName,
            imageUrl,
            listProduct
        }).save()
        if(!category){
            throw Boom.internal()
        }
        return category
    },
    updateCategory: async(id, {categoryName, imageUrl}) =>{
        // if(await CategoriesModel.findOne({categoryName: this.getUpdate().$set.categoryName})){
        //     throw Boom.conflict('This categoryName have been exist')
        // }
        const category =  await CategoriesModel.findOneAndUpdate(
            {_id : id},
            {$set: {categoryName, imageUrl}},
            {new: true}
        ).select('categoryName imageUrl')
        if(!category){
            throw Boom.notFound(`CATEGORY NOT FOUND`)
        }
        return category;
    },
    deleteCategory: async(id) =>{
        const category = await CategoriesModel.findOneAndDelete({_id: id})
                                              .select('categoryName imageUrl')
        if(!category){
            throw Boom.notFound(`CATEGORY NOT FOUND`)
        }
        return category
    }
}