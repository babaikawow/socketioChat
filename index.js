var express   = require('express');
var app       = express();
const router = require('./app/routes');
const path = require('path');
const PORT = 8081;
app.use(express.static(__dirname + '/')); 

app.use('/' , router);

var server    = app.listen(PORT, () => console.log(`server start at ${PORT} port`));
var io        = require('socket.io').listen(server);

var count = 0;
var onlineUsers = {};
var sockets = {}

io.sockets.on('connection', function (socket) {
	count++
	sockets[socket.id] = socket;
  	io.emit('usersOnline', count);

  	socket.on('disconnect', function() {
  		count--;
		let user = onlineUsers[socket.id];
		if( user === undefined){
			return;
		}  
  		io.emit('usersOnline', count);
  		io.emit('removeUser', user);
  		io.emit('receiveMessage', {message: 'User ' + user.username && "" + ' disconected'})
  		delete sockets[socket.id];
  		delete onlineUsers[socket.id];

  	})

  	socket.on('logIn', function(username) {
  		var user = {};
  		user.username = username;
  		user.id = socket.id;
  		user.avatar = 'lol.png';
  		onlineUsers[socket.id] = user;
  		socket.emit('usersList', usersList());
  		socket.broadcast.emit('addUser', user);
  		io.emit('receiveMessage', {message: 'User ' + username + ' connected'});
  	})

  	socket.on('sendMessage', function(message) {
  		var msg = {};
  		var user = onlineUsers[socket.id];
  		msg.message = message;
  		msg.name = user.username;
  		msg.date = getCurrentTime();
  		msg.avatar = 'lol.png';
  		msg.type = 'user';
  		io.emit('receiveMessage', msg);
  	} )
});

function usersList() {
	var list = [];
	for(let key in onlineUsers){
		list.push(onlineUsers[key]);
	};
	return list;

}

function getCurrentTime() {
	var date = new Date;
	var result = {};
	result.seconds = date.getSeconds();
	result.minutes = date.getMinutes();
	result.hour = date.getHours();
	return result;
}