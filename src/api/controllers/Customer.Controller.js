const CustomerService = require('../../service/Customer.Service');
module.exports = {
    getAllCustomers: async(request, h) =>{
        try{
            const listCustomers = await CustomerService.getAllCustomers(request.query);
            return h.response(listCustomers).code(200)
        }catch(error){
            throw error;
        }
    },
    getInformation: async(request, h) =>{
        try{
            const id = request.auth.credentials._id;
            const customer = await CustomerService.getInformation(id);
            return h.response(customer).code(200)
        }catch(error){
            throw error;
        }
    },
    signUpCustomer: async (request, h) =>{
        try{
            const customer = await CustomerService.signUpCustomer(request.payload)
            request.cookieAuth.set(customer);
            return h.response(customer.generateToken()).code(201);
        }catch(error){
            throw error;
        }
    },
    signInCustomer: async (request, h) => {
        try{
            const customer = await CustomerService.signInCustomer(request.payload);
            request.cookieAuth.set(customer);
            return h.response(customer.generateToken()).code(200)
        }catch(error){
            throw error;
        }
    },
    updateCustomer: async (request, h) =>{
        try{
            const customer = await CustomerService.updateCustomer(id,request.payload)
            return h.response(customer).code(200)
        }catch(error){
            throw error;
        }
    },
    deleteCustomer: async (request, h) =>{
        try{
            const customer = await CustomerService.deleteCustomer(request.params.id);
            return h.response(customer)
        }catch(error){
            throw error;
        }
    },
    signOutCustomer: async (request, h) =>{
        try{
            request.cookieAuth.clear();
            return h.redirect('/');
        }catch(error){
            throw error;
        }
    },
}