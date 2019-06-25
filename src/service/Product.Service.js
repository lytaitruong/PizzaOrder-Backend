
const Boom            = require('@hapi/boom')
const CategoriesModel = require('../models/Categories.Model');
module.exports = {
    getAllProducts: async () => {
        const listProduct = await CategoriesModel.aggregate([
            {$group: {_id: "AllProducts", listProducts: {$push: "$listProducts"}}},
            {"$project": {
                "listProducts": {
                    "$reduce": {
                        "input": "$listProducts",
                        "initialValue": [],
                        "in": { "$setUnion": ["$$value", "$$this"] }
                    }
                }
            }}
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
    createProduct: async ({productName, categoryId, size, crust, type, topping, star}) =>{
        const product = await CategoriesModel.update(
            {_id: categoryId},
            {$push: {listProducts: { productName,
                                     categoryId ,
                                     size, crust, type,
                                     topping,star}}},
        )
        if(!product.n && ! product.nModified){
            throw Boom.notFound(`CATEGORY NOT FOUND`);
        }
        return `CREATE SUCCESS`;
    },
    updateProduct: async (id, {productName, categoryId, size, crust, type, topping, star}) =>{        
        const product = await CategoriesModel.updateOne(
            { _id : categoryId, "listProducts._id": id},
            {$set:  {"listProducts.$": {productName, 
                                        categoryId, 
                                        size, crust, type, 
                                        topping, star}}}
        )
        if(!product.n && !product.nModified){
            throw Boom.notFound(`CATEGORY NOT FOUND`)
        }
        return `UPDATE SUCCESS`
    },
    deleteProduct: async (id, {categoryId}) =>{
        const product = await CategoriesModel.update(
            {_id: categoryId},
            {$pull: {'listProducts': {_id : id}}},
        )
        if(!product.n && !product.nModified){
            throw Boom.notFound(`CATEGORY NOT FOUND`)
        }
        return `DELETE SUCCESS`;
    }
}