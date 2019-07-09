const AuthService = require('../Auth.Service')
const JWT = require('jsonwebtoken')

const customer = {
  _id: '1',
  email: 'example@gmail.com',
  scope: 'user',
}
describe('Name of the group', () => {
  it('Should return a token', () => {
    JWT.sign = jest.fn(() => 'token')
    expect(AuthService.generateToken(customer)).toEqual('token')
  })
})
