const Hapi = require('@hapi/hapi')
const Routes = require('./api')
const Database = require('./database')
module.exports.setupEnvironment = async (configServer, configDatabase) => {
  Database.connect(configDatabase)
  const server = Hapi.server({
    debug: { request: ['error'] },
    port: configServer.port,
    routes: { cors: true },
  })

  server.realm.modifiers.route.prefix = configServer.routePrefix

  const plugins = ['auth', 'cookie', 'logger', 'swagger']
  const pluginsPromises = plugins.map(pluginName => {
    const plugin = require(`./plugin/${pluginName}`)
    console.log(`Register plugin ${plugin.name} with version: ${plugin.version}`)
    return plugin.register(server, configServer)
  })
  await Promise.all(pluginsPromises)
  console.log(`All plugins have been registered successfully`)

  console.log(`Register Routes`)
  for (const route of Routes) {
    route.register(server)
  }
  console.log(`All routes have been registered successfully`)
  return server
}
