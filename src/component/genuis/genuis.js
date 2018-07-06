import React from 'react';
import { connect } from "react-redux";
import { getUserList } from "../../redux/chatuser.redux";
import Usercard from "../usercard/usercard";

class Genuis extends React.Component{

    componentDidMount(){
       this.props.getUserList('boss')
    }
    render(){

        return (
            <Usercard userList={this.props.userList}/>
        )
    }

}

export default  connect(
    state=>state.chatuser,
   { getUserList}
)(Genuis)    