import React from 'react';
import Logo from '../../component/logo/logo';
import {List,InputItem,WingBlank,WhiteSpace,Button,Radio} from 'antd-mobile';
const  RadioItem = Radio.RadioItem;

class Register extends React.Component{
    state ={
        type:'genuis'
    }

    render(){
        return (
            <div>
                <Logo/>
                <h2>注册页</h2>
                 <List>
                    <InputItem>用户名</InputItem>
                    <WhiteSpace/>
                    <InputItem>密码</InputItem>
                    <WhiteSpace/>
                    <InputItem>确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem checked={this.state.type === 'genuis'}>
                         牛人
                    </RadioItem>
                    <RadioItem checked={this.state.type === 'boss'}>
                         BOSS
                    </RadioItem>
                    <WhiteSpace/>
                    <Button type='primary'>注册</Button>
                 </List>
            </div>
        )
    }
}

export default Register;