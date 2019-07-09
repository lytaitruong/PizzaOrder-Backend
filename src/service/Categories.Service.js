const CategoriesModel = require('../models/Categories.Model')
module.exports = {
  getCategories: async () => {
    const listCategories = await CategoriesModel.find()
    return listCategories
  },
  getCategory: async id => {
    const category = await CategoriesModel.findById(id)
    return category
  },
  createCategory: async ({ categoryName, imageUri }) => {
    const category = await CategoriesModel.create({ categoryName, imageUri })
    return category
  },
  updateCategory: async (id, { categoryName, imageUri }) => {
    const category = await CategoriesModel.findByIdAndUpdate(id, {
      categoryName,
      imageUri,
    })
    return category
  },
  deleteCategory: async id => {
    const category = await CategoriesModel.findByIdAndDelete(id)
    return category
  },
}
