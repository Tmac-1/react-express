const express = require('express')
const userRouter = require('./user')

// 新建app
const app = express()

// 中间件
app.use('/user',userRouter)

// app.get('/',function(req,res){
//     res.send('<h1>火箭总冠军！！！</h1>')
// })

// app.get('/data',function(req,res){
//     res.json({
//         "火箭":"总冠军"
//     })
// })

app.listen(9093,function () {
    console.log("Node app start at port 9093")
})
