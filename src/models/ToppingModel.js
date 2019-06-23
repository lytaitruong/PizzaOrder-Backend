const Mongoose = require('mongoose');
const ToppingSchema = new Mongoose.Schema({
    name     : {type: String, required: true, unique: true},
    imageUrl : {type: String, required: true},
    unitPrice: {type: Number, required: true},
});

module.exports = Mongoose.model('toppings', ToppingSchema);