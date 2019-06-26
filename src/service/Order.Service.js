const Boom       = require('@hapi/boom')
const OrderModel = require('../models/Order.Model');
const CategoriesModel = require('../models/Categories.Model');
module.exports = {
    getAllOrders: async ({from, to}) =>{
        const listOrder = await OrderModel.find({dateOrder: {$gte: from, $lte: to}})
                                          .sort({'dateOrder': -1})
        if(!listOrder){
            throw Boom.notFound(`Order NOT FOUND`)
        }
    },
    getOrder: async(id) => {
        const order = await OrderModel.findById(id);
        if(!order){
            throw Boom.notFound(`ORDER NOT FOUND`);
        }
        return order;
    },

    createOrder: async(customerId, {address, phoneNumber, listOrdersDetails}) =>{
        // const list = await CategoriesModel.find({
        //     "listProducts._id": {$in : listOrdersDetails.map(value => value._id)}
        // },"_id size crust topping")

        // const product = await CategoriesModel.find({"listProducts._id": id},
        // {"listProducts": {$elemMatch: {'_id': id}}})
        // const list = await CategoriesModel.find({},{}

        // const order = await OrderModel.create({
        //     customerId,
        //     address,
        //     phoneNumber,
        //     amount,
        //     dateOrder: new Date.now(),
        //     listOrdersDetails
        // })
        // if(!order){
        //     throw Boom.badRequest()
        // }
        // return order;
    },
    deleteOrder: async (id) =>{
        const order = await OrderModel.findByIdAndDelete(id);
        if(!order){
            throw Boom.notFound(`ORDER NOT FOUND`)
        }
        return order;
    }
}