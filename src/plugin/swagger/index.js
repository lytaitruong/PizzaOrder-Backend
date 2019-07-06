module.exports = {
  name: 'Swagger Documentation',
  version: '1.0.0',
  register: server => {
    try {
      server.register([
        require('lout'),
        require('@hapi/inert'),
        require('@hapi/vision'),
        {
          plugin: require('hapi-swagger'),
          options: {
            info: {
              title: 'Pizza Order API',
              description: 'Pizza Order API DOCUMENTATION',
              version: '1.0',
            },
            swaggerUI: true,
            documentationPage: true,
            documentationPath: '/documentation',
            grouping: 'tags',
          },
        },
      ])
    } catch (err) {
      console.log(`Error registering swagger plugin: ${err}`)
    }
  },
}
