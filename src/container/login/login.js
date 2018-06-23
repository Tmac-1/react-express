import React from 'react';
import Logo from '../../component/logo/logo';
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile';

class Login extends React.Component{
    register = ()=>{
        console.log(this.props)
        this.props.history.push('/register')
    }

    render(){
        return (
            <div>
                <Logo/>
                <h2>我是登录页</h2>
                <WingBlank>
                    <List>
                        <InputItem>用户</InputItem>
                        <InputItem>密码</InputItem>
                    </List>
                </WingBlank>
                <WhiteSpace/>
                <WingBlank>
                    <Button type='primary'>登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>
            
        )
    }
}

export default Login