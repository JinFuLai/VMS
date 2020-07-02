var express = require('express');
var app = express();
var config = require('config');   // https://www.npmjs.com/package/config
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect(config.get('DB_CONFIG_STRING'), { useNewUrlParser: true , useUnifiedTopology: true   });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
var swagger = require('./swagger')(app);
const bypassapi = ["/api/user/login", "/api/user/list", "/api/account/list", "/api/account/upsert", "/api/account/delete"]

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// set corss domain
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// set static folder
app.use(express.static('public'));
var jwt = require('jsonwebtoken');
var apiRoutes = express.Router();

// load all controllers
var fs = require('fs');
var path_module = require('path');
function LoadModules(path) {
    fs.lstat(path, function (err, stat) {
        if (stat.isDirectory()) {
            // we have a directory: do a tree walk
            fs.readdir(path, function (err, files) {
                var f, l = files.length;
                for (var i = 0; i < l; i++) {
                    f = path_module.join(path, files[i]);
                    LoadModules(f);
                }
            });
        } else {
            // we have a file: load it
            if (path.endsWith(".js")) {
                require(path)(apiRoutes);
            }
        }
    });
}
var DIR = path_module.join(__dirname, 'controller');
LoadModules(DIR);


// // route middleware to verify a token
// // Also add permission here https://scotch.io/tutorials/building-and-securing-a-modern-backend-api
// app.use(function (req, res, next) {
//     // We don't need protect these api
//     if(bypassapi.indexOf(req.originalUrl) >= 0 )
//     {
//         next();
//         return;
//     }
//     // check header or url parameters or post parameters for token
//     var token = req.body.token || req.query.token || req.headers['x-access-token'];
//     // decode token
//     if (token) {
//         // verifies secret and checks exp
//         jwt.verify(token, config.get('JWT_SECRET'), function (err, decoded) {
//             if (err) {
//                 return res.json({ success: false, message: 'Failed to authenticate token.' });
//             } else {
//                 // if everything is good, save to request for use in other routes
//                 req.decoded = decoded; next();
//             }
//         });
//     } else {
//         // if there is no token
//         // return an error
//         return res.status(403).send({
//             success: false,
//             message: 'No token provided.'
//         });
//     }
// });

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.use('/api', apiRoutes);
app.listen(config.get('SERVER_PORT'))
console.log('Started')
