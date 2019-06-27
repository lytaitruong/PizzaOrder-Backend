const Boom       = require('@hapi/boom')
const OrderModel = require('../models/Order.Model');
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
        






        const order = await OrderModel.create({
            cutstomerId,
            phoneNumber,
            address,
            amount,
            dateOrder: new Date.now(),
            listOrderDetails
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


