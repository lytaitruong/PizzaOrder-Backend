const Bcrypt = require('bcrypt')
const Mongoose = require('mongoose')
const CustomerSchema = new Mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  scope: { type: String, required: true, enum: ['admin', 'user'] },
  phoneNumber: { type: String, required: true },
  historyOrders: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'orders' }],
})

CustomerSchema.methods.encryptPassword = async function encryptPassword(password) {
  return Bcrypt.hashSync(password, 10)
}

CustomerSchema.methods.validatePassword = async function validatePassword(password) {
  return Bcrypt.compareSync(password, this.password)
}
CustomerSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next()
  this.password = await Bcrypt.hash(this.password, 10)
  return next()
})

const model = Mongoose.model('customers', CustomerSchema)

const getAllCustomers = ({ limit, page }) =>
  model
    .find()
    .skip(limit)
    .limit(limit * (page - 1))
    .sort({ email: 1 })

const getInformation = async id => {
  const customer = await model.findById(id)
  customer.historyOrders.reverse()
  return customer.populate('historyOrders', 'amount dateOrder')
}

const signUpCustomer = ({ email, name, password, phoneNumber }) =>
  model.create({
    email,
    name,
    password,
    scope: 'user',
    phoneNumber,
    historyOrders: [],
  })

const signInCustomer = async ({ email, password }) => {
  const customer = await model.findOne({ email })
  if (!customer) {
    return null
  }
  const invalid = !customer.validatePassword(password)
  if (invalid) {
    throw Boom.conflict(`email or password is not correct`)
  }
  return customer
}

const updateCustomer = (id, data) => model.findByIdAndUpdate(id, data)

const deleteCustomer = id => model.findByIdAndDelete(id)

const changePassword = async (id, { password, newPassword, autPassword }) => {
  const customer = await model.findById(id)
  if (!customer) {
    return null
  }
  const valid = (await customer.validatePassword(password)) && newPassword === autPassword
  if (valid) {
    await customer.update({ password: customer.encryptPassword(newPassword) })
    return customer
  }
  throw Boom.badRequest(`password is not match`)
}

const addOrder = (id, orderId) => model.findByIdAndUpdate(id, { $push: { historyOrders: orderId } })

module.exports = {
  getAllCustomers,
  getInformation,
  signUpCustomer,
  signInCustomer,
  updateCustomer,
  deleteCustomer,
  changePassword,
  addOrder,
}
