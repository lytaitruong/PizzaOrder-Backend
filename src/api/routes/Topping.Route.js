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
      },
    },
  ])
}
