import React from 'react';
import Logo from '../../component/logo/logo';
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile';
import { Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import { login } from "../../redux/user.redux";
import  imoocForm from "../../component/imooc-from/imooc-form";

class Login extends React.Component{

//    state = {
//        user:'',
//        pwd:''
//    }

    register = ()=>{
        // console.log(this.props)
        this.props.history.push('/register')
    }
    // handleChagnge = (key,val)=>{
    //     this.setState({
    //       [key]:val
    //     })
    // }
    handleLogin = ()=>{
       this.props.login(this.props.state)
    }

    render(){
        return (
            <div>
               {this.props.redirectTo && this.props.redirectTo !=='/login' ? <Redirect to={this.props.redirectTo}/> : null}
                <Logo/>
                <WingBlank>
                    <List>
                       {this.props.msg ? <p className='error-msg'>{this.props.msg}</p>:null}  
                        <InputItem
                       onChange ={v=>this.props.handleChagnge('user',v)}   
                        >用户</InputItem>
                        <InputItem
                       onChange ={v=>this.props.handleChagnge('pwd',v)}   
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
)( imoocForm(Login) ) 