module.exports = {
    server: {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 3000,
        routePrefix: process.env.ROUTE || "",
        plugins: ["auth", 'cookie', 'logger', 'swagger'],
        secretCookieKey: process.env.COOKIE_KEY || "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        secretJwtKey   : process.env.SECRET_KEY || "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",

    },
    database:{
        urlMongo: process.env.MONGO_URL ||"mongodb://localhost:27017/Pizza",
        dataUser: process.env.DATA_USER ||"",
        dataPass: process.env.DATA_PASS ||"",
    }
}