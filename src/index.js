require('dotenv').config()
const Config = require('./config')
const Server = require('./server')
const start = async () => {
  const server = await Server.setupEnvironment(Config.server, Config.database)
  await server.start()
  require('./kafka/consumer')
  console.log(`Server running at: ${server.info.uri}`)
}

process.on('uncaughtException', error => {
  console.log(error.message)
  process.exit(1)
})

process.on('unhandledRejection', error => {
  console.log(error)
  process.exit(1)
})

start()
