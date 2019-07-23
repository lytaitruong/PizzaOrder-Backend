const CategoriesController = require('../controllers/Categories.Controller')
const CategoriesValidation = require('../validations/Categories.Validation')
const SwaggerDescription = require('../../util/constant')
const TemplateCategories = require('../../template/Categories.Template')
module.exports.register = async server => {
  server.bind(CategoriesController)
  server.route([
    {
      method: 'GET',
      path: '/categories',
      options: {
        auth: false,
        tags: ['api', 'categories'],
        description: 'Get all categories',
        handler: CategoriesController.getCategories,
        plugins: {
          'hapi-swagger': {
            responses: {
              200: SwaggerDescription[200](TemplateCategories.array),
              500: SwaggerDescription[500],
            },
          },
        },
      },
    },
    {
      method: 'GET',
      path: '/categories/{id}',
      options: {
        auth: false,
        tags: ['api', 'categories'],
        description: 'Get categories by id',
        handler: CategoriesController.getCategory,
        validate: CategoriesValidation.getCategory,
      },
    },
    {
      method: 'POST',
      path: '/categories',
      options: {
        auth: {
          scope: ['admin'],
        },
        tags: ['api', 'categories'],
        description: 'Create a new categories',
        handler: CategoriesController.createCategory,
        validate: CategoriesValidation.createCategory,
      },
    },
    {
      method: 'PUT',
      path: '/categories/{id}',
      options: {
        auth: {
          scope: ['admin'],
        },
        tags: ['api', 'categories'],
        description: 'Update Categories by id',
        handler: CategoriesController.updateCategory,
        validate: CategoriesValidation.updateCategory,
      },
    },
    {
      method: 'DELETE',
      path: '/categories/{id}',
      options: {
        auth: {
          scope: ['admin'],
        },
        tags: ['api', 'categories'],
        description: 'Delete Categories by id',
        handler: CategoriesController.deleteCategory,
        validate: CategoriesValidation.deleteCategory,
      },
    },
  ])
}
