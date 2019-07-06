const OrderService = require('../../service/Order.Service')
const ProductService = require('../../service/Product.Service')
const BestSellerService = require('../../service/BestSeller.Service')
const CategoriesService = require('../../service/Categories.Service')
const { Time, Response, HandlerError } = require('../../util')
module.exports = {
  getBestSeller: async (request, h) => {
    const { from, to } = request.query
    try {
      const listOrder = await OrderService.getAllOrders(Time(from), Time(to))
      const listCategories = await CategoriesService.getCategories()
      const countProduct = BestSellerService.countProductOrder(listOrder)
      const listBestSeller = BestSellerService.ObjectToArray(countProduct, '_id', 'quantity')
      const listProduct = await ProductService.findArray(
        listBestSeller.map(product => product._id),
        'productName type description imageUri categoryId'
      )
      const BestSellerProduct = BestSellerService.classifyCategories(listBestSeller, listProduct, listCategories)
      return Response(h, BestSellerProduct, 200)
    } catch (error) {
      return HandlerError(error, h)
    }
  },
  getAllProducts: async (request, h) => {
    try {
      const product = await ProductService.getAllProducts(request.query)
      return Response(h, product, 200)
    } catch (error) {
      return HandlerError(error, h)
    }
  },
  getProduct: async (request, h) => {
    try {
      const product = await ProductService.getProduct(request.params.id)
      return Response(h, product, 200)
    } catch (error) {
      return HandlerError(error, h)
    }
  },
  createProduct: async (request, h) => {
    try {
      const product = await ProductService.createProduct(request.payload)
      return Response(h, product, 201)
    } catch (error) {
      return HandlerError(error, h)
    }
  },
  updateProduct: async (request, h) => {
    try {
      const product = await ProductService.updateProduct(request.params.id, request.payload)
      return Response(h, product, 200)
    } catch (error) {
      return HandlerError(error, h)
    }
  },
  deleteProduct: async (request, h) => {
    try {
      const product = await ProductService.deleteProduct(request.params.id)
      return Response(h, product, 200)
    } catch (error) {
      return HandlerError(error, h)
    }
  },
}
