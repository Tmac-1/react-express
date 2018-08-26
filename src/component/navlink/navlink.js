import React from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { TabBar } from "antd-mobile";
import { connect } from "react-redux";

class NavLinkBar extends React.Component{
   
    static propTypes = {
        data:PropTypes.array.isRequired
    }

    render (){
        const navList = this.props.data.filter(v=>!v.hide)  // 过滤hide
        // console.log(navList)
        const {pathname} = this.props.location
        // console.log(pathname)
        return (
            <TabBar>
                {
                    navList.map((v=>(
                        <TabBar.Item
                          badge ={v.path=='/msg'?this.props.unread:null}
                          key={v.path}
                          title={v.text}
                          icon={{uri:require(`./img/${v.icon}.png`)}}
                          selectedIcon={{uri:require(`./img/${v.icon}-active.png`)}}
                          selected={ pathname ===v.path}
                          onPress={()=>{
                              this.props.history.push(v.path)
                          }}
                        >
                        </TabBar.Item>
                    )))
                }
            </TabBar>
        )
    }
}

export default connect(
    state =>state.chat,
    null
)(
    withRouter(NavLinkBar)
) 