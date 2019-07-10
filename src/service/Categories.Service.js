const CategoriesModel = require('../models/Categories.Model')

const getCategories = async () => {
  const listCategories = await CategoriesModel.find()
  return listCategories
}
const getCategory = async id => {
  const category = await CategoriesModel.findById(id)
  return category
}
const createCategory = async ({ categoryName, imageUri }) => {
  const category = await CategoriesModel.create({ categoryName, imageUri })
  return category
}
const updateCategory = async (id, { categoryName, imageUri }) => {
  const category = await CategoriesModel.findByIdAndUpdate(id, {
    categoryName,
    imageUri,
  })
  return category
}
const deleteCategory = async id => {
  const category = await CategoriesModel.findByIdAndDelete(id)
  return category
}
module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
}
