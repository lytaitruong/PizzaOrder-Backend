const OrderController = require('../controllers/Order.Controller')
const OrderValidation = require('../validations/Order.Validation')
const SwaggerDescription = require('../../util/constant')
module.exports.register = async server => {
  server.bind(OrderController)
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
      },
    },
  ])
}
