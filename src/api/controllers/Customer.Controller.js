const Boom = require('@hapi/boom')
const { Response, HandlerError } = require('../../util')
const { CODE } = require('../../util/constant')
const AuthService = require('../../service/Auth.Service')
const CustomerService = require('../../service/Customer.Service')
module.exports = {
  getAllCustomers: async (request, h) => {
    try {
      const customer = await CustomerService.getAllCustomers(request.query)
      return Response(h, customer, CODE.SUCCESS)
    } catch (error) {
      return HandlerError(error)
    }
  },
  getInformation: async (request, h) => {
    try {
      const { scope, _id } = request.auth.credentials
      const id = scope === 'admin' && request.params.id !== 'info' ? request.params.id : _id
      const customer = await CustomerService.getInformation(id)
      return Response(h, customer, CODE.SUCCESS)
    } catch (error) {
      return HandlerError(error)
    }
  },
  signUpCustomer: async (request, h) => {
    try {
      let customer = await CustomerService.signUpCustomer(request.payload)
      if (!Boom.isBoom(customer)) {
        request.cookieAuth.set(customer)
        customer = {
          _id: customer._id,
          token: AuthService.generateToken(customer),
        }
      }
      return Response(h, customer, CODE.CREATE)
    } catch (error) {
      return HandlerError(error)
    }
  },
  signInCustomer: async (request, h) => {
    try {
      let customer = await CustomerService.signInCustomer(request.payload)
      if (!Boom.isBoom(customer)) {
        request.cookieAuth.set(customer)
        customer = {
          _id: customer._id,
          token: AuthService.generateToken(customer),
        }
      }
      return Response(h, customer, CODE.SUCCESS)
    } catch (error) {
      return HandlerError(error)
    }
  },
  updateCustomer: async (request, h) => {
    try {
      const { scope, _id } = request.auth.credentials
      const id = scope === 'admin' && request.params.id !== 'info' ? request.params.id : _id
      const customer = await CustomerService.updateCustomer(id, request.payload)
      return Response(h, customer, CODE.SUCCESS)
    } catch (error) {
      return HandlerError(error)
    }
  },
  deleteCustomer: async (request, h) => {
    try {
      const customer = await CustomerService.deleteCustomer(request.params.id)
      return Response(h, customer, CODE.SUCCESS)
    } catch (error) {
      return HandlerError(error)
    }
  },
  signOutCustomer: async (request, h) => {
    try {
      request.cookieAuth.clear()
      return h.redirect('/')
    } catch (error) {
      return HandlerError(error)
    }
  },
  changePassword: async (request, h) => {
    try {
      const id = request.auth.credentials._id
      const customer = await CustomerService.changePassword(id, request.payload)
      return Response(h, customer, CODE.SUCCESS)
    } catch (error) {
      return HandlerError(error)
    }
  },
}
