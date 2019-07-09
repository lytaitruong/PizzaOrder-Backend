const ToppingController = require('../controllers/Topping.Controller')
const ToppingValidation = require('../validations/Topping.Validation')
const SwaggerDescription = require('../../util/constant')
module.exports.register = async server => {
  server.bind(ToppingController)
  server.route([
    {
      method: 'GET',
      path: '/toppings',
      options: {
        auth: false,
        tags: ['api', 'toppings'],
        description: 'Get all topping',
        handler: ToppingController.getAllToppings,
        plugins: {
          'hapi-swagger': {
            response: {
              200: SwaggerDescription[200],
              500: SwaggerDescription[500],
            },
          },
        },
      },
    },
    {
      method: 'GET',
      path: '/toppings/{id}',
      options: {
        auth: false,
        tags: ['api', 'toppings'],
        description: 'Get topping by id',
        handler: ToppingController.getTopping,
        validate: ToppingValidation.getTopping,
        plugins: {
          'hapi-swagger': {
            response: {
              200: SwaggerDescription[200],
              400: SwaggerDescription[400],
              500: SwaggerDescription[500],
            },
          },
        },
      },
    },
    {
      method: 'POST',
      path: '/toppings',
      options: {
        auth: {
          scope: ['admin'],
        },
        tags: ['api', 'toppings'],
        description: 'Create a new topping',
        handler: ToppingController.createTopping,
        validate: ToppingValidation.createTopping,
        plugins: {
          'hapi-swagger': {
            response: {
              200: SwaggerDescription[200],
              400: SwaggerDescription[400],
              500: SwaggerDescription[500],
            },
          },
        },
      },
    },
    {
      method: 'PUT',
      path: '/toppings/{id}',
      options: {
        auth: {
          scope: ['admin'],
        },
        tags: ['api', 'toppings'],
        description: 'Update topping by id',
        handler: ToppingController.updateTopping,
        validate: ToppingValidation.updateTopping,
        plugins: {
          'hapi-swagger': {
            response: {
              200: SwaggerDescription[200],
              404: SwaggerDescription[404],
              500: SwaggerDescription[500],
            },
          },
        },
      },
    },
    {
      method: 'DELETE',
      path: '/toppings/{id}',
      options: {
        auth: {
          scope: ['admin'],
        },
        tags: ['api', 'toppings'],
        description: 'Delete Topping by id',
        handler: ToppingController.deleteTopping,
        validate: ToppingValidation.deleteTopping,
        plugins: {
          'hapi-swagger': {
            response: {
              200: SwaggerDescription[200],
              404: SwaggerDescription[404],
              500: SwaggerDescription[500],
            },
          },
        },
      },
    },
  ])
}
