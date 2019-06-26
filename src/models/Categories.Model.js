const Mongoose      = require('mongoose');
const Boom          = require('@hapi/boom');
const ProductSchema = new Mongoose.Schema({
    productName: {type: String, required: true, unique: true},
    imageUri   : {type: String, required: true},
    size: {
        M: {type: Number, required: true},
        L: {type: Number, required: true},
    },
    crust: {
        Thin  : {type: Number, required: true},
        Medium: {type: Number, required: true},
    },
    price: {type: Number, required: true},
    topping: [{type: Mongoose.Schema.Types.ObjectId, ref: 'ToppingModel'}],
    star   : {type : Number}
})

const CategoriesSchema = new Mongoose.Schema({
    categoryName: {type: String, required: true, unique: true},
    imageUri    : {type: String, required: true},
    listProduct : {type: [ProductSchema]}
})
CategoriesSchema.pre('save', async function save(next){
    if(await CategoriesModel.findOne({categoryName: this.categoryName})){
        throw Boom.conflict(`this topping's name have been registered`)
    }
    return next;
})
CategoriesSchema.pre('findOneAndUpdate', async function findOneAndUpdate(next){
    if(this.getUpdate().categoryName){
        const result = await CategoriesModel.findOne({categoryName: this.getUpdate().categoryName});
        if(result){
            if(result._id != this.getQuery()._id){
                throw Boom.conflict(`This topping's name have been registered`)
            }
        }
    }
    return next
})
const CategoriesModel = Mongoose.model('categories', CategoriesSchema); 
module.exports = CategoriesModel



