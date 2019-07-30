const CategoriesController = require('../controllers/Categories.Controller')
const CategoriesValidation = require('../validations/Categories.Validation')
const SwaggerResponse = require('../schema')
module.exports.register = server =>
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
              200: SwaggerResponse[200],
              500: SwaggerResponse[500],
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
        plugins: {
          'hapi-swagger': {
            responses: {
              200: SwaggerResponse[200],
              404: SwaggerResponse[404],
              500: SwaggerResponse[500],
            },
          },
        },
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
        plugins: {
          'hapi-swagger': {
            responses: {
              201: SwaggerResponse[201],
              400: SwaggerResponse[400],
              500: SwaggerResponse[500],
            },
          },
        },
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
        plugins: {
          'hapi-swagger': {
            responses: {
              200: SwaggerResponse[200],
              404: SwaggerResponse[404],
              500: SwaggerResponse[500],
            },
          },
        },
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
        plugins: {
          'hapi-swagger': {
            responses: {
              200: SwaggerResponse[200],
              404: SwaggerResponse[404],
              500: SwaggerResponse[500],
            },
          },
        },
      },
    },
  ])
