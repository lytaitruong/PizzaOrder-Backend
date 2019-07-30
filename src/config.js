const path = require('path')
const envRootPath = path.resolve(process.cwd(), '.env')
const config = {}
switch (process.env.NODE_ENV) {
  case 'staging':
    config.path = `${envRootPath}.staging`
    break
  case 'production':
    config.path = `${envRootPath}.production`
    break
  default:
    config.path = `${envRootPath}.development`
    break
}
require('dotenv').config(config)
module.exports = {
  server: {
    port: process.env.PORT,
    routePrefix: process.env.ROUTE || '',
    cookieKey: process.env.COOKIE_KEY || 'X2CnTtvXwc7EOgEgVlVUqtokol4HQbfBOFp8sCj0',
    jwtKey: process.env.SECRET_KEY || 'qtokol4HQbfBOFp8sCj0X2CnTtvXwc7EOgEgVlVU',
    jwtExpiration: '1h',
  },
  database: {
    urlMongoAtlas: process.env.MONGO_ATLAS_URL,
    urlMongo: process.env.MONGO_URL || 'mongodb://localhost:27017/Pizza',
    dataUser: process.env.DATA_USER || 'lytaitruong',
    dataPass: process.env.DATA_PASS || 'Anhboydeptrai5',
  },
}
