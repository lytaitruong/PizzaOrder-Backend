// const Boom               = require('@hapi/boom')
// const OrderService       = require('../../service/Order.Service');
// const ProductService     = require('../../service/Product.Service');
// const {Time, ObjectToArray, countProductOrder} = require('../../util')
// module.exports = {
//     getBestSellers: async (request, h) =>{
//         const {from, to} = request.query;
//         const listOrder = await OrderService.getAllOrders(Time(from), Time(to));
//         if(Boom.isBoom(listOrder)){
//             return listOrder
//         }
//         const listProductCount = countProductOrder(listOrder);
//         const bestSeller       = ObjectToArray(listProductCount, "_id", "quantity")
//         const bestSellerID     = bestSeller.map(product => product._id);
//         const listProduct      = await ProductService.findArray(bestSellerID,
//             "productName type description imageUri");
//         return listProduct;
//     },
//     createBestSeller: async (request, h) =>{

//     }
// }

