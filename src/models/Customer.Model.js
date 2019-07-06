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
  return await Bcrypt.hash(password, 10)
}

CustomerSchema.methods.validatePassword = async function validatePassword(password) {
  return await Bcrypt.compare(password, this.password)
}
CustomerSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next()
  this.password = await Bcrypt.hash(this.password, 10)
  return next()
})

module.exports = Mongoose.model('customers', CustomerSchema)
