import React from 'react';
import io from "socket.io-client";

class Chat extends React.Component{
    componentDidMount(){
        // 连接
      const socket =  io('ws://localhost:9093')
    }
    render(){
        return (
            <div>
                Chat with user:{this.props.match.params.user}
            </div>
        )
    }
}

export default  Chat;
