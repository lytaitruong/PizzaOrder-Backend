const CustomerController = require('../controllers/Customer.Controller')
const CustomerValidation = require('../validations/Customer.Validation')
const SwaggerDescription = require('../../util/constant')
module.exports.register = async server => {
  server.bind(CustomerController)
  server.route([
    {
      method: 'GET',
      path: '/customers',
      options: {
        auth: {
          scope: ['admin'],
        },
        tags: ['api', 'customers'],
        description: 'Get all customers',
        handler: CustomerController.getAllCustomers,
        validate: CustomerValidation.getAllCustomers,
        plugins: {
          'hapi-swagger': {
            response: {
              200: SwaggerDescription[200],
              500: SwaggerDescription[500],
            },
          },
        },
      },
    },
    {
      method: 'GET',
      path: '/customers/{id}',
      options: {
        tags: ['api', 'customers'],
        description: 'Get customer info with id.',
        handler: CustomerController.getInformation,
        validate: CustomerValidation.getInformation,
        plugins: {
          'hapi-swagger': {
            response: {
              200: SwaggerDescription[200],
              404: SwaggerDescription[404],
              500: SwaggerDescription[500],
            },
          },
        },
      },
    },
    {
      method: 'POST',
      path: '/customers',
      options: {
        auth: false,
        tags: ['api', 'customers'],
        description: 'Create a new customer.',
        handler: CustomerController.signUpCustomer,
        validate: CustomerValidation.signUpCustomer,
        plugins: {
          'hapi-swagger': {
            response: {
              201: SwaggerDescription[201],
              409: SwaggerDescription[409],
              500: SwaggerDescription[500],
            },
          },
        },
      },
    },
    {
      method: 'PUT',
      path: '/customers/{id}',
      options: {
        tags: ['api', 'customers'],
        description: 'Update customer with id.',
        handler: CustomerController.updateCustomer,
        validate: CustomerValidation.updateCustomer,
        plugins: {
          'hapi-swagger': {
            response: {
              200: SwaggerDescription[200],
              404: SwaggerDescription[404],
              500: SwaggerDescription[500],
            },
          },
        },
      },
    },
    {
      method: 'DELETE',
      path: '/customers/{id}',
      options: {
        auth: {
          scope: ['admin'],
        },
        tags: ['api', 'customers'],
        description: 'Delete Customer with id.',
        handler: CustomerController.deleteCustomer,
        validate: CustomerValidation.deleteCustomer,
        plugins: {
          'hapi-swagger': {
            response: {
              200: SwaggerDescription[200],
              404: SwaggerDescription[404],
              500: SwaggerDescription[500],
            },
          },
        },
      },
    },
    {
      method: 'GET',
      path: '/logout',
      options: {
        auth: {
          strategy: 'session',
        },
        tags: ['api', 'customers'],
        description: 'Sign Out',
        handler: CustomerController.signOutCustomer,
        validate: CustomerValidation.signOutCustomer,
      },
    },
    {
      method: 'POST',
      path: '/login',
      options: {
        auth: {
          strategy: 'session',
          mode: 'try',
        },
        tags: ['api', 'customers'],
        description: 'Sign In',
        handler: CustomerController.signInCustomer,
        validate: CustomerValidation.signInCustomer,
        plugins: {
          'hapi-swagger': {
            response: {
              200: SwaggerDescription[200],
              409: SwaggerDescription[409],
              500: SwaggerDescription[500],
            },
          },
        },
      },
    },
    {
      method: 'PUT',
      path: '/changePassword',
      options: {
        tags: ['api', 'customers'],
        description: 'Change password of Customer',
        handler: CustomerController.changePassword,
        validate: CustomerValidation.changePassword,
        plugins: {
          'hapi-swagger': {
            response: {
              200: SwaggerDescription[200],
              400: SwaggerDescription[400],
              500: SwaggerDescription[500],
            },
          },
        },
      },
    },
  ])
}
