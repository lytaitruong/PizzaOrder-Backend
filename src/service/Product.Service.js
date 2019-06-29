const Boom            = require('@hapi/boom')
const ProductModel    = require('../models/Product.Model');
module.exports = {
    getAllProducts: async ({categoryId, limit, page}) => {
        const listProduct = await ProductModel.find({categoryId})
                                              .limit(limit)
                                              .skip(limit * (page -1))
                                              .sort({"productName": 1})
        return listProduct;
    },
    getProduct: async (id) => {
        const product = await ProductModel.findById(id);
        return (product)
            ? product
            : Boom.notFound(`Product`)
    },
    createProduct: async (data) =>{
        const product = await ProductModel.create(data);
        return (product)
            ? product
            : Boom.badRequest(`Product`)
    },
    updateProduct: async (id, data) =>{
        const product = await ProductModel.findByIdAndUpdate(id, {

        })
        return (product)
            ? product
            : Boom.notFound(`Product`)
    },
    deleteProduct: async ({categoryId, productId}) =>{
        const product = await ProductModel.findByIdAndDelete(id);
        return (product)
            ? product
            : Boom.notFound(`Product`)
    }
}