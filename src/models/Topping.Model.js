const Mongoose = require('mongoose')
const ToppingSchema = new Mongoose.Schema({
  toppingName: { type: String, required: true, unique: true },
  imageUri: { type: String, required: true },
  unitPrice: { type: Number, required: true },
})

const ToppingModel = Mongoose.model('toppings', ToppingSchema)
module.exports = ToppingModel
