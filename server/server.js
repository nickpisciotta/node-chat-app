const path = require('path'); 
const http = require('http'); 
const express = require('express');
const socketIO = require('socket.io'); 

const {generateLocationMessage}  = require("./utils/message.js");
const {isRealString} = require('./utils/validation.js')
const {generateMessage} = require("./utils/message.js");
const {Users} = require('./utils/users'); 

const port = process.env.PORT || 3000; 
const publicPath = path.join(__dirname, "../public"); 
var app = express(); 
var server = http.createServer(app); 
var io = socketIO(server); 
var users = new Users(); 

app.use(express.static(publicPath)); 

io.on('connection', (socket) => {
  console.log("New user connected"); 

  

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback("Name and room name are required"); 
    }  
    socket.join(params.room);
    users.removeUser(socket.id); 
    users.addUser(socket.id, params.name, params.room); 

    io.to(params.room).emit('updateUserList', users.getUserList(params.room)); 

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`)); 
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
     var user = users.removeUser(socket.id); 

     if (user) {
       io.to(user.room).emit('updateUserList', users.getUserList(user.room)); 
       io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`)); 
     }
      console.log("User was disconnected"); 
   });
}); 

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})