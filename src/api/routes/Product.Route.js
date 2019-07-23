const ProductController = require('../controllers/Product.Controller')
const ProductValidation = require('../validations/Product.Validation')
const SwaggerDescription = require('../../util/constant')
module.exports.register = async server => {
  server.bind(ProductController)
  server.route([
    {
      method: 'GET',
      path: '/bestsellers',
      options: {
        auth: false,
        tags: ['api', 'bestsellers'],
        description: 'Get bestSeller for each categories',
        handler: ProductController.getBestSeller,
        validate: ProductValidation.getBestSeller,
      },
    },
    {
      method: 'GET',
      path: '/products',
      options: {
        auth: false,
        tags: ['api', 'products'],
        description: 'Get all products of all categories',
        handler: ProductController.getAllProducts,
        validate: ProductValidation.getAllProducts,
      },
    },
    {
      method: 'GET',
      path: '/products/{id}',
      options: {
        auth: false,
        tags: ['api', 'products'],
        description: 'Get product by Id',
        handler: ProductController.getProduct,
        validate: ProductValidation.getProduct,
      },
    },
    {
      method: 'POST',
      path: '/products',
      options: {
        auth: {
          scope: ['admin'],
        },
        tags: ['api', 'products'],
        description: 'Create a new product',
        handler: ProductController.createProduct,
        validate: ProductValidation.createProduct,
      },
    },
    {
      method: 'PUT',
      path: '/products/{id}',
      options: {
        auth: {
          scope: ['admin'],
        },
        tags: ['api', 'products'],
        description: 'Update product by id',
        handler: ProductController.updateProduct,
        validate: ProductValidation.updateProduct,
      },
    },
    {
      method: 'DELETE',
      path: '/products/{id}',
      options: {
        auth: {
          scope: ['admin'],
        },
        tags: ['api', 'products'],
        description: 'Delete product by id',
        handler: ProductController.deleteProduct,
        validate: ProductValidation.deleteProduct,
      },
    },
  ])
}
