const CategoriesService = require('../../service/Categories.Service')
const { HandleError, HandleResponse } = require('../../util/HandlerUtils')
const { CODE } = require('../../constant')
module.exports = {
  getCategories: async (request, h) => {
    try {
      const categories = await CategoriesService.getCategories()
      return HandleResponse(h, categories, CODE.SUCCESS)
    } catch (error) {
      return HandleError(error, h)
    }
  },
  getCategory: async (request, h) => {
    try {
      const category = await CategoriesService.getCategory(request.params.id)
      return HandleResponse(h, category, CODE.SUCCESS)
    } catch (error) {
      return HandleError(error, h)
    }
  },
  createCategory: async (request, h) => {
    try {
      const category = await CategoriesService.createCategory(request.payload)
      return HandleResponse(h, category, CODE.CREATE)
    } catch (error) {
      return HandleError(error, h)
    }
  },
  updateCategory: async (request, h) => {
    try {
      const category = await CategoriesService.updateCategory(request.params.id, request.payload)
      return HandleResponse(h, category, CODE.SUCCESS)
    } catch (error) {
      return HandleError(error, h)
    }
  },
  deleteCategory: async (request, h) => {
    try {
      const category = await CategoriesService.deleteCategory(request.params.id)
      return HandleResponse(h, category, CODE.SUCCESS)
    } catch (error) {
      return HandleError(error, h)
    }
  },
}
