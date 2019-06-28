const Boom       = require('@hapi/boom')
const OrderModel = require('../models/Order.Model');
const CategoriesModel = require('../models/Categories.Model')
const Mongoose = require('mongoose');
module.exports = {
    getAllOrders: async ({from, to}) =>{
        const listOrder = await OrderModel.find({dateOrder: {$gte: from, $lte: to}})
                                          .sort({'dateOrder': -1})
        return (listOrder)
            ? listOrder
            : Boom.notFound(`Order`)
    },
    getOrder: async(id) => {
        const order = await OrderModel.findById(id);
        return (order)
            ? order
            : Boom.notFound(`Order`)
    },

    createOrder: async(customerId, {address, phoneNumber, listOrderDetails}) =>{
        // const list = await CategoriesModel.find({
        //     "listProducts._id": {$in : listOrdersDetails.map(value => value._id)}
        // },"_id size crust topping")

        // const product = await CategoriesModel.find({"listProducts._id": id},
        // {"listProducts": {$elemMatch: {'_id': id}}})
        // const list = await CategoriesModel.find({},{}

        const listID = listOrderDetails.map(value => Mongoose.Types.ObjectId(value._id));
        const listProducts = await CategoriesModel.find(
            {"listProduct._id": {$in: listID}},
            {"listProduct": {$elemMatch: {'_id': {$in: listID}}}})
            .populate('topping','unitPrice').exec()
        // console.log(listProducts);
        // const order = await CategoriesModel.aggregate([
        //     {$unwind: "$listProduct"},
        //     {$match : {"listProduct._id": {"$in": listID}}},
        // ])
        

        console.log(listProducts);
        const amount = listOrderDetails.reduce((total, orderDetail) =>{
            const {_id, size, crust, quantity, topping} = orderDetail
            // console.log({_id,size,crust,quantity,topping})
            return total
        },0)
        const order = await OrderModel.create({
            customerId,
            phoneNumber,
            address,
            amount,
            dateOrder: new Date.now(),
            //
        })
        return (order)
            ? order
            : Boom.badRequest('Order')
    },
    deleteOrder: async (id) =>{
        const order = await OrderModel.findByIdAndDelete(id);
        return (order)
            ? order
            : Boom.notFound(`Order`)
    }
}


