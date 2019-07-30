const ToppingService = require('../../service/Topping.Service')
const { HandleError, HandleResponse } = require('../../util/HandlerUtils')
const { CODE } = require('../../constant')
module.exports = {
  getAllToppings: async (request, h) => {
    try {
      const topping = await ToppingService.getAllToppings()
      return HandleResponse(h, topping, CODE.SUCCESS)
    } catch (error) {
      return HandleError(error, h)
    }
  },
  getTopping: async (request, h) => {
    try {
      const topping = await ToppingService.getTopping(request.params.id)
      return HandleResponse(h, topping, CODE.SUCCESS)
    } catch (error) {
      return HandleError(error, h)
    }
  },
  createTopping: async (request, h) => {
    try {
      const topping = await ToppingService.createTopping(request.payload)
      return HandleResponse(h, topping, CODE.CREATE)
    } catch (error) {
      return HandleError(error, h)
    }
  },
  updateTopping: async (request, h) => {
    try {
      const topping = await ToppingService.updateTopping(request.params.id, request.payload)
      return HandleResponse(h, topping, CODE.SUCCESS)
    } catch (error) {
      return HandleError(error, h)
    }
  },
  deleteTopping: async (request, h) => {
    try {
      const topping = await ToppingService.deleteTopping(request.params.id)
      return HandleResponse(h, topping, CODE.SUCCESS)
    } catch (error) {
      return HandleError(error, h)
    }
  },
}
