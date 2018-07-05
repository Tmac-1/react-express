const express = require('express');
const utils = require('utility')  // 用来MD5加密
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const _filter = {'pwd':0,'__v':0}  // 过滤密码和__v  让返回的data数据里面没有这两项

// 用户列表
Router.get('/list',function(req,res){
    // 清除用户
    // User.remove({},function(e,d){})

    const { type } = req.query   // get方法用query，post的方法用body
    User.find({ type },function(err,doc){
        return res.json({code:0,data:doc})
    })
})

// 更新boss信息
Router.post('/update',function(req,res){
    const userid = req.cookies.userid
    if(!userid){
        return json.dumps({code:1})
    }

    const body = req.body //查找并更新，这是需要更新的数据项
    User.findByIdAndUpdate(userid,body,function(err,doc){
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },body)
        return  res.json({code:0,data}) 
    })
})


// 用户登录
Router.post('/login',function(req,res){
    const {user,pwd} = req.body;
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,function(err,doc){
        if(!doc){
            return res.json({code:1,msg:'用户名或密码错误'})
        }
        // 保存用户登录状态
        res.cookie('userid',doc._id)  // 设置cookie
        return res.json({code:0,data:doc})
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
        // 创建一个用户  但是不能反回用户ID
        // User.create( {user, pwd:md5Pwd(pwd),type },function(e,d){
        //     if(e){
        //         return res.json({code:1,msg:'后端出错了'})
        //     }
        //     return res.json({code:0})
        // })

        //  创建一个用户 ，并且保存当前用户ID
        const userModel = new User( {user, pwd:md5Pwd(pwd),type })
        userModel.save(function(e,d){
            if(e){
                return res.json({code:1,msg:'后端出错了'})
            }
            const {user,type,_id} = d;
            res.cookie('userid',_id)
            return res.json({code:0,data:{user,type,_id}})
        })
    })
})

// 判断用户是否登录
Router.get('/info',(req,res)=>{
    // 用户有没有cookie
    const {userid} = req.cookies
    if(!userid){
        return res.json({code:1})
    }
    User.findOne({_id:userid},_filter,function(err,doc){
        if(err){
            return res.json({code:1,msg:'后端出错了'})
        }
        if(doc){   
            return res.json({code:0,data:doc})
        }
    })
})


// 密码加盐，防止MD5暴力破解
function md5Pwd(pwd){
   const salt = 'immoc_is_good_5235xggad!IJGG~~~';  // 也可以生成随机字符串
   return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router;