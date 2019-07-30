const ProductModel = require('../models/Product.Model')

const findListProduct = (listId, select, typePopulate = '', populate) =>
  ProductModel.findListProduct(listId, select, typePopulate, populate).populate()
const getAllProducts = ({ categoryId = {}, limit, page }) => ProductModel.getAllProducts(categoryId, limit, page)
const getProduct = id => ProductModel.getProduct(id)
const createProduct = data => ProductModel.createProduct(data)
const updateProduct = (id, data) => ProductModel.updateProduct(id, data)
const deleteProduct = id => ProductModel.deleteProduct(id)

module.exports = {
  findListProduct,
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
}
