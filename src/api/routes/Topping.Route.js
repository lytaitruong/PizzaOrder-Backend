const ToppingController = require('../controllers/Topping.Controller');
const ToppingValidation = require('../validations/Topping.Validation');
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
        }
    },{
        method  : 'POST',
        path    : '/toppings',
        options : {
            auth: {
                scope: ['admin']    
            },
            tags: ['api','toppings'],
            description: 'Create a new topping',
            handler    : ToppingController.createTopping,
            validate   : ToppingValidation.createTopping,
        }
    },{
        method  : 'PUT',
        path    : '/toppings/{id}',
        options : {
            auth: {
                scope: ['admin']    
            },
            tags: ['api','toppings'],
            description: 'Update topping with id',
            handler    : ToppingController.updateTopping,
            validate   : ToppingValidation.updateTopping,
        }
    },{
        method  : 'DELETE',
        path    : '/toppings/{id}',
        options : {
            auth: {
                scope: ['admin']    
            },
            tags: ['api','toppings'],
            description: 'Delete Topping with id',
            handler    : ToppingController.deleteTopping,
            validate   : ToppingValidation.deleteTopping,
        }
    }])
}