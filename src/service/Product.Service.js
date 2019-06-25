
const CategoriesModel = require('../models/Categories.Model');
const Boom = require('@hapi/boom')

module.exports = {
    getAllProducts: async () => {
        const listProduct = await CategoriesModel.aggregate([
            {$group: {_id: "$imageUrl", listProducts: {$addToSet: '$listProducts'}}}
        ])
        if(!listProduct){
            throw Boom.notFound(`listProduct DATA is not exist`);
        }
        return listProduct;
    },
    getProduct: async (id) => {
        const product = await CategoriesModel.findOne({"listProducts._id": id},
        {"listProducts": {$elemMatch: {'_id': id}}})
        if(!product){
            throw Boom.notFound(`Product NOT FOUND!`)
        };
        return product;
    },
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    createProduct: async ({productName, categoryId, size, crust, type, topping, star}) =>{
        const product = await CategoriesModel.findByIdAndUpdate(
            {_id: categoryId},
            {$push: {listProducts: { productName,
                                         categoryId ,
                                         size, crust, type,
                                         topping,star}}},
            {new: true}
        )
        
        if(!product){
            throw Boom.notFound()
        }
        return `CREATE SUCCESS`;
    },
    updateProduct: async (id, {productName, categoryId, size, crust, type, topping, star}) =>{        
        const product = await CategoriesModel.update(
            { _id : categoryId, "listProducts._id": id},
            {$set:  {"listProducts.$": {id,productName,categoryId,size,crust, type, topping,star}}},
            {new: true}
        )
        if(!product){
            throw Boom.notFound()
        }
        return `UPDATE SUCCESS`
    },
    deleteProduct: async (id, {categoryId}) =>{
        const product = await CategoriesModel.update(
            {_id: categoryId},
            {$pull: {'listProducts': {_id : id}}},
        )
        if(!product){
            throw Boom.notFound(`PRODUCT NOT FOUND`)
        }
        return product;
    }
}