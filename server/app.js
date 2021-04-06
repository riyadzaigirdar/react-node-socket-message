const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const { addUser, removeUser, getUsersInRoom, getUser} = require("./users");
const { use } = require("./router");

const PORT = process.env.port || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(require("./router"));

io.on("connection", (socket) => {
  console.log("we have a new connection");

  socket.on("disconnect", () => {
    console.log("the socket disconnected");
  });

  socket.on("join", ({name, room}, callback)=>{
    try{
      const {error, user} = addUser({id: socket.id, name, room }) 
      
      if(error) return callback(error)

      socket.emit("message", {user: "admin", text: `${name}, Welcome to the room ${room}`})
      socket.broadcast.to(user.room).emit("message", {user: "admin", text: `${name} has just joined`})
      
      socket.join(user.room);

      callback()
    
    }catch(e){
      callback("server error", e)
    }     
  })

  socket.on("new_message", (message, callback)=>{
    const user = getUser(socket.id)

    io.to(user.room).emit("message", {user: user.name , text: message})

    callback();
  })

});


server.listen(PORT, () => console.log(`server listening on ${PORT}`));
