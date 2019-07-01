// const BestSellersController = require('../controllers/BestSellers.Controller');
// const BestSellersValidation = require('../validations/BestSellers.Validation');
// const SwaggerDescription    = require('../../util/constant')
// module.exports.register = async (server) => {
//     server.bind(BestSellersController);
//     server.route([{
//         method  : 'GET',
//         path    : '/bestsellers',
//         options : {
//             auth: false,
//             tags: ['api', 'bestseller'],
//             description: 'Get bestSeller for each categories',
//             handler    : BestSellersController.getBestSellers,
//             validate   : BestSellersValidation.getBestSellers,
//             plugins    : {
//                 'hapi-swagger':{
//                     response: {
//                         200: SwaggerDescription[200],
//                         500: SwaggerDescription[500],
//                     }
//                 }
//             }
//         }
//     },{
//         method  : 'POST',
//         path    : '/bestsellers',
//         options : {
//             auth: {
//                 scope: ['admin']
//             },
//             tags: ['api','bestseller'],
//             description: 'Create bestSeller for each categories',
//             handler    : BestSellersController.createBestSeller,
//             validate   : BestSellersValidation.createBestSeller,
//             plugins    : {
//                 'hapi-swagger':{
//                     response: {
//                         200: SwaggerDescription[200],
//                         500: SwaggerDescription[500],
//                     }
//                 }
//             }
//         }
//     }])
// }