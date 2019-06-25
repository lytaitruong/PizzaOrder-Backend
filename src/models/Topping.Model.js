const Mongoose = require('mongoose');
const Boom     = require('@hapi/boom');
const ToppingSchema = new Mongoose.Schema({
    name     : {type: String, required: true, unique: true},
    imageUrl : {type: String, required: true},
    unitPrice: {type: Number, required: true},
});
ToppingSchema.pre('save', async function save(next){
    if(await ToppingModel.findOne({name: this.name})){
        throw Boom.conflict(`this topping's name have been registered`)
    }
    return next;
})
ToppingSchema.pre('findOneAndUpdate', async function findOneAndUpdate(next){
    if(this.getUpdate().name){
        const result = await ToppingModel.findOne({name: this.getUpdate().name});
        if(result){
            if(result._id != this.getQuery()._id){
                throw Boom.conflict(`This topping's name have been registered`)
            }
        }
    }
    return next
})

const ToppingModel = Mongoose.model('toppings', ToppingSchema);
module.exports = ToppingModel