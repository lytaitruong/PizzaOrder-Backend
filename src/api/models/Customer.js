const Mongoose = require('mongoose');

const historyOrdersSchema = new Mongoose.Schema({
    orderID  : {type: Number, required: true, unique: true},
    orderDate: {type: Date, required  : true},
    amount   : {type: Number, required: true}
})

const CustomerSchema = new Mongoose.Schema({
    customerID   : {type: Number, required: true, unique: true},
    username     : {type: String, required: true, unique: true},
    email        : {type: String, required: true, unique: true},
    password     : {type: String, required: true},
    phoneNumber  : {type: String, required: true},
    scope        : {type: String, required: true},
    historyOrders: {type: [historyOrdersSchema]},
});



module.exports = Mongoose.model('customers', CustomerSchema);