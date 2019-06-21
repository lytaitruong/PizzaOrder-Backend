const Mongoose          = require('mongoose');

const OrderDetailSchema = new Mongoose.Schema({
    OrderDetailID: {type: Number, required: true, unique: true},
    ProductID    : {type: Number, required: true},
    PriceUnit    : {type: Number, required: true},
    Quantity     : {type: Number, required: true},
    Total        : {type: Number, required: true},
})


const OrderSchema = new Mongoose.Schema({
    OrderID   : {type: String, required: true, unique : true},
    CustomerID: {type: Number, required: true},
    dateOrder : {type: Date  , required: true, default: Date()},
    Coupon    : {type: Number},
    Amount    : {type: Number, required: true},
    address   : {type: String, required: true},
    ListOrdersDetails: {type: [OrderDetailSchema], required: true},

});

module.exports = Mongoose.model('orders', OrderSchema);