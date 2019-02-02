const PORT = 3000;

const io = require("socket.io");
const server = io.listen(PORT);

console.log(`listening on port ${PORT}`);

// need to dispatch to a room for each game
server.on("connection", function(socket) {
  console.log("user connected");
  
  socket.on("commandEvent", function(dispatchedEvent){
    console.log(dispatchedEvent);
    socket.broadcast.emit("commandEvent", dispatchedEvent);
  });
});
