const Boom            = require('@hapi/boom')
const {Response}      = require('../../util/index');
const AuthService     = require('../../service/Auth.Service');
const CustomerService = require('../../service/Customer.Service');
module.exports = {
    getAllCustomers: async(request, h) =>{
        try{
            const listCustomers = await CustomerService.getAllCustomers(request.query);
            return Response(h, listCustomers, 200);
        }catch(error){
            console.log(error);
            throw Boom.internal();
        }
    },
    getInformation: async(request, h) =>{
        try{
            const id = request.auth.credentials._id;
            const customer = await CustomerService.getInformation(id);
            return Response(h, customer, 200);
        }catch(error){
            console.log(error);
            throw Boom.internal();
        }
    },
    signUpCustomer: async (request, h) =>{
        try{
            const customer = await CustomerService.signUpCustomer(request.payload)
            const token    = AuthService.generateToken(customer);
            request.cookieAuth.set(customer);
            return Response(h, token, 201);
        }catch(error){   
            console.log(error);
            throw Boom.internal();
        }
    },
    signInCustomer: async (request, h) => {
        try{
            const customer = await CustomerService.signInCustomer(request.payload);
            const token    = AuthService.generateToken(customer);
            request.cookieAuth.set(customer);
            return Response(h, token, 200);
        }catch(error){
            console.log(error);
            throw Boom.internal();
        }
    },
    updateCustomer: async (request, h) =>{
        try{
            const id = request.auth.credentials._id;
            const customer = await CustomerService.updateCustomer(id,request.payload)
            return Response(h, customer, 200);
        }catch(error){
            console.log(error);
            throw Boom.internal();
        }
    },
    deleteCustomer: async (request, h) =>{
        try{
            const customer = await CustomerService.deleteCustomer(request.params.id);
            return Response(h, customer, 200);
        }catch(error){   
            console.log(error);
            throw Boom.internal();
        }
    },
    signOutCustomer: async (request, h) =>{
        try{
            request.cookieAuth.clear();
            return h.redirect('/');
        }catch(error){
            console.log(error);
            throw Boom.internal();
        }
    },
}