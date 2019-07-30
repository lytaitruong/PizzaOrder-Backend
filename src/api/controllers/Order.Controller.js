const OrderService = require('../../service/Order.Service')
const ProductService = require('../../service/Product.Service')
const CustomerService = require('../../service/Customer.Service')
const { HandleError, HandleResponse } = require('../../util/HandlerUtils')
const { CODE, TOPPING } = require('../../constant')
module.exports = {
  getAllOrders: async (request, h) => {
    try {
      const { from, to } = request.query
      const listOrder = await OrderService.getAllOrders(Time(from), Time(to))
      return HandleResponse(h, listOrder, CODE.SUCCESS)
    } catch (error) {
      return HandleError(error, h)
    }
  },
  getOrder: async (request, h) => {
    try {
      const order = await OrderService.getOrder(request.params.id)
      return HandleResponse(h, order, CODE.SUCCESS)
    } catch (error) {
      return HandleError(error, h)
    }
  },
  createOrder: async (request, h) => {
    try {
      const id = request.auth.credentials._id
      const listProductId = request.payload.listOrderDetails.map(product => product._id)
      const listProduct = await ProductService.findListProduct(
        listProductId,
        'size crust price type topping',
        TOPPING.NAME,
        TOPPING.UNIT_PRICE
      )
      const order = await OrderService.createOrder(id, listProduct, request.payload)
      await CustomerService.addOrder(id, order._id)
      return HandleResponse(h, order, CODE.CREATE)
    } catch (error) {
      return HandleError(error, h)
    }
  },
  deleteOrder: async (request, h) => {
    try {
      const order = await OrderService.deleteOrder(request.params.id, request.auth.credentials._id)
      return HandleResponse(h, order, CODE.SUCCESS)
    } catch (error) {
      return HandleError(error, h)
    }
  },
}
