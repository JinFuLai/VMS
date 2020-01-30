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
            host: 'localhost:2000',
            basePath: '/'
        },
        // path to the API docs
        apis: ['./controller/*.js'],
    });

    // TODO get the definnation for all model
    var account = require('./model/account/account');
    var role = require('./model/account/role');
    var user = require('./model/account/user');
    var feedback = require('./model/account/feedback');
    var vehicle = require('./model/vehicle/vehicle');
    var vehicle_type = require('./model/vehicle/vehicle_type');
    var vehicle_brand = require('./model/vehicle/vehicle_brand');
    var vehicle_color = require('./model/vehicle/vehicle_color');
    var simcard = require('./model/entity/simcard');
    var simcard_type = require('./model/entity/simcard_type');
    var manufactor = require('./model/entity/manufactor');
    var device = require('./model/gpstrack/device');
    var group = require('./model/gpstrack/group');

    swaggerSpec.definitions = {
        account: m2s(account),
        user: m2s(user), role: m2s(role),
        feedback: m2s(feedback),
        vehicle: m2s(vehicle),
        vehicle_type: m2s(vehicle_type),
        vehicle_brand: m2s(vehicle_brand),
        vehicle_color: m2s(vehicle_color),
        simcard: m2s(simcard),
        simcard_type: m2s(simcard_type),
        manufactor: m2s(manufactor),
        device: m2s(device),
        group: m2s(group),
    };

    app.get('/swagger.json', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}