const CategoriesRoute = require('./routes/CategoriesRoute');
const CustomerRoute   = require('./routes/CustomerRoute');
const ProductRoute    = require('./routes/ProductRoute');
const ToppingRoute    = require('./routes/ToppingRoute');
const OrderRoute      = require('./routes/OrderRoute');
module.exports ={
    '/categories': CategoriesRoute,
    '/users'     : CustomerRoute,   
    '/products'  : ProductRoute,
    '/toppings'  : ToppingRoute,
    '/orders'    : OrderRoute,
}