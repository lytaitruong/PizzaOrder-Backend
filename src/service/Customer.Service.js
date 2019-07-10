const Boom = require('@hapi/boom')
const CustomerModel = require('../models/Customer.Model')

const getAllCustomers = async ({ limit, page }) => {
  const listCustomer = await CustomerModel.find()
    .skip(limit)
    .limit(limit * (page - 1))
    .sort({ email: 1 })
  return listCustomer
}

const getInformation = async id => {
  const customer = await CustomerModel.findById(id).populate('historyOrders', 'amount dateOrder')
  customer.historyOrders.reverse()
  return customer
}

const signUpCustomer = async ({ email, name, password, phoneNumber }) => {
  const customer = await CustomerModel.create({
    email,
    name,
    password,
    scope: 'user',
    phoneNumber,
    historyOrders: [],
  })
  return customer
}

const signInCustomer = async ({ email, password }) => {
  const customer = await CustomerModel.findOne({ email })
  const invalid = !customer || !(await customer.validatePassword(password))
  if (invalid) {
    throw Boom.conflict(`email or password is not correct`)
  }
  return customer
}

const updateCustomer = async (id, data) => {
  const customer = await CustomerModel.findByIdAndUpdate(id, data)
  return customer
}

const deleteCustomer = async id => {
  const customer = await CustomerModel.findByIdAndDelete(id)
  return customer
}

const changePassword = async (id, { password, newPassword, autPassword }) => {
  const customer = await CustomerModel.findById(id)
  if (!customer) {
    return null
  }
  const valid = (await customer.validatePassword(password)) && newPassword === autPassword
  if (valid) {
    const a = await customer.update({
      password: await customer.encryptPassword(newPassword),
    })
    return customer
  }
  throw Boom.badRequest(`password is not match`)
}

const addOrder = async (id, orderId) => {
  const customer = await CustomerModel.findByIdAndUpdate(id, {
    $push: { historyOrders: orderId },
  })
  return customer
}

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
