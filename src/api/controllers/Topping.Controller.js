const { Response, HandlerError } = require('../../util/index')
const { CODE } = require('../../util/constant')
const ToppingService = require('../../service/Topping.Service')
const getAllToppings = async (request, h) => {
  try {
    const topping = await ToppingService.getAllToppings()
    return Response(h, topping, CODE.SUCCESS)
  } catch (error) {
    return HandlerError(error)
  }
}
const getTopping = async (request, h) => {
  try {
    const topping = await ToppingService.getTopping(request.params.id)
    return Response(h, topping, CODE.SUCCESS)
  } catch (error) {
    return HandlerError(error)
  }
}
const createTopping = async (request, h) => {
  try {
    const topping = await ToppingService.createTopping(request.payload)
    return Response(h, topping, CODE.CREATE)
  } catch (error) {
    return HandlerError(error)
  }
}
const updateTopping = async (request, h) => {
  try {
    const topping = await ToppingService.updateTopping(request.params.id, request.payload)
    return Response(h, topping, CODE.SUCCESS)
  } catch (error) {
    return HandlerError(error)
  }
}
const deleteTopping = async (request, h) => {
  try {
    const topping = await ToppingService.deleteTopping(request.params.id)
    return Response(h, topping, CODE.SUCCESS)
  } catch (error) {
    return HandlerError(error)
  }
}

module.exports = {
  getAllToppings,
  getTopping,
  createTopping,
  updateTopping,
  deleteTopping,
}