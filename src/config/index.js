module.exports = {
  server: {
    port: process.env.PORT || 3000,
    routePrefix: process.env.ROUTE || '',
    plugins: ['auth', 'cookie', 'logger', 'swagger'],
    cookieKey: process.env.COOKIE_KEY || 'X2CnTtvXwc7EOgEgVlVUqtokol4HQbfBOFp8sCj0',
    jwtKey: process.env.SECRET_KEY || 'qtokol4HQbfBOFp8sCj0X2CnTtvXwc7EOgEgVlVU',
    jwtExpiration: '8640000000', // 100 Days
  },
  database: {
    urlMongoAtlas: process.env.MONGO_ATLAS_URL,
    urlMongo: process.env.MONGO_URL || 'mongodb://localhost:27017/Pizza',
    dataUser: process.env.DATA_USER || 'lytaitruong',
    dataPass: process.env.DATA_PASS || 'Anhboydeptrai5',
  },
}
