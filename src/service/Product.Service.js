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
        return listProduct;
    },
    getProduct: async (id) => {
        const product = await CategoriesModel.findOne({"listProducts._id": id},
        {"listProducts": {$elemMatch: {'_id': id}}})
        return (product) 
            ? product
            : Boom.notFound("Product")
    },
    createProduct: async ({productName, categoryId, imageUri, type, size, crust, price, sale, rating, topping}) =>{
        const data = (type === 'PIZZA')
            ? {productName, categoryId, imageUri, type, size, crust, sale, rating, topping}
            : {productName, categoryId, imageUri, type, price, sale, rating, topping}
        const product = await CategoriesModel.update(
            {_id: categoryId},
            {$push: {listProducts: { data}}}
        )
        return (product.n && product.nModified) 
            ? "CREATE SUCCESS"
            : Boom.notFound(`Category`)
    },
    updateProduct: async (id, {productName, categoryId, size, crust, type, topping, star}) =>{
        const data = (type === 'PIZZA')
            ? {productName, categoryId, imageUri, type, size, crust, sale, rating, topping}
            : {productName, categoryId, imageUri, type, price, sale, rating, topping}
        const product = await CategoriesModel.updateOne(
            { _id : categoryId, "listProducts._id": id},
            {$set:  {"listProducts.$": {data}}}
        )
        return (product.n && product.nModified)
            ? `UPDATE SUCCESS`
            : Boom.notFound(`Product`)
    },
    deleteProduct: async (id, {categoryId}) =>{
        const product = await CategoriesModel.update(
            {_id: categoryId},
            {$pull: {'listProducts': {_id : id}}},
        )
        return (product.n && product.nModified)
            ? `DELETE SUCCESS`
            : Boom.notFound(`Product`)
    }
}