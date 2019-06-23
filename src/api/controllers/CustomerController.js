const CustomerService = require('../../service/CustomerService')

module.exports = {
    getAllCustomers: async (request, h) =>{
        try{
            const listCustomers = await CustomerService.getAllCustomers();
            return h.response(listCustomers).code(200);
        }catch(error){
            throw error
        }
    },
    getInfoCustomer : async (request, h) =>{
        try{
            const id = request.auth.credentials.id
            const customer = await CustomerService.getInfoCustomer(id)
            return h.response(customer).code(200)
        }catch(error){
            throw error
        }
    },
    signUpCustomer: async (request, h) =>{
        try{
            const customer = await CustomerService.signUpCustomer(request.payload)
            return h.response(customer).code(201)
        }catch(error){
            throw error
        }
    },
    signInCustomer: async (request, h) =>{
        try{
            const customer = await CustomerService.signInCustomer(request.payload)
            return h.response(customer).code(200)
        }catch(error){
            throw error
        }
    },
    updateCustomer: async (request, h) =>{
        try{
            const id = request.auth.credentials.id
            const customer = await CustomerService.updateCustomer(id,request.payload)
            return h.response(customer).code(200)
        }catch(error){
            throw error
        }
    },
    deleteCustomer: async (request, h) =>{
        try{
            const customer = await CustomerService.deleteCustomer(request.params.id);
            return h.response(customer).code(200)
        }catch(error){
            throw error
        }
    }
}