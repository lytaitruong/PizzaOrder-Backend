const AuthService = require('../../service/Auth.Service')
const CustomerService = require('../../service/Customer.Service')
const { HandleError, HandleResponse } = require('../../util/HandlerUtils')
const { CODE, SCOPE } = require('../../constant')
module.exports = {
  getAllCustomers: async (request, h) => {
    try {
      const customer = await CustomerService.getAllCustomers(request.query)
      return HandleResponse(h, customer, CODE.SUCCESS)
    } catch (error) {
      return HandleError(error, h)
    }
  },
  getInformation: async (request, h) => {
    try {
      const { scope, _id } = request.auth.credentials
      const id = scope === SCOPE.ADMIN && request.params.id !== SCOPE.INFO ? request.params.id : _id
      const customer = await CustomerService.getInformation(id)
      return HandleResponse(h, customer, CODE.SUCCESS)
    } catch (error) {
      return HandleError(error, h)
    }
  },
  signUpCustomer: async (request, h) => {
    try {
      const customer = await CustomerService.signUpCustomer(request.payload)
      request.cookieAuth.set(customer)
      const data = AuthService.generateToken(customer)
      return HandleResponse(h, data, CODE.CREATE)
    } catch (error) {
      return HandleError(error, h)
    }
  },
  signInCustomer: async (request, h) => {
    try {
      const customer = await CustomerService.signInCustomer(request.payload)
      request.cookieAuth.set(customer)
      const data = AuthService.generateToken(customer)
      return HandleResponse(h, data, CODE.SUCCESS)
    } catch (error) {
      return HandleError(error, h)
    }
  },
  updateCustomer: async (request, h) => {
    try {
      const { scope, _id } = request.auth.credentials
      const id = scope === SCOPE.ADMIN && request.params.id !== SCOPE.INFO ? request.params.id : _id
      const customer = await CustomerService.updateCustomer(id, request.payload)
      return HandleResponse(h, customer, CODE.SUCCESS)
    } catch (error) {
      return HandleError(error, h)
    }
  },
  deleteCustomer: async (request, h) => {
    try {
      const customer = await CustomerService.deleteCustomer(request.params.id)
      return HandleResponse(h, customer, CODE.SUCCESS)
    } catch (error) {
      return HandleError(error, h)
    }
  },
  signOutCustomer: async (request, h) => {
    try {
      request.cookieAuth.clear()
      return h.redirect('/')
    } catch (error) {
      return HandleError(error, h)
    }
  },
  changePassword: async (request, h) => {
    try {
      const customer = await CustomerService.changePassword(request.auth.crendentials._id, request.payload)
      return HandleResponse(h, customer, CODE.SUCCESS)
    } catch (error) {
      return HandleError(error, h)
    }
  },
}
