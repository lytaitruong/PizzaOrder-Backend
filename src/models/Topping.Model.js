const Mongoose = require('mongoose')
const ToppingSchema = new Mongoose.Schema({
  toppingName: { type: String, required: true, unique: true },
  imageUri: { type: String, required: true },
  unitPrice: { type: Number, required: true },
})
const model = Mongoose.model('toppings', ToppingSchema)

const getAllToppings = () => model.find().sort({ toppingName: 1 })

const getTopping = id => model.findById(id)

const createTopping = ({ toppingName, imageUri, unitPrice }) =>
  model.create({
    toppingName,
    imageUri,
    unitPrice,
  })

const updateTopping = (id, { toppingName, imageUri, unitPrice }) =>
  model.findByIdAndUpdate(id, {
    toppingName,
    imageUri,
    unitPrice,
  })

const deleteTopping = id => model.findByIdAndDelete(id)

module.exports = {
  getAllToppings,
  getTopping,
  createTopping,
  updateTopping,
  deleteTopping,
}
