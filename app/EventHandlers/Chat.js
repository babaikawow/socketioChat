var Chat = function (app, socket) {
    this.app = app;
    this.socket = socket;

    // Expose handler methods for events
    this.handler = { 
        ping:    ping.bind(this)    // and this.socket in events
    };
}

// Events



function ping() {
    // Reply to sender
    this.socket.emit('message', 'PONG!');
};

module.exports = Chat;