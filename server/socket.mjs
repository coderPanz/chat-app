import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// 保存在线用户
global.onlineUsers = new Map()

io.on("connection", async (socket) => {
  global.chatSocket = socket;
  // 用户上线后保存用户id和socketid
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id)
  })
  // 监听发送的消息
  socket.on('send-msg', (data) => {
    const sendUserSocket = onlineUsers.get(data.toId)
    if(sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-recieve', {
        fromId: data.fromId,
        message: data.message
      })
    }
  })
});

httpServer.listen(5000, () => {
  console.log('服务启动成功!')
});