const Config = require('../config')
const JWT = require('jsonwebtoken')
const generateToken = customer => {
  return JWT.sign(
    {
      id: customer._id,
      email: customer.email,
      scope: customer.scope,
    },
    Config.server.jwtKey,
    {
      algorithm: 'HS256',
    }
  )
}
module.exports = {
  generateToken,
}
