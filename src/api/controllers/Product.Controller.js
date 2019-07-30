const OrderService = require('../../service/Order.Service')
const ProductService = require('../../service/Product.Service')
const BestSellerService = require('../../service/BestSeller.Service')
const CategoriesService = require('../../service/Categories.Service')
const { HandleError, HandleResponse } = require('../../util/HandlerUtils')
const { Time } = require('../../util')
const { CODE } = require('../../constant')
module.exports = {
  getBestSeller: async (request, h) => {
    const { from, to } = request.query
    try {
      const listOrder = await OrderService.getAllOrders(Time(from), Time(to))
      const countProduct = await BestSellerService.countProductOrder(listOrder)
      const listCategories = CategoriesService.getCategories()
      const listBestSeller = BestSellerService.ObjectToArray(countProduct)
      const listProduct = await ProductService.findListProduct(listBestSeller.map(product => product[0]))
      const BestSellerProduct = BestSellerService.classifyCategories(listBestSeller, listProduct, await listCategories)
      return HandleResponse(h, BestSellerProduct, CODE.SUCCESS)
    } catch (error) {
      return HandleError(error, h)
    }
  },
  getAllProducts: async (request, h) => {
    try {
      const product = await ProductService.getAllProducts(request.query)
      return HandleResponse(h, product, CODE.SUCCESS)
    } catch (error) {
      return HandleError(error, h)
    }
  },
  getProduct: async (request, h) => {
    try {
      const product = await ProductService.getProduct(request.params.id)
      return HandleResponse(h, product, CODE.SUCCESS)
    } catch (error) {
      return HandleError(error, h)
    }
  },
  createProduct: async (request, h) => {
    try {
      const product = await ProductService.createProduct(request.payload)
      return HandleResponse(h, product, CODE.CREATE)
    } catch (error) {
      return HandleError(error, h)
    }
  },
  updateProduct: async (request, h) => {
    try {
      const product = await ProductService.updateProduct(request.params.id, request.payload)
      return HandleResponse(h, product, CODE.SUCCESS)
    } catch (error) {
      return HandleError(error, h)
    }
  },
  deleteProduct: async (request, h) => {
    try {
      const product = await ProductService.deleteProduct(request.params.id)
      return HandleResponse(h, product, CODE.SUCCESS)
    } catch (error) {
      return HandleError(error, h)
    }
  },
}
