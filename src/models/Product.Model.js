const Mongoose = require('mongoose')

const ProductSchema = new Mongoose.Schema({
    productName: {type: String, required: true, unique: true},
    imageUri   : {type: String, required: true},
    type       : {type: String, required: true},
    description: {type: String, required: true},
    categoryId : {type: Mongoose.Schema.Types.ObjectId, ref: 'categories', required: true},
    size: {
        S: {type: Number},
        L: {type: Number},
    },
    crust: {
        Thin : {type: Number},
        Thick: {type: Number},
    },
    price  : {type: Number},
    sale   : {type: Number, min: 0, max: 100, required: true},
    rating : {type: Number, min: 0, max: 5  , required: true},
    topping: [{type: Mongoose.Schema.Types.ObjectId, ref: 'toppings'}],
})

module.exports = Mongoose.model('products', ProductSchema);