const Hapi = require('@hapi/hapi')
const Routes = require('./api')
const Database = require('./database')
module.exports.setupEnvironment = async (configServer, configDatabase) => {
  Database.connect(configDatabase)
  const server = Hapi.server({
    debug: { request: ['error'] },
    port: configServer.port,
  })

  if (configServer.routePrefix) {
    server.realm.modifiers.route.prefix = configServer.routePrefix
  }

  const pluginsPromises = configServer.plugins.map(pluginName => {
    const plugin = require(`./plugin/${pluginName}`)
    console.log(`Register plugin ${plugin.name} with version: ${plugin.version}`)
    return plugin.register(server, configServer)
  })
  await Promise.all(pluginsPromises)
  console.log(`All plugins have been registered successfully`)

  console.log(`Register Routes`)
  for (const route in Routes) {
    Routes[route].register(server)
  }
  console.log(`All routes have been registered successfully`)
  return server
}
