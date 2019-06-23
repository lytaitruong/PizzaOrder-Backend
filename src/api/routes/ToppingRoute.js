const ToppingController = require('../controllers/ToppingController');
const ToppingValidation = require('../validations/ToppingValidation');
module.exports.register = async (server) =>{
    server.bind(ToppingController);
    server.route([{
        method  : 'GET',
        path    : '/toppings',
        options : {
            auth: false,
            tags: ['api','toppings'],
            description: 'Get all topping',
            handler    : ToppingController.getAllToppings,
            validate   : ToppingValidation.getAllToppings,
        }
    },{
        method  : 'GET',
        path    : '/toppings/{id}',
        options : {
            auth: false,
            tags: ['api','toppings'],
            description: 'Get topping with id',
            handler    : ToppingController.getTopping,
            validate   : ToppingValidation.getTopping,
        }
    },{
        method  : 'POST',
        path    : '/toppings',
        options : {
            auth: false,
            //auth: {
            // scope: 'admin'    
            //},
            tags: ['api','toppings'],
            description: 'Create a new topping',
            handler    : ToppingController.createTopping,
            validate   : ToppingValidation.createTopping,
        }
    },{
        method  : 'PUT',
        path    : '/toppings/{id}',
        options : {
            auth: false,
            //auth: {
            // scope: 'admin'    
            //},
            tags: ['api','toppings'],
            description: 'Update topping with id',
            handler    : ToppingController.updateTopping,
            validate   : ToppingValidation.updateTopping,
        }
    },{
        method  : 'DELETE',
        path    : '/toppings/{id}',
        options : {
            auth: false,
            //auth: {
            // scope: 'admin'    
            //},
            tags: ['api','toppings'],
            description: 'Delete Topping with id',
            handler    : ToppingController.deleteTopping,
            validate   : ToppingValidation.deleteTopping,
        }
    }])
}