const express = require("express"); // 导入 express 模块
const cors = require("cors");
const bodyParser = require("body-parser");
const { Server } = require('socket.io')
const uploadRoute = require('./route/index.js')

const app = express()
app.use(cors())
// 1. 用于解析 HTTP 请求中的表单数据
app.use(express.urlencoded({ extended: false }))
// 2. 用于解析 HTTP 请求中的 JSON 格式的数据
app.use(bodyParser.json())
// app.use('/express/uploads/images', express.static('uploads/images'))
app.use("/express", uploadRoute);

const server = app.listen(5000, () => {
  console.log("服务启动成功!")
})

// 创建实时连接
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// 记录实时在线用户
let onlineUsers = new Map()
io.on("connection", async (socket) => {
  global.chatSocket = socket
  // 用户上线后保存用户id和socketid
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id)
  });
  
  // 监听好友发送的消息到指定的房间发送消息
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.toId)
    if(sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-recieve', {
        fromId: data.fromId,
        message: data.message
      })
    }
  });

  // 
  socket.on('outgoing-voice-call', (data) => {
    const sendUserSocket = onlineUsers.get(data.toId)
    socket.to(sendUserSocket).emit('incoming-voice-call', {
      from: data.from,
      roomId: data.roomId,
      callType: data.callType
    })
  })

  socket.on('outgoing-video-call', (data) => {
    const sendUserSocket = onlineUsers.get(data.toId)
    socket.to(sendUserSocket).emit('incoming-video-call', {
      from: data.from,
      roomId: data.roomId,
      callType: data.callType
    })
  })

  socket.on('reject-video-call', (data) => {
    const sendUserSocket = onlineUsers.get(data.fromId)
    if(sendUserSocket) {
      socket.to(sendUserSocket).emit('video-call-rejected')
    }
  })

  socket.on('reject-voice-call', (data) => {
    const sendUserSocket = onlineUsers.get(data.fromId)
    if(sendUserSocket) {
      socket.to(sendUserSocket).emit('voice-call-rejected')
    }
  })

  socket.on('accept-incoming-call', (id) => {
    const sendUserSocket = onlineUsers.get(id)
    socket.to(sendUserSocket).emit('accept-call')
  })
});
