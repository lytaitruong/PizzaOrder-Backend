const ToppingModel = require('../models/Topping.Model')

const getAllToppings = () => ToppingModel.getAllToppings()
const getTopping = id => ToppingModel.getTopping(id)
const createTopping = ({ toppingName, imageUri, unitPrice }) =>
  ToppingModel.createTopping({ toppingName, imageUri, unitPrice })
const updateTopping = (id, { toppingName, imageUri, unitPrice }) =>
  ToppingModel.updateTopping(id, { toppingName, imageUri, unitPrice })
const deleteTopping = id => ToppingModel.deleteTopping(id)
module.exports = {
  getAllToppings,
  getTopping,
  createTopping,
  updateTopping,
  deleteTopping,
}
