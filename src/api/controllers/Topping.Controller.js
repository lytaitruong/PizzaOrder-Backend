const { Response, HandlerError } = require('../../util/index')
const ToppingService = require('../../service/Topping.Service')
module.exports = {
  getAllToppings: async (request, h) => {
    try {
      const topping = await ToppingService.getAllToppings()
      return Response(h, topping, 200)
    } catch (error) {
      return HandlerError(error, h)
    }
  },
  getTopping: async (request, h) => {
    try {
      const topping = await ToppingService.getTopping(request.params.id)
      return Response(h, topping, 200)
    } catch (error) {
      return HandlerError(error, h)
    }
  },
  createTopping: async (request, h) => {
    try {
      const topping = await ToppingService.createTopping(request.payload)
      return Response(h, topping, 201)
    } catch (error) {
      return HandlerError(error, h)
    }
  },
  updateTopping: async (request, h) => {
    try {
      const topping = await ToppingService.updateTopping(request.params.id, request.payload)
      return Response(h, topping, 200)
    } catch (error) {
      return HandlerError(error, h)
    }
  },
  deleteTopping: async (request, h) => {
    try {
      const topping = await ToppingService.deleteTopping(request.params.id)
      return Response(h, topping, 200)
    } catch (error) {
      return HandlerError(error, h)
    }
  },
}
