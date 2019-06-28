const Mongoose          = require('mongoose')

const OrderSchema = new Mongoose.Schema({
    customerId : {type: Mongoose.Schema.Types.ObjectId, ref: 'customers', required: true},
    phoneNumber: {type: String, required: true},
    address    : {type: String, required: true},
    amount     : {type: Number, required: true},
    dateOrder  : {type: Date  , required: true},
    listOrderDetails: [{type: Mongoose.Schema.Types.ObjectId, ref: "products", required: true}]
});
module.exports = Mongoose.model('orders', OrderSchema);