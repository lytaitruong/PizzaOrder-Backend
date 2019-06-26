
const Bcrypt   = require('bcrypt')
const Mongoose = require('mongoose');
const Boom     = require('@hapi/boom');
const CustomerSchema = new Mongoose.Schema({
    username     : {type: String, required: true, unique: true},
    password     : {type: String, required: true},
    email        : {type: String, required: true, unique: true},
    scope        : {type: String, required: true, enum: ['admin','user']},
    phoneNumber  : {type: String},
    historyOrders: [{type: Mongoose.Schema.Types.ObjectId, ref: "orders"}],
});
//Methods of Instance

CustomerSchema.methods.validatePassword = async function validatePassword(password){
    return await Bcrypt.compare(password, this.password);
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