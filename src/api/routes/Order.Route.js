const OrderController = require('../controllers/Order.Controller')
const OrderValidation = require('../validations/Order.Validation')
const SwaggerResponse = require('../schema')
module.exports.register = server =>
  server.route([
    {
      method: 'GET',
      path: '/orders',
      options: {
        auth: {
          scope: ['admin'],
        },
        tags: ['api', 'orders'],
        description: 'Get All Orders',
        handler: OrderController.getAllOrders,
        validate: OrderValidation.getAllOrders,
        plugins: {
          'hapi-swagger': {
            response: {
              200: SwaggerResponse[200],
              500: SwaggerResponse[500],
            },
          },
        },
      },
    },
    {
      method: 'GET',
      path: '/orders/{id}',
      options: {
        tags: ['api', 'orders'],
        description: 'Get order by id',
        handler: OrderController.getOrder,
        validate: OrderValidation.getOrder,
        plugins: {
          'hapi-swagger': {
            response: {
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
      path: '/orders',
      options: {
        tags: ['api', 'orders'],
        description: 'Create a new Order',
        handler: OrderController.createOrder,
        validate: OrderValidation.createOrder,
        plugins: {
          'hapi-swagger': {
            response: {
              201: SwaggerResponse[201],
              400: SwaggerResponse[400],
              500: SwaggerResponse[500],
            },
          },
        },
      },
    },
    {
      method: 'DELETE',
      path: '/orders/{id}',
      options: {
        tags: ['api', 'orders'],
        description: 'Delete order by id',
        handler: OrderController.deleteOrder,
        validate: OrderValidation.deleteOrder,
        plugins: {
          'hapi-swagger': {
            response: {
              201: SwaggerResponse[201],
              400: SwaggerResponse[400],
              500: SwaggerResponse[500],
            },
          },
        },
      },
    },
  ])
