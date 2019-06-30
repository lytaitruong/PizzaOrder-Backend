const Mongoose = require('mongoose');
module.exports.connect =  async (config) =>{
    const database = await Mongoose.connect(config.urlMongoAtlas,
        {useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false});

    database.connection.on("error", () => {
        console.log(`Connect to: ${configData.connectTo} Failed`);
    });

    database.connection.once('open',() => {
        console.log(`Connect to: ${configData.connectTo} Successfully`)
    });
    return database;
}
module.exports.close = async(config) =>{
    const result = await config.connection.close();
    if(!result){
        throw Error(`Can't close the connect MongoAtlas`)
    };
}