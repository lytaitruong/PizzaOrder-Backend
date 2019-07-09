const ProductService = require('../Product.Service')
const ProductModel = require('../../models/Product.Model')

const productDataMock = (index) =>({
    productName: `productName${index}`,
    categoryId : `123`,
    description: `this is Product${index}`,
    imageUri   : `https://google.drive.com/link${index}`,
    type       : "PIZZA",
    size       : {S: index , L: index * 2},
    crust      : {Thin: index, L: index * 2}
})
const productInstanceMock = (index) => Object.assign({},productDataMock(index))

describe('Test #getAllProducts', () => {
    const listProductMock = Array(20).fill().map((value, index) =>
    productInstanceMock(index))
    test('Should return list products with default query', async () => {
        const defaultLimit = 0
        const defaultPage = 1
        ProductModel.find = jest.fn(() => ({
            sort: jest.fn(() => ProductModel.find()),
            limit: jest.fn(() => ProductModel.find()),
            skip: jest.fn().mockResolvedValue(listProductMock)
        }))
        const listProducts = await ProductService.getAllProducts({
            categoryId: null,
            limit: defaultLimit,
            page: defaultPage
        })
        expect(listProducts).toEqual(listProductMock)
    })
    test('Should return list product with categoryId', async () =>{
        const limit = 2
        const page  = 5
        const start = limit * (page -1)
        const listProductMockLimit = listProductMock.slice(start, start + limit)
        ProductModel.find = jest.fn(() => ({
            sort: jest.fn(() => ProductModel.find()),
            limit: jest.fn(() => ProductModel.find()),
            skip: jest.fn().mockResolvedValue(listProductMockLimit)
        }))
        const listProducts = await ProductService.getAllProducts({
            categoryId: "123",
            limit,
            page
        })
        expect(listProducts).toEqual(listProductMockLimit)
    })
})
const id = "1"
const resultProduct = [{
    _id        : "1",
    productName: "PizzaHut",
    imageUri   : "https: //drive.google.com/linkPizza",
    categoryId : "123",
    description: "This is pizza",
    type       : "PIZZA",
    size       : {S    : 5,L    : 10},
    crust      : {Thin : 5,Thick: 10,},
    sale       : 0,
    rating     : 5,
    topping    : ["1","2","3"]
},{
    _id        : "2",
    productName: "Domino",
    imageUri   : "https: //drive.google.com/linkPizza",
    categoryId : "123",
    description: "This is pizza",
    type       : "PIZZA",
    size       : {S    : 5,L    : 10},
    crust      : {Thin : 5,Thick: 10,},
    sale       : 0,
    rating     : 5,
    topping    : ["1","2","3"]
}]
const payload = {
    productName: "PizzaHut",
    imageUri   : "https: //drive.google.com/linkPizza",
    categoryId : "123",
    description: "This is pizza",
    type       : "PIZZA",
    size       : {S    : 5,L    : 10},
    crust      : {Thin : 5,Thick: 10,},
    sale       : 0,
    rating     : 5,
    topping    : ["1","2","3"]
}
describe('Test #DeleteProduct', () => {
    test('Should delete product by id', async () => {
        ProductModel.findById = jest.fn().mockResolvedValue(resultProduct[0])
        const product = await ProductService.getProduct(id)
        expect(product).toEqual(resultProduct[0])
    });
    test('Should return null by invalid id', async () =>{
        ProductModel.findById = jest.fn().mockResolvedValue(null)
        const product = await ProductService.getProduct(id)
        expect(product).toBeNull()
    })
});
describe('Test #createProduct', () => {
    test('Should delete product by id', async () => {
        ProductModel.create = jest.fn().mockResolvedValue(resultProduct[0])
        const product = await ProductService.createProduct(payload)
        expect(product).toEqual(resultProduct[0])
    });
});
describe('Test #updateProduct', () => {
    test('Should delete product by id', async () => {
        ProductModel.findByIdAndUpdate = jest.fn().mockResolvedValue(resultProduct[0])
        const product = await ProductService.updateProduct(id,payload)
        expect(product).toEqual(resultProduct[0])
    });
    test('Should return null by invalid id', async () =>{
        ProductModel.findByIdAndUpdate = jest.fn().mockResolvedValue(null)
        const product = await ProductService.updateProduct(id)
        expect(product).toBeNull()
    })
});
describe('Test #DeleteProduct', () => {
    test('Should delete product by id', async () => {
        ProductModel.findByIdAndDelete = jest.fn().mockResolvedValue(resultProduct[0])
        const product = await ProductService.deleteProduct(id)
        expect(product).toEqual(resultProduct[0])
    });
    test('Should return null by invalid id', async () =>{
        ProductModel.findByIdAndDelete = jest.fn().mockResolvedValue(null)
        const product = await ProductService.deleteProduct(id)
        expect(product).toBeNull()
    })
});


describe('#Test findArray', () => {
    const listId = ["1","2"]
    test('Should return list Topping by listId', async () => {
        ProductModel.find = jest.fn(() => ({
            select: jest.fn(() => ProductModel.find()),
            populate: jest.fn(() => Promise.resolve(resultProduct)),
        }))
        //ProductModel.populate = jest.fn(() => Promise.resolve(resultProduct))
        const listProducts = await ProductService.findArray(listId, null, null)
        expect(listProducts).toEqual(resultProduct)
    });
});