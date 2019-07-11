const Boom = require('@hapi/boom')
const { Response, Time , HandlerError} = require('../../util/index')
const { CODE } = require('../../util/constant')
const OrderService = require('../../service/Order.Service')
const ProductService = require('../../service/Product.Service')
const CustomerService = require('../../service/Customer.Service')
module.exports = {
  getAllOrders: async (request, h) => {
    try {
      const { from, to } = request.query
      const listOrder = await OrderService.getAllOrders(Time(from), Time(to))
      return Response(h, listOrder, CODE.SUCCESS)
    } catch (error) {
      return HandlerError(error)
    }
  },
  getOrder: async (request, h) => {
    try {
      const order = await OrderService.getOrder(request.params.id)
      return Response(h, order, CODE.SUCCESS)
    } catch (error) {
      return HandlerError(error)
    }
  },
  createOrder: async (request, h) => {
    try {
      const id = request.auth.credentials._id
      const listProductId = request.payload.listOrderDetails.map(product => product._id)
      const listProduct = await ProductService.findListProduct(
        listProductId,
        'size crust price type topping ',
        'topping',
        'unitPrice'
      )
      const order = await OrderService.createOrder(id, listProduct, request.payload)
      if (!Boom.isBoom(order)) {
        await CustomerService.addOrder(id, order._id)
      }
      return Response(h, order, CODE.CREATE)
    } catch (error) {
      return HandlerError(error)
    }
  },
  updateOrder: async (request, h) => {
    try {
      const order = await OrderService.updateOrder(request.params.id, request.payload)
      return Response(h, order, CODE.SUCCESS)
    } catch (error) {
      return HandlerError(error)
    }
  },
  deleteOrder: async (request, h) => {
    try {
      const customerId = request.auth.credentials._id
      const order = await OrderService.deleteOrder(request.params.id, customerId)
      return Response(h, order, CODE.SUCCESS)
    } catch (error) {
      return HandlerError(error)
    }
  },
}
