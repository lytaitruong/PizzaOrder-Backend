const CustomerModel = require('../../models/CustomerModel');
module.exports = {
    name: 'Cookie Session',
    version: '1.0.0',
    register: async (server, options) => {
        try{
            await server.register(require('@hapi/cookie'));
            server.auth.strategy('session', 'cookie', {
                cookie: {
                    name: 'managecustomer',
                    password: options.secretCookieKey,
                    isSecure: false
                },
                redirectTo: '/login',
                validateFunc: async (request, session) => {
                    const user = await CustomerModel.findById(session._id);
                    return (user) ? {valid: false, credentials: null}
                                  : {valid: true , credentials: user}
                }
            });
        }catch(error){
            console.log(`Error register cookie plugin: ${error}`);
            throw error;
        }
    }
}