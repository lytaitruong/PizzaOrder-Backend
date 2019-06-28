const Mongoose      = require('mongoose');

const CategoriesSchema = new Mongoose.Schema({
    categoryName: {type: String, required: true, unique: true},
    imageUri    : {type: String, required: true},
})

const CategoriesModel = Mongoose.model('categories', CategoriesSchema); 
module.exports = CategoriesModel