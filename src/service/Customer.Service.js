const Boom          = require('@hapi/boom');
const CustomerModel = require('../models/Customer.Model');
module.exports = {
    getAllCustomers: async ({limit, page}) => { 
        const listCustomer = await CustomerModel.find()
                                                .skip(limit)
                                                .limit(limit*(page-1))
                                                .sort({'username': 1})
        return listCustomer;
    },
    getInformation: async (id) =>{
        const customer = await CustomerModel.findById(id)
        return (customer)
            ? customer
            : Boom.notFound(`Customer`)
    },
    signInCustomer: async ({username,password}) =>{
        const customer = await CustomerModel.findOne({username});
        const invalid = (!customer || !await customer.validatePassword(password))
        return (invalid)
            ? Boom.conflict(`username or password is not correct`)
            : (!customer)
            ? Boom.badRequest(`Customer`)            
            : customer
    },
    signUpCustomer: async ({username, email, password, scope}) =>{
        const invalid =  CustomerModel.findOne({username, email});
        const customer = await CustomerModel.create({username,email,password,scope, phoneNumber: null});
        return (invalid)
            ? Boom.conflict(`This username or email have been registered`)
            : (!customer)
            ? Boom.badRequest(`Customer`)
            : customer;
    },
    updateCustomer: async (id, data) =>{
        const customer = await CustomerModel.findByIdAndUpdate(id,data);
        return (customer)
            ? customer
            : Boom.notFound(`Customer`)
    },
    deleteCustomer: async (id) =>{
        const customer = await CustomerModel.findByIdAndDelete(id);
        return (customer)
            ? customer
            : Boom.notFound(`Customer`);
    },
}
