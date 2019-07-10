const OrderService = require('../../service/Order.Service')
const ProductService = require('../../service/Product.Service')
const BestSellerService = require('../../service/BestSeller.Service')
const CategoriesService = require('../../service/Categories.Service')
const { Time, Response, HandlerError } = require('../../util')
const { CODE } = require('../../util/constant')
module.exports = {
  getBestSeller: async (request, h) => {
    const { from, to } = request.query
    try {
      const listOrder = await OrderService.getAllOrders(Time(from), Time(to))
      const listCategories = await CategoriesService.getCategories()
      const countProduct = BestSellerService.countProductOrder(listOrder)
      const listBestSeller = BestSellerService.ObjectToArray(countProduct, '_id', 'quantity')
      const listProduct = await ProductService.findListProduct(listBestSeller.map(product => product._id))
      const BestSellerProduct = BestSellerService.classifyCategories(listBestSeller, listProduct, listCategories)
      return Response(h, BestSellerProduct, CODE.SUCCESS)
    } catch (error) {
      return HandlerError(error)
    }
  },
  getAllProducts: async (request, h) => {
    try {
      const product = await ProductService.getAllProducts(request.query)
      return Response(h, product, CODE.SUCCESS)
    } catch (error) {
      return HandlerError(error)
    }
  },
  getProduct: async (request, h) => {
    try {
      const product = await ProductService.getProduct(request.params.id)
      return Response(h, product, CODE.SUCCESS)
    } catch (error) {
      return HandlerError(error)
    }
  },
  createProduct: async (request, h) => {
    try {
      const product = await ProductService.createProduct(request.payload)
      return Response(h, product, CODE.CREATE)
    } catch (error) {
      return HandlerError(error)
    }
  },
  updateProduct: async (request, h) => {
    try {
      const product = await ProductService.updateProduct(request.params.id, request.payload)
      return Response(h, product, CODE.SUCCESS)
    } catch (error) {
      return HandlerError(error)
    }
  },
  deleteProduct: async (request, h) => {
    try {
      const product = await ProductService.deleteProduct(request.params.id)
      return Response(h, product, CODE.SUCCESS)
    } catch (error) {
      return HandlerError(error)
    }
  },
}
