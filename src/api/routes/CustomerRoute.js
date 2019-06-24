'use strict';
const CustomerController = require('../controllers/CustomerController');
const CustomerValidation = require('../validations/CustomerValidation');
module.exports.register = async(server) =>{
    server.bind(CustomerController);
    server.route([{
        method  : 'GET',
        path    : '/users',
        options : {
            auth:{
                scope: ['admin']
            },
            tags: ['api','users'],
            description: 'Get all customers',
            handler : CustomerController.getAllCustomers,
            validate: CustomerValidation.getAllCustomers,
        },
    },{
        method  : "GET",
        path    : "/users/info",
        options : {
            tags: ["api", "users"],
            description: "Get Customer info.",
            handler    : CustomerController.getInformation,
            validate   : CustomerValidation.getInformation,
        },
    },{
        method  : "POST",
        path    : "/users",
        options : {
            auth: false,
            tags: ["api", "users"],
            description: "Create a Customer.",
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
            tags: ["api", "users"],
            description : "Login a Customer.",
            handler     : CustomerController.signInCustomer,
            validate    : CustomerValidation.signInCustomer,
        },
    },{
        method  : "PUT",
        path    : "/users/info",
        options : {
            tags: ["api", "users"],
            description: "Update current Customer info.",
            handler : CustomerController.updateCustomer,
            validate: CustomerValidation.updateCustomer,
        },
    },{
        method  : "DELETE",
        path    : "/users/{id}",
        options : {
            auth: {
                scope: ['admin']
            },
            tags: ["api", "Customers"],
            description: "Delete current Customer.",
            handler    : CustomerController.deleteCustomer,
            validate   : CustomerValidation.deleteCustomer,
        },
    },{
        method: 'GET',
        path: '/',
        options: {
            auth:{
                strategy: 'session',
            },
            handler: (request, h) => {
                return internals.renderHtml.home(request.auth.credentials.email);
            },
        }
    },{
        method: 'GET',
        path: '/login',
        options: {
            auth: {
                strategy: 'session',
                mode: 'try'
            },
            handler: async (request, h) => {
                if (request.auth.isAuthenticated) {
                    return h.redirect('/');
                }
                return internals.renderHtml.login();
            },
            plugins: {
                'hapi-auth-cookie': {
                    redirectTo: false
                }
            },
        }
    },{
        method: 'GET',
        path: '/logout',
        options: {
            auth:{
                strategy: 'session',
            },
            tags: ['api', 'users'],
            description: 'Sign Out the account of Customer',
            handler    : CustomerController.signOutCustomer,
            validate   : CustomerValidation.signOutCustomer,
        }
    }]);
}
const internals = {};
internals.renderHtml = {
    login: (message) => {

        return `
    <html><head><title>Login page</title></head><body>
    ${message ? '<h3>' + message + '</h3><br/>' : ''}
    <form method="post" action="/login">
      Customername: <input type="text" name="email"><br>
      Password: <input type="password" name="password"><br/>
    <input type="submit" value="Login"></form>
    </body></html>
      `;
    },
    home: (name) => {

        return `
    <html><head><title>Login page</title></head><body>
    <h3>Welcome ${name}! You are logged in!</h3>
    <form method="get" action="/logout">
      <input type="submit" value="Logout">
    </form>
    </body></html>
      `;
    }
};