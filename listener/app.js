var mongoose = require('mongoose');
var config = require('./App/Config/config');
const BBPlugin = require('./App/BBPlugin');

mongoose.connect(config.DB_CONFIG_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('mongoose连接成功');
    var plugin = new BBPlugin();
    plugin.createNewListener();
});