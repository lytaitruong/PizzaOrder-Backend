const Mongoose      = require('mongoose');
const Boom          = require('@hapi/boom');
const ProductSchema = new Mongoose.Schema({
    productName: {type: String, required: true, unique: true},
    imageUri   : {type: String, required: true},
    type       : {type: String, required: true},
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

const CategoriesSchema = new Mongoose.Schema({
    categoryName: {type: String, required: true, unique: true},
    imageUri    : {type: String, required: true},
    listProduct : {type: [ProductSchema]}
})

// CategoriesSchema.pre('save', async function save(error, next){
//     if(await CategoriesModel.findOne({categoryName: this.categoryName})){
//         return next(Boom.conflict(`this topping's name have been registered`));
//     }
//     return next;
// })

CategoriesSchema.post('save', function(error,doc, next){
    if (error.name === 'MongoError' && error.code === 11000) {
        return next(new Error(`Dupcate Categories's Name`))
    }
    next();
})
const CategoriesModel = Mongoose.model('categories', CategoriesSchema); 
module.exports = CategoriesModel






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
