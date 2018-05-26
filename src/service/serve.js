const express = require('express')

// 新建app
const app = express()

app.get('/',function(req,res){
    res.send('<h1>火箭总冠军！！！</h1>')
})

app.get('/data',function(req,res){
    res.json({
        "火箭":"总冠军"
    })
})

app.listen(9093,function () {
    console.log("Node app start at port 9093")
})
