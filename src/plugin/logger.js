module.exports = {
  name: 'Good Logger',
  version: '1.0.0',
  register: server => {
    try {
      server.register({
        plugin: require('@hapi/good'),
        options: {
          ops: {
            interval: 1000,
          },
          reporters: {
            consoleReporter: [
              {
                module: '@hapi/good-squeeze',
                name: 'Squeeze',
                args: [{ error: '*', log: '*', response: '*', request: '*' }],
              },
              {
                module: '@hapi/good-console',
              },
              'stdout',
            ],
          },
        },
      })
    } catch (err) {
      console.log(`Error registering logger plugin: ${err}`)
      throw err
    }
  },
}
