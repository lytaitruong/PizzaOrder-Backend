const OrderController = require('../controllers/OrderController');
const OrderValidation = require('../validations/OrderValidation');
module.exports.register = async(server) =>{
    server.bind(OrderController);
    server.route([{
        method  : 'GET',
        path    : '/orders',
        options : {
            auth: false,
            // auth:{
            //     scope: 'admin',     
            // },
            tags: ['api','orders'],
            description: 'Get All Orders',
            handler    : OrderController.getAllOrders,
            validate   : OrderValidation.getAllOrders,
        }
    },{
        method  : 'GET',
        path    : '/orders/{id}',
        options : {
            auth: false,
            // auth:{
            //     scope: 'admin',     
            // },
            tags: ['api','orders'],
            description: 'Get All Orders',
            handler    : OrderController.getOrder,
            validate   : OrderValidation.getOrder,
        }
    },{
        method  : 'POST',
        path    : '/orders',
        options : {
            auth: false,
            // auth:{
            //     scope: 'admin',     
            // },
            tags: ['api','orders'],
            description: 'Get All Orders',
            handler    : OrderController.createOrder,
            validate   : OrderValidation.createOrder,
        }
    },{
        method  : 'DELETE',
        path    : '/orders/{id}',
        options : {
            auth: false,
            // auth:{
            //     scope: 'admin',     
            // },
            tags: ['api','orders'],
            description: 'Get All Orders',
            handler    : OrderController.deleteOrder,
            validate   : OrderValidation.deleteOrder,
        }
    }])
}