import React from "react";
import { Result, List,WhiteSpace,Modal} from "antd-mobile";
import { connect } from "react-redux";
import { logoutSubmit } from "../../redux/user.redux";
import browserCookie from "browser-cookies";
import { Redirect } from "react-router-dom";


class User extends React.Component{

    logout =()=>{
        const alert = Modal.alert;
        alert("注销","确认退出吗？",[
            {text:'取消',onPress:()=>{}},
            {text:'确认',onPress:()=>{
                 browserCookie.erase('userid') // 删除cookie  此时后端判断有没有cookie，然后走authroute组件
                 this.props.logoutSubmit()
            }}
        ])
    }
 
    render(){
        const props = this.props;
        const Item = List.Item;
        const Brief = Item.Brief;
        return( props.user ?(
            <div>
                <Result
                  img={<img src={require(`../img/${props.avator}.png`)} style={{width:50}} alt=''/>}
                  title={this.props.user}
                  message={props.type ==='boss' ? props.company:null}
                />
                <List renderHeader={()=>'简介'}>
                  <Item
                    multipleLine
                  >
                     {props.title}
                     {this.props.desc.split('\n').map(v=>
                       <Brief key={v}>{v}</Brief>
                    )} 
                    {
                        props.money?<Brief>薪资：{props.money}</Brief>:null
                    }      
                  </Item>
                </List>
                <WhiteSpace/>
                <List>
                    <Item onClick={this.logout}>退出登录</Item>
                </List>
            </div>
           ) : <Redirect to={props.redirectTo}/> 
        )
    }
}   

export default  connect(
    state=>state.user,
    {
        logoutSubmit
    }
)(User)  