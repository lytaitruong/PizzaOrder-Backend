const ToppingModel = require('../models/Topping.Model')
module.exports = {
  getAllToppings: async () => {
    const listToppings = await ToppingModel.find().sort({ toppingName: 1 })
    return listToppings
  },
  getTopping: async id =>{
    console.log(id)
    const topping = await ToppingModel.findById(id)
    return topping;
  },
  createTopping: async ({ toppingName, imageUri, unitPrice }) => {
    const topping = await ToppingModel.create({
      toppingName,
      imageUri,
      unitPrice,
    })
    return topping
  },
  updateTopping: async (id, { toppingName, imageUri, unitPrice }) => {
    const topping = await ToppingModel.findByIdAndUpdate(id, {
      toppingName,
      imageUri,
      unitPrice,
    })
    return topping
  },
  deleteTopping: async id => {
    const topping = await ToppingModel.findByIdAndDelete(id)
    return topping
  },
}
