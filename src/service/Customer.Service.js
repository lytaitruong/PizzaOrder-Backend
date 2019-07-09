const Boom = require('@hapi/boom')
const CustomerModel = require('../models/Customer.Model')
module.exports = {
  getAllCustomers: async ({ limit, page }) => {
    const listCustomer = await CustomerModel.find()
      .skip(limit)
      .limit(limit * (page - 1))
      .sort({ email: 1 })
    return listCustomer
  },
  getInformation: async id => {
    const customer = await CustomerModel.findById(id).populate('historyOrders', 'amount dateOrder')
    customer.historyOrders.reverse()
    return customer
  },
  signUpCustomer: async ({ email, name, password, phoneNumber }) => {
    const valid = await CustomerModel.findOne({ email })
    return valid
      ? Boom.conflict(`This email have been registered`)
      : await CustomerModel.create({
          email,
          name,
          password,
          scope: 'user',
          phoneNumber,
          historyOrders: [],
        })
  },
  signInCustomer: async ({ email, password }) => {
    const customer = await CustomerModel.findOne({ email })
    const invalid = !customer || !(await customer.validatePassword(password))
    return invalid ? Boom.conflict(`email or password is not correct`) : customer
  },
  updateCustomer: async (id, data) => {
    const customer = await CustomerModel.findByIdAndUpdate(id, data)
    return customer
  },
  deleteCustomer: async id => {
    const customer = await CustomerModel.findByIdAndDelete(id)
    return customer
  },
  changePassword: async (id, { password, newPassword, autPassword }) => {
    const customer = await CustomerModel.findById(id)
    const valid = (await customer.validatePassword(password)) && newPassword === autPassword
    if (valid) {
      await customer.update({
        password: await customer.encryptPassword(newPassword),
      })
      return customer
    }
    return Boom.badRequest(`password is not match`)
  },
  addOrder: async (id, orderId) => {
    const customer = await CustomerModel.findByIdAndUpdate(id, {
      $push: { historyOrders: orderId },
    })
    return customer
  },
}
