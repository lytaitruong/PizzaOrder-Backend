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
        const listID = listOrderDetails.map(value => Mongoose.Types.ObjectId(value._id));
        // const listProducts = await CategoriesModel.find(
        //     {"listProduct._id": {$in: listID}},
        //     {"listProduct": {$elemMatch: {'_id': {$in: listID}}}}).populate('topping');
        // console.log(listProducts);
        const order = await CategoriesModel.aggregate([
            {$unwind: "$listProduct"},
            {$unwind: "$listProduct.topping"},
            {$match : {"listProduct._id": {"$in": listID}}},
            {$lookup: {
                "from": "toppings",
                "localField": "listProduct.topping",
                "foreignField": "_id",
                "as": "resultToppingArray" 
            }},
            {$unwind: "$resultToppingArray"},
            {$group : {
                _id: "listProductMatchOrderDetail",
                listProduct: {$addToSet: "$resultToppingArray"},
                countProduct: {$sum : 1}
            }}
        ])
        console.log(order);

        // order.forEach(value => {
        //     console.log(value.listProduct.topping);    
        // });
        return Boom.notFound();
        // const amount = listOrderDetails.reduce((total, orderDetail) =>{
        //     const {_id, size, crust, quantity, topping} = orderDetail
        //     // console.log({_id,size,crust,quantity,topping})
        //     return total
        // },0)
        // const order = await OrderModel.create({
        //     customerId,
        //     phoneNumber,
        //     address,
        //     amount,
        //     dateOrder: new Date.now(),
        //     //
        // })
        // return (order)
        //     ? order
        //     : Boom.badRequest('Order')
    },
    deleteOrder: async (id) =>{
        const order = await OrderModel.findByIdAndDelete(id);
        return (order)
            ? order
            : Boom.notFound(`Order`)
    }
}


