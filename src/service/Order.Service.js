const OrderModel = require('../models/Order.Model')

const getAllOrders = (from, to) => OrderModel.getAllOrders(from, to)

const getOrder = id => OrderModel.getOrder(id)

const createOrder = (customerId, listProduct, { address, phoneNumber, listOrderDetails, typePayment }) =>
  OrderModel.createOrder(customerId, listProduct, calculateAmount(listProduct, listOrderDetails), {
    address,
    phoneNumber,
    listOrderDetails,
    typePayment,
  })

const deleteOrder = (_id, customerId) => OrderModel.deleteOrder({ _id, customerId })

const calculateTopping = (productTopping, orderDetailTopping) => {
  return orderDetailTopping.reduce((total, detailTopping) => {
    const topping = productTopping.find(topping => topping._id == detailTopping._id)
    return total + topping.unitPrice * detailTopping.quantity
  }, 0)
}

const calculateAmount = (listProduct, listOrderDetails) => {
  return listOrderDetails.reduce((total, orderDetail) => {
    const product = listProduct.find(pro => pro._id == orderDetail._id)
    const value =
      product.size[orderDetail.size] +
      product.crust[orderDetail.crust] +
      calculateTopping(product.topping, orderDetail.topping)
    return total + value * orderDetail.quantity
  }, 0)
}

module.exports = {
  getAllOrders,
  getOrder,
  createOrder,
  deleteOrder,
  calculateTopping,
  calculateAmount,
}
