import React from 'react';
import { connect } from "react-redux";
// import { Card,WingBlank,WhiteSpace } from "antd-mobile"; 
import { getUserList } from "../../redux/chatuser.redux";
import UserCard from "../usercard/usercard";

class Boss extends React.Component{

    componentDidMount(){
       this.props.getUserList('genuis')
    }
    render(){
        // const Header = Card.Header;
        // const Body = Card.Body;
        return (
            <UserCard userList={this.props.userList}/>
            // <WingBlank>
            //      <WhiteSpace size='lg'></WhiteSpace>
            //     {
            //         this.props.userList.map(v=>(
            //           v.avator?  
            //             <Card key={v._id}>
            //                 <Header
            //                   title={v.user}
            //                   thumb={require(`../img/${v.avator}.png`)}
            //                   thumbStyle={{width:50}}
            //                   extra={<span> {v.title} </span>}
            //                 ></Header>
            //                 <Body>
            //                    {
            //                        v.desc.split('\n').map(v=>(
            //                            <div key={v}>{v}</div>
            //                        ))
            //                    }
            //                 </Body>
            //             </Card>:null
            //         ))
            //     }
            // </WingBlank>
        )
    }

}

export default  connect(
    state=>state.chatuser,
   { getUserList}
)(Boss)    