const ToppingService = require('../Topping.Service')
const ToppingModel = require('../../models/Topping.Model')
const id = '1'
const resultTopping = [
  {
    _id: '1',
    toppingName: 'Shrimp',
    imageUri: 'https://drive.google.com/link',
    unitPrice: 10000,
  },
  {
    _id: '2',
    toppingName: 'Crab',
    imageUri: 'https://drive.google.com/link',
    unitPrice: 15000,
  },
]
const payload = {
  toppingName: 'Shrimp',
  imageUri: 'https://drive.google.com/link',
  unitPrice: 15000,
}
describe('Test #getAllToppings', () => {
  test('Should return list Topping', async () => {
    ToppingModel.find = jest.fn(() => ({ sort: jest.fn().mockResolvedValue(resultTopping) }))
    const topping = await ToppingService.getAllToppings()
    expect(topping).toEqual(resultTopping)
  })
  test('Should return a empty list Topping', async () => {
    ToppingModel.find = jest.fn(() => ({ sort: jest.fn().mockResolvedValue([]) }))
    const topping = await ToppingService.getAllToppings()
    expect(topping).toEqual([])
  })
})

describe('Test #GetTopping', () => {
  test('Should return topping by id', async () => {
    ToppingModel.findById = jest.fn().mockResolvedValue(resultTopping[0])
    const topping = await ToppingService.getTopping(id)
    expect(topping).toEqual(resultTopping[0])
  })

  test('Should return null by invalid id ', async () => {
    ToppingModel.findById = jest.fn().mockResolvedValue(null)
    const topping = await ToppingService.getTopping(id)
    expect(topping).toBeNull()
  })
})
describe('Test #createTopping', () => {
  test('Should create topping', async () => {
    ToppingModel.create = jest.fn().mockResolvedValue(resultTopping[0])
    const topping = await ToppingService.createTopping(payload)
    expect(topping).toEqual(resultTopping[0])
  })
})

describe('Test #updateTopping', () => {
  test('Should update topping by id', async () => {
    ToppingModel.findByIdAndUpdate = jest.fn().mockResolvedValue(resultTopping[0])
    const topping = await ToppingService.updateTopping(id, payload)
    expect(topping).toEqual(resultTopping[0])
  })
  test('Should return null by invalid id', async () => {
    ToppingModel.findByIdAndUpdate = jest.fn().mockResolvedValue(null)
    const topping = await ToppingService.updateTopping(id, payload)
    expect(topping).toBeNull()
  })
})

describe('Test #deleteTopping', () => {
  test('Should delete topping by id', async () => {
    ToppingModel.findByIdAndDelete = jest.fn().mockResolvedValue(resultTopping[0])
    const topping = await ToppingService.deleteTopping(id)
    expect(topping).toEqual(resultTopping[0])
  })
  test('Should return null by invalid id', async () => {
    ToppingModel.findByIdAndDelete = jest.fn().mockResolvedValue(null)
    const topping = await ToppingService.deleteTopping(id)
    expect(topping).toBeNull()
  })
})
