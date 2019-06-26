const CustomerController = require('../controllers/Customer.Controller');
const CustomerValidation = require('../validations/Customer.Validation');
module.exports.register = async(server) =>{
    server.bind(CustomerController);
    server.route([{
        method  : 'GET',
        path    : '/customers',
        options : {
            auth:{
                scope: ['admin']
            },
            tags: ['api','customers'],
            description: 'Get all customers',
            handler : CustomerController.getAllCustomers,
            validate: CustomerValidation.getAllCustomers,
        },
    },{
        method  : "GET",
        path    : "/customers/info",
        options : {
            tags: ["api", "customers"],
            description: "Get customer info.",
            handler    : CustomerController.getInformation,
            validate   : CustomerValidation.getInformation,
        },
    },{
        method  : "POST",
        path    : "/customers",
        options : {
            auth: false,
            tags: ["api", "customers"],
            description: "Create a new customer.",
            handler    : CustomerController.signUpCustomer,
            validate   : CustomerValidation.signUpCustomer, 
        },
    },{
        method: "POST",
        path: "/login",
        options: {
            auth: {
                strategy: 'session',
                mode: 'try'
            },
            tags: ["api", "customers"],
            description : "Sign In",
            handler     : CustomerController.signInCustomer,
            validate    : CustomerValidation.signInCustomer,
        },
    },{
        method  : "PUT",
        path    : "/customers/info",
        options : {
            tags: ["api", "customers"],
            description: "Update customer info.",
            handler : CustomerController.updateCustomer,
            validate: CustomerValidation.updateCustomer,
        },
    },{
        method  : "DELETE",
        path    : "/customers/{id}",
        options : {
            auth: {
                scope: ['admin']
            },
            tags: ["api", "customers"],
            description: "Delete current Customer.",
            handler    : CustomerController.deleteCustomer,
            validate   : CustomerValidation.deleteCustomer,
        },
    },{
        method: 'GET',
        path: '/logout',
        options: {
            auth:{
                strategy: 'session',
            },
            tags: ['api', 'customers'],
            description: 'Sign Out',
            handler    : CustomerController.signOutCustomer,
            validate   : CustomerValidation.signOutCustomer,
        }
    },{
        method: 'GET',
        path: '/',
        options: {
            auth: false,
            handler: async (request, h) =>{
                return `OK`;
            }
        }
    }]);
}