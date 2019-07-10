require('dotenv').config();
const Hapi = require('@hapi/hapi');
var Joi = require('@hapi/joi');
var consumer = require('./consumer');
var producer = require('./producer');
Joi.objectId = require('joi-objectid')(Joi);

const init = async () => {
   
    const server = Hapi.server({
        host: 'localhost',
        port: process.env.PORT
    });
    server.route({
        method:'GET',
        path: '/',
        handler : (res, h)=>{
            return 'Welcome to PizzaOrder Processor  :)'
        }
    });

    
    await server.start()
    console.log(`Server running at: ${server.info.uri}`);
    consumer;
}
   

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();