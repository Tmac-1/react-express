import React from 'react';
import { List,InputItem } from "antd-mobile";
import io from "socket.io-client";

// 连接
const socket =  io('ws://localhost:9093')


class Chat extends React.Component{
   
    state = {
        text:'',
        msg:[]
    }

    componentDidMount(){
     // 接收广播的事件
        socket.on('recvmsg',(data)=>{
            console.log(data)
            this.setState({
                msg:[...this.state.msg,data.text]
            })
        })

    }
   
    handleSubmit = ()=>{
        // 发送给后端
        socket.emit('sendmsg',{text:this.state.text})
        this.setState({text:''})
        // console.log(this.state)
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

export default  Chat;
