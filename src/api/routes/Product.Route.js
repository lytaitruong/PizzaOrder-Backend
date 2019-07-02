const ProductController  = require('../controllers/Product.Controller')
const ProductValidation  = require('../validations/Product.Validation')
const SwaggerDescription = require('../../util/constant');
module.exports.register = async(server) =>{
    server.bind(ProductController);
    server.route([{
        method  : 'GET',
        path    : '/bestsellers',
        options : {
            auth: false,
            tags: ['api', 'bestsellers'],
            description: 'Get bestSeller for each categories',
            handler    : ProductController.getBestSeller,
            validate   : ProductValidation.getBestSeller,
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
        path    : '/products',
        options : {
            auth: false,
            tags: ['api','products'],
            description: 'Get all products of all categories',
            handler    : ProductController.getAllProducts,
            validate   : ProductValidation.getAllProducts,
            plugins    : {
                'hapi-swagger': {
                    responses: {
                        200: SwaggerDescription[200],
                        500: SwaggerDescription[500],
                    }
                }
            }
        }
    },{
        method  : 'GET',
        path    : '/products/{id}',
        options : {
            auth: false,
            tags: ['api', 'products'],
            description: 'Get product by Id',
            handler    : ProductController.getProduct,
            validate   : ProductValidation.getProduct,
            plugins    : {
                'hapi-swagger': {
                    responses: {
                        200: SwaggerDescription[200],
                        404: SwaggerDescription[404],
                        500: SwaggerDescription[500],
                    }
                }
            }
        }
    },{
        method  : 'POST',
        path    : '/products',
        options : {
            auth: {
                scope: ['admin']
            },
            tags: ['api','products'],
            description: 'Create a new product',
            handler    : ProductController.createProduct,
            validate   : ProductValidation.createProduct,
            plugins    : {
                'hapi-swagger': {
                    responses: {
                        200: SwaggerDescription[200],
                        400: SwaggerDescription[400],
                        500: SwaggerDescription[500],
                    }
                }
            }
        }
    },{
        method  : 'PUT',
        path    : '/products/{id}',
        options : {
            auth: {
                scope: ['admin']
            },
            tags: ['api', 'products'],
            description: 'Update product with id',
            handler    : ProductController.updateProduct,
            validate   : ProductValidation.updateProduct,
            plugins    : {
                'hapi-swagger': {
                    responses: {
                        200: SwaggerDescription[200],
                        404: SwaggerDescription[404],
                        500: SwaggerDescription[500],
                    }
                }
            }
        }
    },{
        method  : 'DELETE',
        path    : '/products/{id}',
        options : {
            auth: {
                scope: ['admin']
            },
            tags: ['api', 'products'],
            description: 'Delete product with id',
            handler    : ProductController.deleteProduct,
            validate   : ProductValidation.deleteProduct,
            plugins    : {
                'hapi-swagger': {
                    responses: {
                        200: SwaggerDescription[200],
                        404: SwaggerDescription[404],
                        500: SwaggerDescription[500],
                    }
                }
            }
        }
    }])
}