const Boom       = require('@hapi/boom')
const OrderModel = require('../models/Order.Model');
module.exports = {
    getAllOrders: async () =>{
        const listOrder = await OrderModel.find('')
                                          .select('customerID dateOrder status amount')
                                          .sort({'dateOrder': -1})
        if(!listOrder){
            throw Boom.notFound(`DATA Order is empty`)
        }
        return listOrder
    },
    getOrder: async (id) =>{
        const order = await OrderModel.findById(id)
        if(!customerOrder){
            throw Boom.notFound(`Order Not Found`)
        }
        return order
    },
    createOrder: async(customerId, {address,listOrdersDetails}) =>{
        
        const amount = await listOrdersDetails.reduce((total,orderDetails) =>{
            orderDetails.toppings.reduce(topping => {
                return top
            })
            return total + (orderDetails.unitPrice * orderDetails.quantity);
        },0)
        //Middleware pre : Check coupon
        // 
        const order = await OrderModel.create({
            customerId,
            address,
            amount,
            dateOrder: new Date(),
            listOrdersDetails
        })
        if(!order){
            throw Boom.notFound(`Order NOT FOUND`)
        }
        //Middleware post : Add this OrderId & Date & Amount into CustomerHistoryOrder
        // Add this on 
        return `CREATE SUCCESS`
    },
}