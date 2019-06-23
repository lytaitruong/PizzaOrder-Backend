const Mongoose = require('mongoose');
const Bcrypt   = require('bcrypt')
const Boom     = require('@hapi/boom');
const historyOrdersSchema = new Mongoose.Schema({
    orderID  : {type: String, required: true, unique: true},
    orderDate: {type: Date  , required: true},
    amount   : {type: Number, required: true}
})

const CustomerSchema = new Mongoose.Schema({
    username     : {type: String, required: true, unique: true},
    email        : {type: String, required: true, unique: true},
    password     : {type: String, required: true},
    phoneNumber  : {type: String, required: true},
    scope        : {type: String, required: true, enum: ['admin','user']},
    historyOrders: {type: [historyOrdersSchema]},
});
module.exports = Mongoose.model('customers', CustomerSchema);

CustomerSchema.methods.validatePassword = async function validatePassword(password){
    return Bcrypt.compare(password, this.password)
}

CustomerSchema.statics.login = async function login({username, password}){
    const customer = await this.findOne({username});
    const invalid = (!customer || !await customer.validatePassword(password))
    if(invalid){
        throw Boom.conflict(`username or password is not correct`)
    }
    return customer
}

CustomerSchema.statics.signUp = async function signUp({username, email, password}){
    const checkUserName = await this.findOne({username});
    const checkEmail    = await this.findOne({email});
    if(!checkUserName ||!checkEmail){
        throw Boom.conflict(`username or email have been registered`)
    }
    return new this({
        username,
        email,
        password
    }).save()
}

CustomerSchema.pre('save', async function save(next){
    if(!this.isModified('password')) return next
    this.password = await Bcrypt.hash(this.password,10);
    return next;
})
CustomerSchema.pre('findOneAndUpdate', async function save(next){
    let newPassword = this.getUpdate().$set.password
    try{
        newPassword = await Bcrypt.hash(newPassword,10);
        this._update.password = newPassword;
        return next
    }catch(error){
        return next(error)
    }
})