const ProductModel = require('../models/Product.Model')

const findListProduct = async (listId, select, typePopulate = '', populate) => {
  return await ProductModel.find({ _id: { $in: listId } })
    .select(select)
    .populate(typePopulate, populate)
}

const getAllProducts = async ({ categoryId, limit, page }) => {
  const id = !categoryId ? {} : { categoryId: categoryId }
  const listProduct = await ProductModel.find(id)
    .sort({ productName: 1 })
    .limit(limit)
    .skip(limit * (page - 1))
  return listProduct
}

const getProduct = async id => {
  const product = await ProductModel.findById(id)
  return product
}

const createProduct = async data => {
  const product = await ProductModel.create(data)
  return product
}

const updateProduct = async (id, data) => {
  const product = await ProductModel.findByIdAndUpdate(id, data)
  return product
}

const deleteProduct = async id => {
  const product = await ProductModel.findByIdAndDelete(id)
  return product
}

module.exports = {
  findListProduct,
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
}
