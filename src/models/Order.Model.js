const Mongoose = require('mongoose')
const OrderSchema = new Mongoose.Schema({
  customerId: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'customers',
    required: true,
  },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  amount: { type: Number, required: true },
  dateOrder: { type: Date, required: true },
  typePayment: { type: String, required: true, enum: ['visa', 'mastercard', 'cash'] },
  listOrderDetails: { type: Array, required: true },
})
const model = Mongoose.model('orders', OrderSchema)

const getAllOrders = (from, to) =>
  model
    .find({
      dateOrder: { $gte: from, $lte: to + 86400000 },
    })
    .sort({ dateOrder: 1 })

const getOrder = id => model.findById(id)

const createOrder = (customerId, amount, { address, phoneNumber, listOrderDetails, typePayment }) =>
  OrderModel.create({
    customerId,
    phoneNumber,
    address,
    amount,
    dateOrder: new Date().getTime(),
    typePayment,
    listOrderDetails,
  })

const deleteOrder = id => model.findByIdAndDelete(id)

module.exports = {
  getAllOrders,
  getOrder,
  createOrder,
  deleteOrder,
}
