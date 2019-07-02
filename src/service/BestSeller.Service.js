module.exports = {
    ObjectToArray: (data, id, quantity) => {
        return Object.keys(data).map(value => {
            const JSON     = {};
            JSON[id]       = value,
            JSON[quantity] = data[value]
            return JSON;
        }).sort((a, b) => b.quantity - a.quantity)
    },
    countProductOrder: (listOrder) => {
        const listProduct = {};
        listOrder.forEach(order => {
            //console.log(order.amount)
            order.listOrderDetails.forEach(product => {
                listProduct[product._id] = !listProduct[product._id]
                    ? product.quantity
                    : listProduct[product._id] + product.quantity 
            })
        })
        return listProduct
    },
    classifyCategories: (listBestSeller, listProduct, listCategories) =>{
        const classifyCategories = module.exports.classify(listCategories)
        const list =  listBestSeller.map(value => 
            listProduct.filter(product => product._id == value._id)[0])
        list.forEach(bestSeller =>{
            classifyCategories[bestSeller.categoryId].push(bestSeller);
        })
        return classifyCategories
    },
    classify: (listCategories) =>{
        const list = {}
        listCategories.forEach(category =>{
            if(!list[category._id]){
                list[category._id] = [];
            }
        })
        return list;
    }
}