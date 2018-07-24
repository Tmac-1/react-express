import React from 'react';
import { List,InputItem } from "antd-mobile";
import { connect } from "react-redux";
import { getMsgList,sendMsg,recvMsg} from "../../redux/chat.redux";

import io from "socket.io-client";


// 连接
const socket =  io('ws://localhost:9093')


class Chat extends React.Component{
   
    state = {
        text:'',
        msg:[]
    }

    componentDidMount(){
        this.props.getMsgList()
        this.props.recvMsg()
     // 接收广播的事件
        // socket.on('recvmsg',(data)=>{
        //     console.log(data)
        //     this.setState({
        //         msg:[...this.state.msg,data.text]
        //     })
        // })

    }
   
    handleSubmit = ()=>{
        // 发送给后端
        // socket.emit('sendmsg',{text:this.state.text})
        // this.setState({text:''})

        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg({
            from,to,msg
        })
        this.setState({
            text:''
        })
    }

    render(){
        return (
            <div>
                {this.state.msg.map(  v => <p key={v}> {v}</p>
                    
                )}
                <div className="stick-footer">
                <List>
                    <InputItem
                        placeholder="请输入"
                        value={this.state.text}
                        onChange = {v=>{
                            this.setState({text:v})
                        }}
                        extra ={ <span onClick={()=>this.handleSubmit()}> 发送</span>}
                    >
                    
                    </InputItem>
                </List>
                </div>
            </div>

        )
    }
}

export default  connect(
    state => state,
    {
      getMsgList,sendMsg,recvMsg
    }
)(Chat) ;
