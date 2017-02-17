const path = require('path'); 
const http = require('http'); 
const express = require('express');
const socketIO = require('socket.io'); 

const {generateLocationMessage}  = require("./utils/message.js");
const {isRealString} = require('./utils/validation.js')
const {generateMessage} = require("./utils/message.js");
const port = process.env.PORT || 3000; 
const publicPath = path.join(__dirname, "../public"); 
var app = express(); 
var server = http.createServer(app); 
var io = socketIO(server); 

app.use(express.static(publicPath)); 

io.on('connection', (socket) => {
  console.log("New user connected"); 

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined')); 

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback("Name and room name are required"); 
    }  

    callback(); 
  }); 

  socket.on('createMessage', (newMessage, callback) => {
    console.log('create message', newMessage);
    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text)); 
    callback(); 
  }); 

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage("Admin", coords.latitude, coords.longitude));
  }); 
  
   socket.on('disconnect', () => {
    console.log("User was disconnected"); 
   });

}); 

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})