const CustomerModel = require('../../models/CustomerModel');
module.exports = {
    name: 'JWT Authdentication',
    version: '1.0.0',
    register: async (server, options) =>{
        try{
            await server.register(require('hapi-auth-jwt2'));
            server.auth.strategy('token', 'jwt', {
                key          : options.jwtKey,
                validate     : validate,
                verifyOptions: {algorithms: ['HS256']}
            });
            server.auth.default('token');
        }catch(error){
            console.log(`Error register jwt plugin: ${error}`);
            throw error;
        }
    }
}
const validate = async(decoded, request, h) =>{
    console.log(`Go HERE ${decoded.id}`);
    const user = await CustomerModel.findById(decoded.id).lean(true);
    return (!user) ? {isValid: false, credentials: null}
                   : {isValid: true , credentials: user}; 
}