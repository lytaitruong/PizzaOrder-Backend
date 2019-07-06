const Mongoose = require('mongoose')
module.exports.connect = async config => {
  const database = await Mongoose.connect(config.urlMongoAtlas, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  database.connection.on('error', () => {
    console.log(`Connect to: ${configData.urlMongoAtlas} Failed`)
  })
  database.connection.on('connected', () => {
    console.log(`Connect to: ${configData.urlMongoAtlas} Successfully`)
  })
  return database
}
