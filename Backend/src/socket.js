
export default function setupSocketHandlers(io) {
  let activeUsers = [];
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on("new-user-add", (newUserId) => {
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({ userId: newUserId, socketId: socket.id });
        console.log("New User Connected", activeUsers);
      }
      io.emit("get-users", activeUsers);
    });

    socket.on("send-message", (data) => {
      const { receiverId } = data
      const user = activeUsers.find((user) => user.userId === receiverId)
      console.log("sending from  soket to :", receiverId);
      console.log("sending from  soket to ui  data", data);
      if (user) {
        io.to(user.socketId).emit('receive-message', data)
      }
    })


    socket.on('typing', ({ userId }) => {
      console.log("User typing:", userId);

   
      activeUsers.forEach(user => {
        if (user.userId !== userId) {
          io.to(user.socketId).emit('typing', { userId });
        }
      });
    });

    socket.on('stop-typing', ({ userId }) => {
      console.log("User stopped typing:", userId);

 
      activeUsers.forEach(user => {
        if (user.userId !== userId) {
          io.to(user.socketId).emit('stop-typing', { userId });
        }
      });
    });
    socket.on("call-user", (data) => {
      console.log(data,"data");
      
      const { name ,receiverId, senderId, roomId } = data;
      console.log(`call from room id ${senderId} in  ${roomId} to ${receiverId}`);
      const user = activeUsers.find((user) => user.userId === receiverId);

      if (user) {
        io.to(user.socketId).emit("incoming-call", {
          senderId,
          roomId,
          name
        });
      }
    });


    socket.on("disconnect", () => {
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      console.log("User Disconnected", activeUsers);
      io.emit("get-users", activeUsers);
    });
  });
}