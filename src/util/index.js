const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');

module.exports.Time = (date) => {
  return new Date(date).getTime()
}
module.exports.getDate = (time) => {
  return (time) ? new Date(time).toLocaleDateString() : new Date().toLocaleDateString()
}


module.exports.jwtValidator = Joi.object().keys({
  authorization: Joi.string().required()
}).unknown()


module.exports.Response = (h, data, statusCode) => {
  return (Boom.isBoom(data)) ? data :
    h.response(data).code(statusCode)
}


module.exports.ObjectToArray = (data, id, quantity) => {
  return Object.keys(data).map(value => {
    const JSON = {};
    JSON[id] = value,
      JSON[quantity] = data[value]
    return JSON;
  })
}

module.exports.countProductOrder = (listOrder, typeCategories) => {
  const listProduct = {};
  listOrder.forEach(order => {
    //console.log(order.amount)
    order.listOrderDetails.forEach(product => {
      if(product.type === typeCategories || !typeCategories)
        if (!listProduct[product._id]) {
          listProduct[product._id] = product.quantity
        } else {
          listProduct[product._id] += product.quantity
        }
    })
  })
  return listProduct
}