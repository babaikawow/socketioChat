var User = function (app, socket) {
    this.app = app;
    this.socket = socket;

    // Expose handler methods for events
    this.handler = {
        message: message.bind(this) 
    };
}

// Events

function message(text) {
    // Broadcast message to all sockets
    this.app.allSockets.emit('message', text);
};


module.exports = User;