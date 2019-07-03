const Mongoose = require('mongoose')
const CategoriesSchema = new Mongoose.Schema({
  categoryName: { type: String, required: true, unique: true },
  imageUri: { type: String, required: true },
})

module.exports = Mongoose.model('categories', CategoriesSchema)

// CategoriesSchema.pre('save', async function save(next){
//     if(await CategoriesModel.findOne({categoryName: this.categoryName})){
//         throw Boom.conflict(`this topping's name have been registered`);
//     }
//     return next;
// })
// CategoriesSchema.pre('findOneAndUpdate', async function findOneAndUpdate(next){
//     if(this.getUpdate().categoryName){
//         const result = await CategoriesModel.findOne({categoryName: this.getUpdate().categoryName});
//         if(result){
//             if(result._id != this.getQuery()._id){
//                 return Boom.conflict(`This topping's name have been registered`)
//             }
//         }
//     }
//     return next
// })
