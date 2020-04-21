var mongoose = require('mongoose');
var config = require('./App/Config/config');
const BBPlugin = require('./App/BBPlugin');

mongoose.connect(config.DB_CONFIG_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
var maxCount= 2;//允许错误重连的次数
var retryCount = 0;//当前重连的次数
var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
db.on('error',function(){
    if (retryCount < maxCount) {
        retryCount += 1;
        console.log(`连接失败，正在进行第${retryCount}次重试...`);
        mongoose.connect(config.DB_CONFIG_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
    }else{
        console.log('抱歉，暂时无法连接mongoose！');
    }
})
console.log('正在连接mongoose...');
db.once('open', function() {
    // we're connected!
    console.log('mongoose连接成功');
    var plugin = new BBPlugin();
    plugin.createNewListener();
});