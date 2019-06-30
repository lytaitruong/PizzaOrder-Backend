const Boom         = require('@hapi/boom')
const ProductModel = require('../models/Product.Model');
const {productDTO} = require('../util/ConvertToDTO');
module.exports = {
    findArray: async (listId) =>{
        return await ProductModel.find({_id : {$in: listId}})
                                            .select("size crust price type topping")
                                            .populate('topping',"unitPrice")  
    },
    
    getAllProducts: async ({categoryId, limit, page}) => {
        const id = (!categoryId) ? {} : {categoryId: categoryId}
        const listProduct = await ProductModel.find(id)
                                              .limit(limit)
                                              .skip(limit * (page -1))
                                              .sort({"productName": 1})
        return productDTO(listProduct);
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
        const product = await ProductModel.findByIdAndUpdate(id, data)
        return (product)
            ? product
            : Boom.notFound(`Product`)
    },
    deleteProduct: async (id) =>{
        const product = await ProductModel.findByIdAndDelete(id);
        return (product)
            ? product
            : Boom.notFound(`Product`)
    }
}