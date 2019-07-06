const Boom = require('@hapi/boom')
const OrderModel = require('../models/Order.Model')
module.exports = {
  getAllOrders: async (from, to) => {
    const listOrder =
      from > to
        ? Boom.badRequest('`From must be smaller than to')
        : await OrderModel.find({
            dateOrder: { $gte: from, $lte: to + 86400000 },
          }).sort({ dateOrder: -1 })
    return listOrder
  },
  getOrder: async id => {
    const order = await OrderModel.findById(id)
    return order ? order : Boom.notFound(`Order`)
  },
  createOrder: async (customerId, listProduct, { address, phoneNumber, listOrderDetails, typePayment }) => {
    const amount = module.exports.calculateAmount(listProduct, listOrderDetails)
    const order = OrderModel.create({
      customerId,
      phoneNumber,
      address,
      amount,
      dateOrder: new Date().getTime(),
      typePayment,
      listOrderDetails,
    })
    return order ? order : Boom.badRequest(`Order`)
  },
  calculateTopping: (productTopping, orderDetailTopping) => {
    return orderDetailTopping.reduce((total, detailTopping) => {
      const topping = productTopping.find(topping => topping._id == detailTopping._id)
      return total + topping.unitPrice * detailTopping.quantity
    }, 0)
  },
  calculateAmount: (listProduct, listOrderDetails) => {
    return listOrderDetails.reduce((total, orderDetail) => {
      const product = listProduct.find(pro => pro._id == orderDetail._id)
      const value =
        product.type === 'PIZZA'
          ? product.size[orderDetail.size] +
            product.crust[orderDetail.crust] +
            module.exports.calculateTopping(product.topping, orderDetail.topping)
          : product.price
      return total + value * orderDetail.quantity
    }, 0)
  },
}
