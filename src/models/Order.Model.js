
const Mongoose          = require('mongoose');

const OrderDetailSchema = new Mongoose.Schema({
    productId    : {type: String, required: true},
    unitPrice    : {type: Number, required: true},
    quantity     : {type: Number, required: true},
})


const OrderSchema = new Mongoose.Schema({
    customerId: {type: String, required: true},//
    address   : {type: String, required: true},//
    amount    : {type: Number, required: true},
    dateOrder : {type: Date  , required: true, default: Date()},
    listOrdersDetails: {type: [OrderDetailSchema], required: true},
});

module.exports = Mongoose.model('orders', OrderSchema);