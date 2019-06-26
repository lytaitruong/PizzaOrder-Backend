
const Mongoose          = require('mongoose');
const OrderSchema = new Mongoose.Schema({
    customerId : {type: Mongoose.Schema.Types.ObjectId, ref: 'Customers', required: true},
    address    : {type: String, required: true},
    phoneNumber: {type: String, required: true},
    amount     : {type: Number, required: true},
    dateOrder  : {type: Date  , required: true, default: Date()},
    listOrdersDetails: {type: [Mongoose.Schema.Types.ObjectId], required: true}
});

module.exports = Mongoose.model('orders', OrderSchema);