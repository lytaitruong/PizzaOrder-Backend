const ProductModel = require('../models/Product.Model')
module.exports = {
  findArray: async (listId, select, populate) => {
    return await ProductModel.find({ _id: { $in: listId } })
      .select(select)
      .populate('topping', populate)
  },

  getAllProducts: async ({ categoryId, limit, page }) => {
    const id = !categoryId ? {} : { categoryId: categoryId }
    const listProduct = await ProductModel.find(id)
      .sort({ productName: 1 })
      .limit(limit)
      .skip(limit * (page - 1))
    return listProduct
  },
  getProduct: async id => {
    const product = await ProductModel.findById(id)
    return product
  },
  createProduct: async data => {
    const product = await ProductModel.create(data)
    return product
  },
  updateProduct: async (id, data) => {
    const product = await ProductModel.findByIdAndUpdate(id, data)
    return product
  },
  deleteProduct: async id => {
    const product = await ProductModel.findByIdAndDelete(id)
    return product
  },
}
