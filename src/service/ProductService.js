const CategoriesModel = require('../models/CategoriesModel');
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
        const product = await CategoriesModel.findOne({'listProducts._id': id},
        {listProducts: {$elemMatch:{_id: id}}})
        if(!product){
            throw Boom.notFound(`Product NOT FOUND!`)
        };
        return product;
    },
    createProduct: async ({productName, categoryId, size, crust, topping, star}) =>{
        const result = await CategoriesModel.findOne({"listProducts.productName": productName})
        if(result && result.listProducts._id === id){
            throw Boom.conflict(`this product Name has been registered`);
        }
        const product = await CategoriesModel.updateOne(
            {_id: categoryId},
            {$addToSet: {listProducts: { productName,
                                         categoryId ,
                                         size, crust,
                                         topping,star}}},
            {new: true}
        )
        if(!product){
            throw Boom.notFound()
        }
        return `CREATE SUCCESS`;
    },
    updateProduct: async (id, {productName, categoryId, size, crust, topping, star}) =>{        
        //Có 1 lỗi khi update số Id bị thay đổi một chút
        const result = await CategoriesModel.findOne({"listProducts.productName": productName})
        if(result && result.listProducts._id === id){
            throw Boom.conflict(`this product Name has been registered`);
        }
        const product = await CategoriesModel.updateOne(
            { _id : categoryId, "listProducts._id": id},
            {$set:  {"listProducts.$": {id,productName,categoryId,size,crust,topping,star}}},
            {new: true}
        )
        if(!product){
            throw Boom.notFound()
        }
        return `UPDATE SUCCESS`
    },
    deleteProduct: async (id, {categoryId}) =>{
        const product = await CategoriesModel.updateOne(
            { _id: categoryId},
            { $pull: {listProducts: {_id : id}}}
        )
        if(!product){
            throw Boom.notFound(`Product NOT FOUND!`)
        }
        return `DELETE SUCCESS`;
    }
}