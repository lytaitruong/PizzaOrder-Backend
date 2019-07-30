const Config = require('./config')
const Server = require('./server')

const init = async () => {
  const server = await Server.setupEnvironment(Config.server, Config.database)
  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
}

init().catch(error => {
  console.log(error)
  process.exit(1)
})

process.on('unhandledRejection', error => {
  console.log(error)
  process.exit(1)
})
