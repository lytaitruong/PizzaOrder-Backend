const { Response, HandlerError } = require('../../util/index')
const { CODE } = require('../../util/constant')
const CategoriesService = require('../../service/Categories.Service')
module.exports = {
  getCategories: async (request, h) => {
    try {
      const categories = await CategoriesService.getCategories()
      return Response(h, categories, CODE.SUCCESS)
    } catch (error) {
      return HandlerError(error)
    }
  },
  getCategory: async (request, h) => {
    try {
      const category = await CategoriesService.getCategory(request.params.id)
      return Response(h, category, CODE.SUCCESS)
    } catch (error) {
      return HandlerError(error)
    }
  },
  createCategory: async (request, h) => {
    try {
      const category = await CategoriesService.createCategory(request.payload)
      return Response(h, category, CODE.CREATE)
    } catch (error) {
      return HandlerError(error)
    }
  },
  updateCategory: async (request, h) => {
    try {
      const category = await CategoriesService.updateCategory(request.params.id, request.payload)
      return Response(h, category, CODE.SUCCESS)
    } catch (error) {
      return HandlerError(error)
    }
  },
  deleteCategory: async (request, h) => {
    try {
      const category = await CategoriesService.deleteCategory(request.params.id)
      return Response(h, category, CODE.SUCCESS)
    } catch (error) {
      return HandlerError(error)
    }
  },
}
