const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')  // 用来接收post请求
const cookieParser = require('cookie-parser')  // 用来解析cookie

// 新建app
const app = express()

// work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)

// 监听连接
io.on('connection',function(socket){
    console.log('user login')
})

// 中间件
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)

server.listen(9093,function () {
    console.log("Node app start at port 9093")
})
