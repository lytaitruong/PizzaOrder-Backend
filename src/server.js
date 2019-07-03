const Hapi = require('@hapi/hapi')
const Database = require('./database')
const Routes = require('./api')
module.exports.setupEnvironment = async (configServer, configDatabase) => {
  // Get Database
  await Database.connect(configDatabase)
  // Config the server
  const server = Hapi.server({
    debug: { request: ['error'] },
    // host: configServer.host,
    port: process.env.PORT || 3000,
  })
  // Modifies the root route
  if (configServer.routePrefix) {
    server.realm.modifiers.route.prefix = configServer.routePrefix
  }

  // Register the plugins
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
