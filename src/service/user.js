const express = require('express');
const utils = require('utility')  // 用来MD5加密
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');

// 用户列表
Router.get('/list',function(req,res){
    User.find({},function(err,doc){
        return res.json(doc)
    })
})

// 用户注册
Router.post('/register',function(req,res){
    console.log(req.body)  // 所有传递过来的数据
    const {user,pwd,type} = req.body
    User.findOne({user},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名重复'})
        }
        // 创建一个用户
        User.create( {user, pwd:md5Pwd(pwd),type },function(e,d){
            if(e){
                return res.json({code:1,msg:'后端出错了'})
            }
            return res.json({code:0})
        })
    })
})

Router.get('/info',(req,res)=>{
    // 用户有没有cookie
    return res.json({code:1})
})


// 密码加盐，防止MD5暴力破解
function md5Pwd(pwd){
   const salt = 'immoc_is_good_5235xggad!IJGG~~~';  // 也可以生成随机字符串
   return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router;