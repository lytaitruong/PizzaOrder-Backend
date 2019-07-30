const Mongoose = require('mongoose')

const CategoriesSchema = new Mongoose.Schema({
  categoryName: { type: String, required: true, unique: true },
  imageUri: { type: String, required: true },
})

const model = Mongoose.model('categories', CategoriesSchema)
const getCategories = () => model.find()
const getCategory = id => model.findById(id)
const createCategory = ({ categoryName, imageUri }) => model.create({ categoryName, imageUri })
const updateCategory = (id, { categoryName, imageUri }) => model.findByIdAndUpdate(id, { categoryName, imageUri })
const deleteCategory = id => model.findByIdAndDelete(id)

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
}
