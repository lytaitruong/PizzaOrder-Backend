const Mongoose = require('mongoose')
const ProductSchema = new Mongoose.Schema({
  productName: { type: String, required: true, unique: true },
  imageUri: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  categoryId: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'categories',
    required: true,
  },
  size: {
    S: { type: Number },
    L: { type: Number },
  },
  crust: {
    Thin: { type: Number },
    Thick: { type: Number },
  },
  price: { type: Number },
  sale: { type: Number, min: 0, max: 100, required: true },
  rating: { type: Number, min: 0, max: 5, required: true },
  topping: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'toppings' }],
})
const model = Mongoose.model('products', ProductSchema)
const getAllProducts = ({ id, limit, page }) =>
  model
    .find(id)
    .sort({ productName: 1 })
    .limit(limit)
    .skip(limit * (page - 1))
const getProduct = id => model.findById(id)
const createProduct = data => model.create(data)
const updateProduct = (id, data) => model.findByIdAndUpdate(id, data)
const deleteProduct = id => model.findByIdAndDelete(id)
const findListProduct = (listId, select, typePopulate = '', populate) =>
  model
    .find({ _id: { $in: listId } })
    .select(select)
    .populate(typePopulate, populate)
module.exports = {
  findListProduct,
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
}
