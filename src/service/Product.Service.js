const Boom            = require('@hapi/boom')
const CategoriesModel = require('../models/Categories.Model');
module.exports = {
    getAllProducts: async () => {
        const listProduct = await CategoriesModel.aggregate([
            {$group: {_id: "AllProducts", listProduct: {$push: "$listProduct"}}},
            {"$project": {
                "listProduct": {
                    "$reduce": {
                        "input": "$listProduct",
                        "initialValue": [],
                        "in": { "$setUnion": ["$$value", "$$this"] }
                    }
                }
            }}
        ])
        return listProduct;
    },
    getProduct: async (productId) => {
        const product = await CategoriesModel.findOne({"listProduct._id": productId},
        {"listProduct": {$elemMatch: {'_id': productId}}})
        return (product) 
            ? product
            : Boom.notFound("Product")
    },
    createProduct: async (categoryId, data) =>{
        const product = await CategoriesModel.update(
            {_id: categoryId},
            {$push: {listProduct: data}}
        )
        return (product.n && product.nModified) 
            ? "CREATE SUCCESS"
            : Boom.notFound(`Category`)
    },
    updateProduct: async ({categoryId, productId}, 
                          {productName, imageUri, type, size, crust, sale, price, topping, rating}) =>{
        const data = (type === 'PIZZA')
            ? {productName, imageUri, type, size, crust, sale, rating, topping}
            : {productName, imageUri, type, price,       sale, rating, topping}
        const product = await CategoriesModel.updateOne(
            { _id : categoryId, "listProduct._id": productId},
            {$set:  {"listProduct.$": data}}
        )
        return (product.n && product.nModified)
            ? `UPDATE SUCCESS`
            : Boom.notFound(`Product`)
    },
    deleteProduct: async ({categoryId, productId}) =>{
        const product = await CategoriesModel.update(
            {_id: categoryId},
            {$pull: {'listProduct': {_id : productId}}},
        )
        return (product.n && product.nModified)
            ? `DELETE SUCCESS`
            : Boom.notFound(`Product`)
    }
}