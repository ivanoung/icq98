const SocketIO = require('socket.io');

class SocketIOConnection {
    constructor(http) {
        this.io = SocketIO(http);
    }

    router() {
        this.io.on('connection', (socket) => {
            console.log('a user connected to the socket');
            socket.on('disconnect', () => {
                console.log("disconnected user");
            });
            socket.on('typing', (msg) => {
                console.log(`${msg} is typing...`);
            });

            socket.on('chat message', (msg) => {
                this.io.emit('chat message', msg);
            })
        });
    }

}

module.exports = SocketIOConnection;