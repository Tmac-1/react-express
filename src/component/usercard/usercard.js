import React from "react";
import { WingBlank,WhiteSpace,Card  } from "antd-mobile";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class UserCard extends React.Component{

  static propsTypes  = {
      userList:PropTypes.array.isRequired
  }

  handleClick(v){
      this.props.history.push(`/chat/${v._id}`)
  }
        
   render(){
    const Header = Card.Header;
    const Body = Card.Body;
    return(
        <WingBlank>
        <WhiteSpace size='lg'></WhiteSpace>
            {
                this.props.userList.map(v=>(
                    v.avator?  
                    <Card 
                       key={v._id}
                       onClick={()=>this.handleClick(v)} 
                    >
                        <Header
                            title={v.user}
                            thumb={require(`../img/${v.avator}.png`)}
                            thumbStyle={{width:50}}
                            extra={<span> {v.title} </span>}
                        ></Header>
                        <Body>
                            {
                               v.type==='boss'?<div> 公司：{v.company}</div> :null
                            }
                            {
                                v.desc.split('\n').map(item=>(
                                    <div key={item}>{item}</div>
                                ))
                            }
                            {
                                v.type==='boss'?<div> 薪资：{v.money}</div> :null
                            }
                        </Body>
                    </Card>:null
                ))
            }
       </WingBlank>  
    )

       
   }

}

export default withRouter(UserCard) 


