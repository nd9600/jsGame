const PORT = 3000;

const io = require("socket.io");
const server = io.listen(PORT);

console.log(`listening on port ${PORT}`);

server.on("connection", function(socket) {
  console.log("user connected");
  socket.emit("welcome", {
      test: "msg"
  });
});
