const ToppingModel = require('../models/Topping.Model')

const getAllToppings = async () => {
  const listToppings = await ToppingModel.find().sort({ toppingName: 1 })
  return listToppings
}

const getTopping = async id => {
  const topping = await ToppingModel.findById(id)
  return topping
}

const createTopping = async ({ toppingName, imageUri, unitPrice }) => {
  const topping = await ToppingModel.create({
    toppingName,
    imageUri,
    unitPrice,
  })
  return topping
}

const updateTopping = async (id, { toppingName, imageUri, unitPrice }) => {
  const topping = await ToppingModel.findByIdAndUpdate(id, {
    toppingName,
    imageUri,
    unitPrice,
  })
  return topping
}

const deleteTopping = async id => {
  const topping = await ToppingModel.findByIdAndDelete(id)
  return topping
}

module.exports = {
  getAllToppings,
  getTopping,
  createTopping,
  updateTopping,
  deleteTopping,
}
