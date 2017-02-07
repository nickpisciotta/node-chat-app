const path = require('path'); 
const http = require('http'); 
const express = require('express');
const socketIO = require('socket.io'); 

const port = process.env.PORT || 3000; 
const publicPath = path.join(__dirname, "../public"); 
var app = express(); 
var server = http.createServer(app); 
var io = socketIO(server); 

app.use(express.static(publicPath)); 

io.on('connection', (socket) => {
  console.log("New user connected"); 

  socket.on('disconnect', () => {
    console.log("User was disconnected"); 
  }); 

  socket.emit('newMessage', {
    from: "mike@example.com", 
    text: "Hey. whats going on", 
    createdAt: "Today's date"
  }); 

  socket.on('createMessage', (newMessage) => {
    console.log('create message', newMessage); 
  })
}); 



server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})