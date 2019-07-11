const CustomerService = require('../Customer.Service')
const CustomerModel = require('../../models/Customer.Model')
const Boom = require('@hapi/boom')
const resultCustomer = [
  {
    _id: '1',
    email: 'example@gmail.com',
    name: 'lytaitruong',
    password: 'encryptPassword',
    scope: 'user',
    phoneNumber: '0000000000',
    historyOrder: [],
  },
  {
    _id: '2',
    email: 'example@gmail.com',
    name: 'truongtaily',
    password: 'encryptPassword',
    scope: 'user',
    phoneNumber: '0000000000',
    historyOrder: ['1111'],
  },
]

const payloadCustomer = {
  email: 'example@gmail.com',
  name: 'lytaitruong',
  password: 'somethingjustlikethat',
  phoneNumber: '0000000000',
}
describe('Test #getAllCustomers', () => {})

describe('Test #updateCustomer', () => {
  it('Should update and return customer by id', async () => {
    CustomerModel.findByIdAndUpdate = jest.fn().mockResolvedValue(resultCustomer[0])
    const customer = await CustomerService.updateCustomer('1', payloadCustomer)
    expect(customer).toEqual(resultCustomer[0])
  })
  it('Should return null by invalid id', async () => {
    CustomerModel.findByIdAndUpdate = jest.fn().mockResolvedValue(null)
    const customer = await CustomerService.updateCustomer('0', payloadCustomer)
    expect(customer).toBeNull()
  })
})

describe('Test #deleteCustomer', () => {
  it('Should delete and return customer by id', async () => {
    CustomerModel.findByIdAndDelete = jest.fn().mockResolvedValue(resultCustomer[0])
    const customer = await CustomerService.deleteCustomer('1')
    expect(customer).toEqual(resultCustomer[0])
  })

  it('Should return null by invalid id', async () => {
    CustomerModel.findByIdAndDelete = jest.fn().mockResolvedValue(null)
    const customer = await CustomerService.deleteCustomer('0')
    expect(customer).toBeNull()
  })
})

describe('Test #changePassword', () => {
  it('Should update Password of customer by id', async () => {
    CustomerModel.findById = jest.fn().mockResolvedValue()
    const customer = resultCustomer()
    const customer = await CustomerModel.findById('1')
    customer.validatePassword = jest.fn().mockResolvedValue(true)
    customer.update = jest.fn().mockResolvedValue(true)
    customer.encryptPassword = jest.fn().mockResolvedValue('newPassword')
    expect(customer).toEqual(resultCustomer[0])
  })

  it('Should throw Boom.badRequest with invalid id or wrong password', async () => {
    CustomerModel.findById = jest.fn().mockResolvedValue(null)
    const customer = await CustomerModel.findById('0')
    expect(customer).toThrow(Boom.badRequest(`password is not match`))
  })
})

describe('Test #addOrder', () => {
  it('Should add new Order into customer historyOrder by id', async () => {
    CustomerModel.findByIdAndUpdate = jest.fn().mockResolvedValue(resultCustomer[1])
    const customer = await CustomerService.addOrder('2', '1111')
    expect(customer).toEqual(resultCustomer[1])
  })

  it('Should return null by invalid id', async () => {
    CustomerModel.findByIdAndUpdate = jest.fn().mockResolvedValue(null)
    const customer = await CustomerService.addOrder('0', '1111')
    expect(customer).toBeNull()
  })
})
