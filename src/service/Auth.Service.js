const Config = require('../config');
const JWT    = require('jsonwebtoken');
module.exports = {
    generateToken: (customer) =>{
        return JWT.sign({
            id      : customer._id,
            username: customer.username,
            scope   : customer.scope
        }, Config.server.jwtKey, {
            algorithm: 'HS256'
        })
    }
}