const OrderController    = require('../controllers/Order.Controller');
const OrderValidation    = require('../validations/Order.Validation');
const SwaggerDescription = require('../../util/constant');
module.exports.register = async(server) =>{
    server.bind(OrderController);
    server.route([{
        method  : 'GET',
        path    : '/orders',
        options : {
            auth:{
                scope: ['admin'],     
            },
            tags: ['api','orders'],
            description: 'Get All Orders',
            handler    : OrderController.getAllOrders,
            validate   : OrderValidation.getAllOrders,
            plugins    : {
                'hapi-swagger':{
                    response: {
                        200: SwaggerDescription[200],
                        500: SwaggerDescription[500],
                    }
                }
            }
        }
    },{
        method  : 'GET',
        path    : '/orders/{id}',
        options : {
            tags: ['api','orders'],
            description: 'Get order with id',
            handler    : OrderController.getOrder,
            validate   : OrderValidation.getOrder,
            plugins    : {
                'hapi-swagger':{
                    response: {
                        200: SwaggerDescription[200],
                        404: SwaggerDescription[404],
                        500: SwaggerDescription[500],
                    }
                }
            }
        }
    },{
        method  : 'POST',
        path    : '/orders',
        options : {
            tags: ['api','orders'],
            description: 'Create a new Order',
            handler    : OrderController.createOrder,
            validate   : OrderValidation.createOrder,
            plugins    : {
                'hapi-swagger':{
                    response: {
                        201: SwaggerDescription[201],
                        400: SwaggerDescription[400],
                        500: SwaggerDescription[500],
                    }
                }
            }
        }
    },{
        method  : 'DELETE',
        path    : '/orders/{id}',
        options : {
            auth:{
                scope: ['admin'],     
            },
            tags: ['api','orders'],
            description: 'Delete order with id',
            handler    : OrderController.deleteOrder,
            validate   : OrderValidation.deleteOrder,
            plugins    : {
                'hapi-swagger':{
                    response: {
                        200: SwaggerDescription[200],
                        404: SwaggerDescription[404],
                        500: SwaggerDescription[500],
                    }
                }
            }
        }
    }])
}