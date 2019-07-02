const CategoriesRoute = require('./routes/Categories.Route');
const CustomerRoute   = require('./routes/Customer.Route');
const ProductRoute    = require('./routes/Product.Route');
const ToppingRoute    = require('./routes/Topping.Route');
const OrderRoute      = require('./routes/Order.Route');
module.exports ={
    '/categories' : CategoriesRoute,
    '/customers'  : CustomerRoute,   
    '/products'   : ProductRoute,
    '/toppings'   : ToppingRoute,
    '/orders'     : OrderRoute,
}