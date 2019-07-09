const CategoriesService = require('../Categories.Service')
const CategoriesModel = require('../../models/Categories.Model')

const id = '2'
const resultCategories = [
  {
    _id: '1',
    categoryName: 'Pizza',
    imageUri: 'https://drive.google.com/link',
  },
  {
    _id: '2',
    categoryName: 'Drink',
    imageUri: 'https://drive.google.com/link',
  },
]
const payload = {
  categoryName: 'Drink',
  imageUri: 'https://drive.google.com/link',
}
describe('Test #getCategories', () => {
  test('Should return list Categories', async () => {
    CategoriesModel.find = jest.fn().mockResolvedValue(resultCategories)
    const categories = await CategoriesService.getCategories()
    expect(categories).toEqual(resultCategories)
  })

  test('Should return empty list Categories', async () => {
    CategoriesModel.find = jest.fn().mockResolvedValue([])
    const categories = await CategoriesService.getCategories()
    expect(categories).toEqual([])
  })
})

describe('Test #getCategory', () => {
  test('Should return category by Id', async () => {
    CategoriesModel.findById = jest.fn().mockResolvedValue(resultCategories[1])
    const category = await CategoriesService.getCategory(id)
    expect(category).toEqual(resultCategories[1])
  })
  test('Should return null by invalid Id', async () => {
    CategoriesModel.findById = jest.fn().mockResolvedValue(null)
    const category = await CategoriesService.getCategory(id)
    expect(category).toBeNull
  })
})

describe('Test #createCategory', () => {
  test('Should create category', async () => {
    CategoriesModel.create = jest.fn().mockResolvedValue(resultCategories[1])
    const category = await CategoriesService.createCategory(payload)
    expect(category).toEqual(resultCategories[1])
  })
})

describe('Test #updateCategory', () => {
  test('Should update category by Id', async () => {
    CategoriesModel.findByIdAndUpdate = jest.fn().mockResolvedValue(resultCategories[1])
    const category = await CategoriesService.updateCategory(id, payload)
    expect(category).toEqual(resultCategories[1])
  })
  test('Should return null by invalid Id', async () => {
    CategoriesModel.findByIdAndUpdate = jest.fn().mockResolvedValue(null)
    const category = await CategoriesService.updateCategory(id, payload)
    expect(category).toBeNull
  })
})

describe('Test #getCategory', () => {
  test('Should delete category by Id', async () => {
    CategoriesModel.findByIdAndDelete = jest.fn().mockResolvedValue(resultCategories[0])
    const category = await CategoriesService.deleteCategory(id)
    expect(category).toEqual(resultCategories[0])
  })
  test('Should return null by invalid Id', async () => {
    CategoriesModel.findByIdAndDelete = jest.fn().mockResolvedValue(null)
    const category = await CategoriesService.deleteCategory(id)
    expect(category).toBeNull
  })
})
