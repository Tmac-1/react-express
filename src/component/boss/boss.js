import React from 'react';
import { connect } from "react-redux";
import { getUserList } from "../../redux/chatuser.redux";
import UserCard from "../usercard/usercard";

class Boss extends React.Component{

    componentDidMount(){
       this.props.getUserList('genuis')
    }
    render(){
        return (
            <UserCard userList={this.props.userList}/>
        )
    }

}

export default  connect(
    state=>state.chatuser,
   { getUserList}
)(Boss)    