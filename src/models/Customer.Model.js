
const Bcrypt   = require('bcrypt')
const Mongoose = require('mongoose');
const CustomerSchema = new Mongoose.Schema({
    email        : {type: String, required: true, unique: true},
    name         : {type: String, required: true},
    password     : {type: String, required: true},
    scope        : {type: String, required: true, enum: ['admin','user']},
    phoneNumber  : {type: String},
    historyOrders: [{type: Mongoose.Schema.Types.ObjectId, ref: "orders"}],
});
//Methods of Instance
CustomerSchema.methods.encryptPassword = async function encryptPassword(password){
    return await Bcrypt.hash(password,10);
}
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
                return Boom.badRequest(`This email have been registered`)
            }
        }
    }
    return next;
})
module.exports = Mongoose.model('customers', CustomerSchema);