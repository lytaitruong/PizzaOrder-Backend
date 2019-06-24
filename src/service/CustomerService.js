const Boom          = require('@hapi/boom');
const CustomerModel = require('../models/CustomerModel');
module.exports = {
    getAllCustomers: async ({limit, page}) => { 
        const customer = await CustomerModel.find()
                                            .skip(limit)
                                            .limit(limit*(page-1))
                                            .sort({'username': -1})
        if(!customer){
            throw Boom.notFound(`DATA IS EMPTY`)
        }
        return customer;
    },
    getInformation: async (id) =>{
        const customer = await CustomerModel.findById(id)
        if(!customer){
           throw Boom.notFound(`USER NOT FOUND`)
        }
        return customer;
    },
    signUpCustomer: async ({username, email, password, scope}) =>{
        const customer = await CustomerModel.signUp({username,email,password,scope});
        if(!customer){
            throw Boom.internal()
        }
        return customer;
    },
    signInCustomer: async ({username,password}) =>{
        const customer = await CustomerModel.signIn({username,password})
        if(!customer){
            throw Boom.internal()
        }
        return customer;
    },
    updateCustomer: async (id, data) =>{
        const customer = await CustomerModel.findByIdAndUpdate(id,data);
        if(!customer){
            throw Boom.notFound(`CUSTOMER NOT FOUND`)
        }
        return customer;
    },
    deleteCustomer: async (id) =>{
        console.log(id);
        const customer = await CustomerModel.findByIdAndDelete(id)
        if(!customer){
            throw Boom.notFound(`CUSTOMER NOT FOUND!`)
        }
        return customer;
    },
}
