const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')  // 用来接收post请求
const cookieParser = require('cookie-parser')  // 用来解析cookie
const model = require('./model');
const Chat = model.getModel('chat');

// 新建app
const app = express()

// work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)

// 监听连接  (io是全局请求，socket是当前请求)
io.on('connection',function(socket){
    // console.log('user login')
    socket.on('sendmsg',function(data){
        console.log(data)
        const {from,to,msg}= data;
        const chatid = [from,to].sort().join('_')
        // 数据入库
        Chat.create({chatid,from,to,content:msg},function(err,doc){
            io.emit('recvmsg',Object.assign({},doc._doc))
        })
        // 广播事件到全局
        // io.emit('recvmsg',data)
    })
})

// 中间件
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)

server.listen(9093,function () {
    console.log("Node app start at port 9093")
})
