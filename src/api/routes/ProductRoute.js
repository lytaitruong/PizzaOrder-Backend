const ProductController = require('../controllers/ProductController')
const ProductValidation = require('../validations/ProductValidation')
/**
 **GET     : /products                         //Done                         
 **GET     : /products/{id}                    //Done
 *@POST    : /products          {admin}        //Done
 *?UPDATE  : /products/{}       {admin}        //Done
 *!DELETE  : /products/{}       {admin}        //Done
 
 */
module.exports.register = async(server) =>{
    server.bind(ProductController);
    server.route([{
        method  : 'GET',
        path    : '/products',
        options : {
            auth: false,
            //auth: {
            //      scope: 'admin',    
            //}
            tags: ['api','products'],
            description: 'Get all products of all categories',
            handler    : ProductController.getAllProducts,
            validate   : ProductValidation.getAllProducts,
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
        }
    },{
        method  : 'POST',
        path    : '/products',
        options : {
            auth: false,
            // auth: {
            //     scope: 'admin'
            // },
            tags: ['api','products'],
            description: 'Create product depend on categories ObjectId',
            handler    : ProductController.createProduct,
            validate   : ProductValidation.createProduct,
        }
    },{
        method  : 'PUT',
        path    : '/products/{id}',
        options : {
            auth: false,
            // auth: {
            //     scope: 'admin'
            // },
            tags: ['api', 'products'],
            description: 'Update product with id',
            handler    : ProductController.updateProduct,
            validate   : ProductValidation.updateProduct,
        }
    },{
        method  : 'DELETE',
        path    : '/products/{id}',
        options : {
            auth: false,
            // auth: {
            //     scope: 'admin'
            // },
            tags: ['api', 'products'],
            description: 'Delete product with id',
            handler    : ProductController.deleteProduct,
            validate   : ProductValidation.deleteProduct,
        }
    }])
}