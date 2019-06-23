const CustomerModel = require('../models/CustomerModel');
const Boom = require('@hapi/boom')
module.exports = {
    getAllCustomers: async () =>{
        const listCustomers = await CustomerModel.find()
                                                 .select('username email')
                                                 .limit(100)
                                                 .sort({'username': 1})
        if(!listCustomers){
            throw Boom.notFound(`CUSTOMER DATA NOT FOUND!`)
        }
        return listCustomers;
    },
    getInfoCustomer : async (id) =>{
        const customer = await CustomerModel.findById(id);
        if(!customer){
            throw Boom.notFound(`CUSTOMER NOT FOUND!`)
        }
        return customer;
    },
    signUpCustomer: async ({username, email, password}) =>{
        const customer = await CustomerModel.signUp({username,email,password})
        if(!customer){
            throw Boom.internal()
        }
        return customer;
    },
    signInCustomer: async ({username, password}) =>{
        const customer = await CustomerModel.login({username,password});
        if(!customer){
            throw Boom.internal()
        }
        return customer;
    },
    updateCustomer: async (id, {password, phoneNumber, address}) =>{
        const customer = await CustomerModel.findOneAndUpdate(
            {_id: id},
            {$set: {password, phoneNumber, address}},
            {new: true}
        )
        if(!customer){
            throw Boom.notFound(`CUSTOMER NOT FOUND!`)
        }
        return customer;
    },
    deleteCustomer: async (id) =>{
        const customer = await CustomerModel.findOneAndDelete(id)
        if(!customer){
            throw Boom.notFound(`CUSTOMER NOT FOUND!`)
        }
        return customer;
    },
}