const ObjectToArray = data => Object.entries(data).sort((a, b) => b[1] - a[1])

const countProductOrder = listOrder => {
  const listProduct = {}
  listOrder.forEach(order => {
    order.listOrderDetails.forEach(product => {
      listProduct[product._id] = !listProduct[product._id]
        ? product.quantity
        : listProduct[product._id] + product.quantity
    })
  })
  return listProduct
}

const classifyCategories = (listBestSeller, listProduct, listCategories) => {
  const classifyCategories = listCategories.reduce(
    (categories, category) => ((categories[category._id] = []), categories),
    {}
  )
  listBestSeller.forEach(bestSeller => {
    const product = listProduct.filter(pro => pro._id == bestSeller[0])[0]
    classifyCategories[product.categoryId].push(product)
  })
  return classifyCategories
}

module.exports = {
  ObjectToArray,
  countProductOrder,
  classifyCategories,
}
