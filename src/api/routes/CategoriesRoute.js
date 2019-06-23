const CategoriesController = require('../controllers/CategoriesController')
const CategoriesValidation = require('../validations/CategoriesValidation')
/**
 **GET     : /categories                     //Done  
 **GET     : /categories/{id}                //Done
 *@POST    : /categories        {admin}      //Done
 *?UPDATE  : /categories/{id}   {admin}      //Done
 *!DELETE  : /categories/{id}   {admin}      //Done
 */
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
            validate   : CategoriesValidation.getCategories,
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
        }
    },{
        method  : 'POST',
        path    : '/categories',
        options : {
            auth: false,
            // auth: {
            //     scope: 'admin'
            // },
            tags: ['api', 'categories'],
            description: 'Create a new categories',
            handler    : CategoriesController.createCategory,
            validate   : CategoriesValidation.createCategory,
        }
    },{
        method  : 'PUT',
        path    : '/categories/{id}',
        options : {
            auth: false,
            // auth: {
            //     scope: 'admin'
            // },
            tags: ['api', 'categories'],
            description: 'Update Categories with id',
            handler    : CategoriesController.updateCategory,
            validate   : CategoriesValidation.updateCategory,
        }
    },{
        method  : 'DELETE',
        path    : '/categories/{id}',
        options : {
            auth: false,
            // auth: {
            //     scope: 'admin'
            // },
            tags: ['api', 'categories'],
            description: 'Delete Categories with id',
            handler    : CategoriesController.deleteCategory,
            validate   : CategoriesValidation.deleteCategory,
        }
    }])
}