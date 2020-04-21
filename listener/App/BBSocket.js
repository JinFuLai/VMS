const HashTable = require('./HashTable');
const Net = require('net');
// The port on which the server is listening.
// const port = 8090;
var config = require('../App/Config/config');

class BBSocket {
    /**
     * 新建Socket
     * @param {*} port 监听的端口
     */
    constructor(port = config.LISTENER_PORT){
        this.server = new Net.Server();
        this.port = port != null ? port : config.LISTENER_PORT;
        this.recieveData = null;
        this.clientArr = new HashTable();//所有连接的客服端[socket]
    }

    connection(reciveDataFunc,endFunc,errorFunc) {
        var that = this;
        this.server.listen(that.port, function() {
            console.log(`Server listening for connection requests on socket localhost:${that.port}`);
        });
        this.server.on('connection', function(socket) {
            that._clientArrAdd(socket);
            console.log('A new connection has been established.');
        
            // Now that a TCP connection has been established, the server can send data to
            // the client by writing to its socket.
        
            // The server can also receive data from the client by reading from its socket.
            socket.on('data', function(chunk) {
                // this.recieveData();
                reciveDataFunc(socket,chunk);
            });
        // socket.write("nihao");//测试用
            // When the client requests to end the TCP connection with the server, the server
            // ends the connection.
            socket.on('end', function() {
                that._clientArrRemove(socket);
                console.log('Closing connection with the client');
                endFunc(socket);
            });

            socket.on('lookup', function(err, address, family, host) {
                console.log(`lookup - Error: ${err}, address: ${address}, family: ${family}, host: ${host}`);
            });
        
            // Don't forget to catch error, for your own sake.
            socket.on('error', function(err) {
                console.log(`Error: ${err}`);
                that._clientArrRemove(socket);
                errorFunc(socket,err);
            });
            socket.on('close',function(err) {
                console.log(`close: ${err}`);
            })
        });

        this.server.on('listening', () => {
            console.log('listening-开始监听');
        });

        this.server.on('close', () => {
            console.log('close-关闭服务');
        });

        this.server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
              console.log('地址正被使用，重试中...');
              setTimeout(() => {
                this.server.close();
                this.server.listen(port);
              }, 1000);
            }
        });
    }

    /**
     * 发送消息
     * @param {*} socket 要发送的客服端socket
     * @param {*} message 消息内容(buffer/str)
     */
    sendMessage(socket,message) {
        socket.write(message);
    }

    /**停止监听服务 */
    close() {
        this.server && this.server.close();
    }

    /**关闭socket连接 */
    end(socket) {
        socket.end();
    }

    sendCallback() { }


    /**clientArr添加元素 */
    _clientArrAdd(socket) {
        this.clientArr.Add(socket._getpeername().address+socket._getpeername().port.toString()+socket._getpeername().family,socket);
    }
    /**clientArr移除元素 */
    _clientArrRemove(socket) {
        this.clientArr.remove(socket._getpeername().address+socket._getpeername().port.toString()+socket._getpeername().family);
    }
}

module.exports = BBSocket;