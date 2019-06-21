module.exports = {
    name: "Swagger Documentation", 
    version: "1.0.0",
    register: (server) => {
        try {
            server.register([require("@hapi/inert"),require("@hapi/vision"),
            {
                plugin: require("hapi-swagger"),
                options: {
                    info: {
                        title: "Task Api",
                        description: "Task Api Documentation",
                        version: "1.0"
                    },
                    tags: [{
                            name: "tasks",
                            description: "Api tasks interface."
                        },
                        {
                            name: "users",
                            description: "Api users interface."
                        }
                    ],
                    swaggerUI: true,
                    documentationPage: true,
                    documentationPath: "/documentation",
                    grouping: 'tags',
                }
            }])
        } catch (err) {
            console.log(`Error registering swagger plugin: ${err}`);
        }
    }
}
