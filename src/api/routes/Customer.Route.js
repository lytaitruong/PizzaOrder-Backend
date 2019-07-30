const CustomerController = require('../controllers/Customer.Controller')
const CustomerValidation = require('../validations/Customer.Validation')
const SwaggerResponse = require('../schema')
module.exports.register = server =>
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
              200: SwaggerResponse[200],
              500: SwaggerResponse[500],
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
        description: 'Get customer info by id.',
        handler: CustomerController.getInformation,
        validate: CustomerValidation.getInformation,
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
              201: SwaggerResponse[201],
              409: SwaggerResponse[409],
              500: SwaggerResponse[500],
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
        description: 'Update customer by id.',
        handler: CustomerController.updateCustomer,
        validate: CustomerValidation.updateCustomer,
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
      method: 'DELETE',
      path: '/customers/{id}',
      options: {
        auth: {
          scope: ['admin'],
        },
        tags: ['api', 'customers'],
        description: 'Delete Customer by id.',
        handler: CustomerController.deleteCustomer,
        validate: CustomerValidation.deleteCustomer,
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
              200: SwaggerResponse[200],
              409: SwaggerResponse[409],
              500: SwaggerResponse[500],
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
              200: SwaggerResponse[200],
              400: SwaggerResponse[400],
              500: SwaggerResponse[500],
            },
          },
        },
      },
    },
  ])
