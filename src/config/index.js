module.exports = {
    server: {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 4000,
        routePrefix: process.env.ROUTE || "",
        plugins: ["auth", 'cookie', 'logger', 'swagger'],
        cookieKey: process.env.COOKIE_KEY || "X2CnTtvXwc7EOgEgVlVUqtokol4HQbfBOFp8sCj0",
        jwtKey   : process.env.SECRET_KEY || "qtokol4HQbfBOFp8sCj0X2CnTtvXwc7EOgEgVlVU",
        jwtExpiration: '1h'
    },
    database:{
        urlMongoAtlas: `mongodb+srv://lytaitruong:Anhboydeptrai5@leeatschool-qo1pj.mongodb.net/test?retryWrites=true&w=majority`,
        urlMongo: process.env.MONGO_URL ||"mongodb://localhost:27017/Pizza",
        dataUser: process.env.DATA_USER ||"lytaitruong",
        dataPass: process.env.DATA_PASS ||"Anhboydeptrai5",
    }
}
