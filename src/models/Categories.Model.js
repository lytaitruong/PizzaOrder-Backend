const Mongoose      = require('mongoose');

const ProductSchema = new Mongoose.Schema({
    productName: {type: String, required: true, unique: true},
    categoryId : {type: String, required: true},
    imageUri   : {type: String, required: true},
    type       : {type: String, required: true},
    size: {
        S: {type: Number, required: true},
        L: {type: Number, required: true},
    },
    crust: {
        Thin : {type: Number, required: true},
        Thick: {type: Number, required: true},
    },
    price  : {type: Number},
    sale   : {type: Number, min: 0, max: 100, required: true},
    rating : {type: Number, min: 0, max: 5  , required: true},
    topping: [{type: Mongoose.Schema.Types.ObjectId, ref: 'ToppingModel'}],
})

const CategoriesSchema = new Mongoose.Schema({
    categoryName: {type: String, required: true, unique: true},
    imageUri    : {type: String, required: true},
    listProduct : {type: [ProductSchema]}
})
const CategoriesModel = Mongoose.model('categories', CategoriesSchema); 
module.exports = CategoriesModel




// CategoriesSchema.pre('save', async function save(next){
//     if(await CategoriesModel.findOne({categoryName: this.categoryName})){
//         throw Boom.conflict(`this topping's name have been registered`)
//     }
//     return next;
// })

// CategoriesSchema.pre('findOneAndUpdate', async function findOneAndUpdate(next){
//     if(this.getUpdate().categoryName){
//         const result = await CategoriesModel.findOne({categoryName: this.getUpdate().categoryName});
//         if(result){
//             if(result._id != this.getQuery()._id){
//                 throw Boom.conflict(`This topping's name have been registered`)
//             }
//         }
//     }
//     return next
// })
