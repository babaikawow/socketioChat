const routes = require('express').Router();


// const Chat = require('../EventHandlers/Chat');
// const User = require('../EventHandlers/User');


routes.get('/', (req, res) => {
	res.sendFile('index.html');
})

routes.all("*", (req, res) => {
	res.send("Uppsss we don`t find anything!:(");
})



module.exports = routes;