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
  status: {type: String, required: true, enum: ["received"]},
  listOrderDetails: { type: Array, required: true },
})
module.exports = Mongoose.model('orders', OrderSchema)
