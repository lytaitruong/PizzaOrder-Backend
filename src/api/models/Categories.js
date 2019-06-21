const Mongoose      = require('mongoose');

const ToppingSchema = new Mongoose.Schema({
    toppingID  : {type: Number, required: true, unique: true},
    toppingName: {type: String, required: true},
    quantity   : {type: Number, required: true},
    unitPrice  : {type: Number, required: true},
});

const ProductSchema = new Mongoose.Schema({
    productID  : {type: Number, required: true, unique: true},
    productName: {type: String, required: true, unique: true},
    size       : {
        S: {type: Number},
        M: {type: Number},
        L: {type: Number},
    },
    curst      : {
        Thin : {type: Number},
        Thick: {type: Number},
    },
    topping    : {type: [ToppingSchema]},
    star       : {type: Number, required: true, default: 1}
})


const CategoriesSchema = new Mongoose.Schema({
    categoryID  : {type: Number, required: true, unique: true},
    categoryName: {type: String, required: true},
    imageUrl    : {type: String, required: true},
    listProducts: {type: [ProductSchema]}
})
module.exports = Mongoose.model('categories', CategoriesSchema);
