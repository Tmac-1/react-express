import React from 'react';
import {Redirect} from 'react-router-dom';
import Logo from '../../component/logo/logo';
import {List,InputItem,WhiteSpace,Button,Radio} from 'antd-mobile';
import {connect} from 'react-redux';
import {register} from '../../redux/user.redux';
import imoocForm from "../../component/imooc-from/imooc-form";


class Register extends React.Component{
    // state ={
    //     user:'',
    //     pwd:'',
    //     repeatpwd:'',
    //     type:'genuis',  // 或者boss
    // }

    //  handleChagnge = (key,val)=>{
    //     this.setState({
    //       [key]:val
    //     })
    //  }

    componentDidMount(){
        this.props.handleChagnge('type','genuis')
    }

     handleRegister = ()=>{
        //  console.log(this.props)
         this.props.register(this.props.state)
        //  console.log(this.state)
     }

    render(){
        const  RadioItem = Radio.RadioItem;
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
                <Logo/>
                 <List>
                     {this.props.msg ? <p className='error-msg'>{this.props.msg}</p>:null}
                    <InputItem onChange={v=>this.props.handleChagnge('user',v)}>用户名</InputItem>
                    <WhiteSpace/>
                    <InputItem 
                       type='password'
                       onChange={v=>this.props.handleChagnge('pwd',v)}>密码
                    </InputItem>
                    <WhiteSpace/>
                    <InputItem 
                       type='password'
                       onChange={v=>this.props.handleChagnge('repeatpwd',v)}>确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem 
                      checked={this.props.state.type === 'genuis'}
                      onChange = {()=> {this.props.handleChagnge('type','genuis')}}  
                    >
                      牛人
                    </RadioItem>
                    <RadioItem 
                    checked={this.props.state.type === 'boss'}
                      onChange = { this.props.handleChagnge.bind(this,'type','boss') }  
                    >
                         BOSS
                    </RadioItem>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.handleRegister}>注册</Button>
                 </List>
            </div>
        )
    }
}

export default connect(
    state => state.user,
    {
        register
    }
)( imoocForm(Register) ) ;