import React from 'react';
import Logo from '../../component/logo/logo';
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile';
import { Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import { login } from "../../redux/user.redux";

// function hello(){
//     console.log('I　LOVE　ROCKETS')
// }

// function WrapperHello(fn){
//     return function(){
//         console.log('before')
//         fn()
//         console.log('after')
//     }
// }

// // 返回一个新的函数, 设计模式里面叫装饰器模式，react里面叫高阶组件
// hello = WrapperHello(hello)

// hello()


class Hello extends React.Component{
    render(){
        return <h1>I　LOVE　ROCKETS </h1>
    }
}

// 属于属性代理
function WrapperHello( Comp ){
    class WrapComp extends React.Component{
        render(){
            return (
                <div>
                  <p>这是高阶组件特有的元素</p>
                  <Comp {...this.props}></Comp>
               </div>
            )

        }
    }
    return WrapComp
}

const NewHello =  WrapperHello(Hello)



class Login extends React.Component{

   state = {
       user:'',
       pwd:''
   }

    register = ()=>{
        // console.log(this.props)
        this.props.history.push('/register')
    }
    handleChagnge = (key,val)=>{
        this.setState({
          [key]:val
        })
    }
    handleLogin = ()=>{
       this.props.login(this.state)
    }

    render(){
        return (
            <div>
               <NewHello/> 
               <Hello/>
               {this.props.redirectTo && this.props.redirectTo !=='/login' ? <Redirect to={this.props.redirectTo}/> : null}
                <Logo/>
                <WingBlank>
                    <List>
                       {this.props.msg ? <p className='error-msg'>{this.props.msg}</p>:null}  
                        <InputItem
                       onChange ={v=>this.handleChagnge('user',v)}   
                        >用户</InputItem>
                        <InputItem
                       onChange ={v=>this.handleChagnge('pwd',v)}   
                        >密码</InputItem>
                    </List>
                </WingBlank>
                <WhiteSpace/>
                <WingBlank>
                    <Button onClick={this.handleLogin} type='primary'>登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>
            
        )
    }
}

export default  connect(
    state => state.user,
    {login}
)(Login) 