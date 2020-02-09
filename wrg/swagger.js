const m2s = require('mongoose-to-swagger');

module.exports = function (app) {
    var swaggerJSDoc = require('swagger-jsdoc');
    // initialize swagger-jsdoc
    var swaggerSpec = swaggerJSDoc({
        // import swaggerDefinitions
        swaggerDefinition: {
            info: {
                title: 'Web API',
                version: '1.0.0',
                description: 'Demonstrating how to describe a RESTful API with Swagger',
            },
            host: 'localhost:2001',
            basePath: '/'
        },
        // path to the API docs
        apis: ['./controller/*.js'],
    });

    // TODO get the definnation for all model
    const geographical = require('./model/geographical');

    swaggerSpec.definitions = {
        geographical: m2s(geographical),
    };

    app.get('/swagger.json', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}