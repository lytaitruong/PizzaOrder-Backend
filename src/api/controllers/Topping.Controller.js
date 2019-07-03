const Boom = require('@hapi/boom')
const { Response } = require('../../util/index')
const ToppingService = require('../../service/Topping.Service')
module.exports = {
  getAllToppings: async (request, h) => {
    try {
      const topping = await ToppingService.getAllToppings()
      return Response(h, topping, 200)
    } catch (error) {
      console.log(error)
      throw Boom.internal()
    }
  },
  createTopping: async (request, h) => {
    try {
      const topping = await ToppingService.createTopping(request.payload)
      return Response(h, topping, 201)
    } catch (error) {
      console.log(error)
      throw Boom.internal()
    }
  },
  updateTopping: async (request, h) => {
    try {
      const topping = await ToppingService.updateTopping(request.params.id, request.payload)
      return Response(h, topping, 200)
    } catch (error) {
      console.log(error)
      throw Boom.internal()
    }
  },
  deleteTopping: async (request, h) => {
    try {
      const topping = await ToppingService.deleteTopping(request.params.id)
      return Response(h, topping, 200)
    } catch (error) {
      console.log(error)
      throw Boom.internal()
    }
  },
}
