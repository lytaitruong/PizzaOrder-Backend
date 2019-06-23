const CustomerController = require('../controllers/CustomerController');
const CustomerValidation = require('../validations/CustomerValidation');
module.exports.register = async (server) =>{
    server.bind(CustomerController);
    server.route([{
        method  : 'GET',
        path    : '/users',
        options : {
            auth: false,
            // auth: {
            //     scope: 'admin'
            // },
            tags: ['api','users'],
            description: 'get Information of All Customers',
            handler    : CustomerController.getAllCustomers,
            validate   : CustomerValidation.getAllCustomers,
        }
    },{
        method  : 'GET',
        path    : '/users/info',
        options : {
            auth: false,
            tags: ['api','users'],
            description: 'get My information',
            handler    : CustomerController.getInfoCustomer,
            validate   : CustomerValidation.getInfoCustomer,
        }
    },{
        method  : 'POST',
        path    : '/users',
        options : {
            auth: false,
            tags: ['api', 'users'],
            description: 'create a Customer',
            handler    : CustomerController.signUpCustomer,
            validate   : CustomerValidation.signUpCustomer,
        }
    },{
        method  : 'POST',
        path    : '/login',
        options : {
            auth: false,
            tags: ['api', 'users'],
            description: 'sign In',
            handler    : CustomerController.signInCustomer,
            validate   : CustomerValidation.signInCustomer,
        }
    },{
        method  : 'PUT',
        path    : '/users/info',
        options : {
            auth: false,
            tags: ['api', 'users'],
            description: 'Change Information of Customers',
            handler    : CustomerController.updateCustomer,
            validate   : CustomerValidation.updateCustomer,
        }
    },{
        method  : 'DELETE',
        path    : '/users/{id}',
        options : {
            auth: false,
            // auth: {
            //     scope: 'admin'
            // },
            tags: ['api','users'],
            description: 'Delete Customers',
            handler    : CustomerController.deleteCustomer,
            validate   : CustomerValidation.deleteCustomer,
        }
    }])
}