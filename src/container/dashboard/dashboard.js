import React from 'react';
import { NavBar } from "antd-mobile";
import  NavLinkBar  from "../../component/navlink/navlink";
import { Switch , Route } from "react-router-dom";
import { connect } from "react-redux";
import Boss from "../../component/boss/boss";
import Genuis from "../../component/genuis/genuis";
import User from "../../component/user/user";
import { getMsgList,recvMsg } from "../../redux/chat.redux";

function Msg(){
    return <h2>消息 首页</h2>
}


class Dashboard extends React.Component{
 
    componentDidMount(){

    }

    render(){
        // console.log(this.props)
        const user = this.props.user;
        // console.log(user)
        const { pathname } = this.props.location
        const navList =[
         {
             path:'/boss',
             text:'牛人',
             icon:'genuis',
             title:'牛人列表',
             component:Boss,
             hide:user.type ==="genuis"
         },
         {
            path:'/genuis',
            text:'BOSS',
            icon:'boss',
            title:'BOSS列表',
            component:Genuis,
            hide:user.type ==='boss'
         },
         {
            path:'/msg',
            text:'消息',
            icon:'msg',
            title:'消息列表',
            component:Msg,
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
                <NavBar className="fixd-header" mode='dard'> {navList.find( v=>v.path===pathname).title } </NavBar>
                  <div style={{marginTop:45}}>
                    <Switch>
                        {
                            navList.map(v=>(
                                <Route key={v.path} path={v.path} component={v.component}/>
                            ))
                        }
                    </Switch>
                  </div>

                <NavLinkBar data={navList}></NavLinkBar>
            </div>

        )
    }
}

export default connect(
    state=>state,
    {
        getMsgList,
        recvMsg
    }
)(Dashboard)   ;