const CustomerModel = require('../models/Customer.Model')

const getAllCustomers = ({ limit, page }) => CustomerModel.getAllCustomer({ limit, page })
const getInformation = id => CustomerModel.getInformation(id)
const signUpCustomer = ({ email, name, password, phoneNumber }) =>
  CustomerModel.signUpCustomer({ email, name, password, phoneNumber })
const signInCustomer = ({ email, password }) => CustomerModel.signInCustomer({ email, password })
const updateCustomer = (id, data) => CustomerModel.updateCustomer(id, data)
const deleteCustomer = id => CustomerModel.deleteCustomer(id)
const changePassword = (id, { password, newPassword, autPassword }) =>
  CustomerModel.changePassword(id, { password, newPassword, autPassword })
const addOrder = (id, orderId) => CustomerModel.addOrder(id, orderId)
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
