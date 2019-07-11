const OrderModel = require('../models/Order.Model')

const getAllOrders = async (from, to) => {
  const listOrder = await OrderModel.find({
    dateOrder: { $gte: from, $lte: to + 86400000 },
  }).sort({ dateOrder: 1 })
  return listOrder
}

const getOrder = async id => {
  const order = await OrderModel.findById(id)
  return order
}

const createOrder = async (customerId, listProduct, { address, phoneNumber, listOrderDetails, typePayment }) => {
  const amount = module.exports.calculateAmount(listProduct, listOrderDetails)
  const order = OrderModel.create({
    customerId,
    phoneNumber,
    address,
    amount,
    dateOrder: new Date().getTime(),
    typePayment,
    status: "received",
    listOrderDetails,
  })
  return order
}

const updateOrder = async(_id , data) =>{
  const order = await OrderModel.findByIdAndUpdate(_id, {status: "delivery"},{new:true})
  return order;
}

const deleteOrder = async (_id, customerId) => {
  const order = await OrderModel.findOneAndDelete({ _id, customerId })
  return order
}

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
      product.type === 'PIZZA'
        ? product.size[orderDetail.size] +
          product.crust[orderDetail.crust] +
          module.exports.calculateTopping(product.topping, orderDetail.topping)
        : product.price
    return total + value * orderDetail.quantity
  }, 0)
}

module.exports = {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  calculateTopping,
  calculateAmount,
}
