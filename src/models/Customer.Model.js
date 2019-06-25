
const Bcrypt   = require('bcrypt')
const Mongoose = require('mongoose');
const Config   = require('../config');
const Boom     = require('@hapi/boom');
const JWT      = require('jsonwebtoken');
const historyOrdersSchema = new Mongoose.Schema({
    orderID  : {type: String, required: true},
    orderDate: {type: Date  , required: true},
    amount   : {type: Number, required: true}
})
const CustomerSchema = new Mongoose.Schema({
    username     : {type: String, required: true, unique: true},
    password     : {type: String, required: true},
    email        : {type: String, required: true, unique: true},
    scope        : {type: String, required: true, enum: ['admin','user']},
    phoneNumber  : {type: String},
    historyOrders: {type: [historyOrdersSchema]},
});
//Methods of Instance
CustomerSchema.methods.generateToken = function generateToken() {
    return JWT.sign({
        id      : this._id,
        username: this.username,
        scope   : this.scope
    }, Config.server.jwtKey, {
        algorithm: 'HS256'
    })
}
CustomerSchema.methods.encryptPassword = async function encryptPassword(){
    return await Bcrypt.hash(this.password, 10)
}
CustomerSchema.methods.validatePassword = async function validatePassword(password){
    return await Bcrypt.compare(password, this.password);
}
// Statics of Customer
CustomerSchema.statics.signIn = async function signIn({username, password}){
    const customer = await this.findOne({username});
    const invalid = (!customer || !await customer.validatePassword(password))
    if(invalid){
        return  Boom.conflict(`username or password is not correct`)
    }
    return customer
}
CustomerSchema.statics.signUp = async function signUp({username, email, password, scope}){
    if(await this.findOne({username, email})){
        throw Boom.conflict(`username or email have been registered`)
    }
    return await this.create({username, email, password, scope, phoneNumber: null});
}
//Middleware Pre
CustomerSchema.pre('save', async function save(next){
    if(!this.isModified('password')) return next
    this.password = await Bcrypt.hash(this.password,10);
    return next;
})
CustomerSchema.pre('findOneAndUpdate', async function findOneAndUpdate(next){
    if(this.getUpdate().email){
        const result = await CustomerModel.findOne({email: this.getUpdate().email});
        if(result){
            if(result._id != this.getQuery()._id){
                throw Boom.badRequest(`This email have been registered`)
            }
        }
    }
    if(this.getUpdate().password){
        this.getUpdate().password = await Bcrypt.hash(this.getUpdate().password,10);
    }
    return next;
})
const CustomerModel = Mongoose.model('customers', CustomerSchema);
module.exports = CustomerModel