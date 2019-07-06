const Mongoose = require('mongoose')
const CategoriesSchema = new Mongoose.Schema({
  categoryName: { type: String, required: true, unique: true },
  imageUri: { type: String, required: true },
})

module.exports = Mongoose.model('categories', CategoriesSchema)
