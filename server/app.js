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
  // 用户上线后保存用户id和socketid
  socket.on("add-user", (userId) => {
    // onlineUsers.set(userId, socket.id)
  });
  
  // 监听好友发送的消息到指定的房间发送消息
  socket.on("send-msg", (data) => {
    io.emit("msg-recieve", data)
  });
});
