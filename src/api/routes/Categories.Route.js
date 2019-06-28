const CategoriesController = require('../controllers/Categories.Controller')
const CategoriesValidation = require('../validations/Categories.Validation')
const SwaggerDescription   = require('../../util/constant');
module.exports.register = async (server) =>{
    server.bind(CategoriesController)
    server.route([{
        method  : 'GET',
        path    : '/categories',
        options : {
            auth: false,
            tags: ['api', 'categories'],
            description: 'Get all categories',
            handler    : CategoriesController.getCategories,
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
        path    : '/categories/{id}',
        options : {
            auth: false,
            tags: ['api', 'categories'],
            description: 'Get categories with id',
            handler    : CategoriesController.getCategory,
            validate   : CategoriesValidation.getCategory,
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
        path    : '/categories',
        options : {
            auth: {
                scope: ['admin']
            },
            tags: ['api', 'categories'],
            description: 'Create a new categories',
            handler    : CategoriesController.createCategory,
            validate   : CategoriesValidation.createCategory,
            plugins    : {
                'hapi-swagger': {
                    responses: {
                        201: SwaggerDescription[201],
                        400: SwaggerDescription[400],
                        500: SwaggerDescription[500],
                    }
                }
            }
        }
    },{
        method  : 'PUT',
        path    : '/categories/{id}',
        options : {
            auth: {
                scope: ['admin']
            },
            tags: ['api', 'categories'],
            description: 'Update Categories with id',
            handler    : CategoriesController.updateCategory,
            validate   : CategoriesValidation.updateCategory,
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
        path    : '/categories/{id}',
        options : {
            auth: {
                scope: ['admin']
            },
            tags: ['api', 'categories'],
            description: 'Delete Categories with id',
            handler    : CategoriesController.deleteCategory,
            validate   : CategoriesValidation.deleteCategory,
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