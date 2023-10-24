import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// 记录实时在线用户
// let onlineUsers = new Map()
io.on("connection", async (socket) => {
  // 用户上线后保存用户id和socketid
  socket.on("add-user", (userId) => {
    // onlineUsers.set(userId, socket.id)
  });
  
  // 监听好友发送的消息到指定的房间发送消息
  socket.on("send-msg", (data) => {
    io.emit("msg-recieve", data)
  });
});

httpServer.listen(5000, () => {
  console.log("服务启动成功!");
});
