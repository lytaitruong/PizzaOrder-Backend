const CategoriesModel = require('../models/Categories.Model')

const getCategories = () => CategoriesModel.getCategories()
const getCategory = id => CategoriesModel.getCategory(id)
const createCategory = ({ categoryName, imageUri }) => CategoriesModel.createCategory({ categoryName, imageUri })
const updateCategory = (id, { categoryName, imageUri }) =>
  CategoriesModel.updateCategory(id, { categoryName, imageUri })
const deleteCategory = id => CategoriesModel.deleteCategory(id)

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
}
