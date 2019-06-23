const Mongoose      = require('mongoose');
const Boom          = require('@hapi/boom');


const ProductSchema = new Mongoose.Schema({
    productName: {type: String, required: true, unique: true},
    categoryId : {type: String, required: true},
    size: {
        S: {type: Number, required: true},
        M: {type: Number, required: true},
        L: {type: Number, required: true},
    },
    crust: {
        Thin : {type: Number, required: true},
        Thick: {type: Number, required: true},
    },
    topping: [{type: Mongoose.Schema.Types.ObjectId, ref: 'ToppingModel'}],
    count: {type: Number, required: true},
    star: {type: Number}
})

ProductSchema.pre('updateOne', async function updateOne(next){
    console.log(`PRODUCT UPDATE ONE`)
})
ProductSchema.pre('findOneAndUpdate', async function findOneAndUpdate(next){
    console.log(`PRODUCT FIND ONE AND UPDPATE`)
});

ProductSchema.pre('save', async function save(next){
    console.log('PRODUCT SAVE')
})


const CategoriesSchema = new Mongoose.Schema({
    categoryName: {type: String, required: true, unique: true},
    imageUrl    : {type: String, required: true},
    listProducts: {type: [ProductSchema]}
})

CategoriesSchema.pre('updateOne', async function updateOne(next){
    console.log(`CATEORIES UPDATE ONE`)
})
CategoriesSchema.pre('findOneAndUpdate', async function findOneAndUpdate(next){
    console.log(`CATEGORIES FIND ONE AND UPDATE`)
});

CategoriesSchema.pre('save', async function save(next){
    console.log('CATEGORIES SAVE')
})
const CategoriesModel = Mongoose.model('categories', CategoriesSchema); 
module.exports = CategoriesModel


