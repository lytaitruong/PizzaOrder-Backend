module.exports.categoriesDTO = (categories) => {
    return {
        _id     : categories._id,
        imageUri: categories.imageUri
    }
}

module.exports.productDTO = (product) => {
    return {
        _id        : product._id,
        productName: product.productName,
        imageUri   : product.imageUri,
        type       : product.type, 
        description: product.description,
        categoryId : product.categoryId,
        size       : product.size,
        crust      : product.crust,
        price      : product.price,
        sale       : product.sale,
        rating     : product.rating,
        topping    : product.topping,
    }
}

module.exports.toppingDTO = (topping) => {
    return {
        _id        : topping._id,
        toppingName: topping.toppingName,
        imageUri   : topping.imageUri,
    }
}

module.exports.customerDTO = (customer) => {
    return {
        _id          : customer._id,
        email        : customer.email,
        name         : customer.name,
        scope        : customer.scope,
        phoneNumber  : customer.phoneNumber,
        historyOrders: customer.historyOrders
    }
}

module.exports.orderDTO = (order) => {
    return {
        _id            : order._id,
        customerId     : order.customerId,
        address        : order.address,
        amount         : order.amount,
        dateOrder      : order.dateOrder,
        listOrderDetail: order.listOrderDetail
    }
}