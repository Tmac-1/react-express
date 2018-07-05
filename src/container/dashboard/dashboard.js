import React from 'react';
import { NavBar } from "antd-mobile";
import  NavLinkBar  from "../../component/navlink/navlink";
import { connect } from "react-redux";


function Boss(){
    return <h2>BOSS 首页</h2>
}
function Genius(){
    return <h2>BOSS 首页</h2>
}
function Msg(){
    return <h2>消息 首页</h2>
}
function User(){
    return <h2>个人 首页</h2>
}

class Dashboard extends React.Component{
 
    render(){
        const user = this.props.user;
        const { pathname } = this.props.location
        const navList =[
         {
             path:'/boss',
             text:'牛人',
             icon:'boss',
             title:'牛人列表',
             component:Boss,
             hide:user.type ==='genius'
         },
         {
            path:'/genius',
            text:'BOSS',
            icon:'genius',
            title:'BOSS列表',
            component:Genius,
            hide:user.type ==='boss'
         },
         {
            path:'/msg',
            text:'消息',
            icon:'boss',
            title:'消息列表',
            component:Msg,
            hide:user.type ==='boss'
         },
         {
            path:'/me',
            text:'我',
            icon:'me',
            title:'个人中心',
            component:User,
         },
        ]
        return(
            <div>
                <NavBar mode='dard'> {navList.find( v=>v.path===pathname).title } </NavBar>
                <h2>contnet</h2>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>

        )
    }
}

export default connect(
    state=>state.user,
    null
)(Dashboard)   ;