import axios from "axios";
import io from "socket.io-client";

// 连接
const socket = io('ws://localhost:9093')

// 获取聊列表
const MSG_List = "MSG_LIST";
// 读取信息
const MSG_RECV = "MSG_RECV";
// 标识已读
const MSG_READ = "MSG_READ";

const initState = {
    chatMsg:[],
    unread:0
}

export function chat(state=initState,action){
    switch(action.type){
        case MSG_List:
        return {...state,chatmsg:action.payload,unread:action.payload.filter(v=>!v.read)}
        case MSG_RECV:
        return {...state,chatmsg:[...state.chatMsg,action.payload]}
        case MSG_READ:
        default :
        return state
    }
}


function msgList(msgs){
    return {type:'MSG_LIST',payload:msgs}
}

function msgRecv(msg){
    return {type:MSG_RECV,payload:msg}
}

// 发送消息
export function sendMsg({from,to,msg}){
    return dispatch =>{
        socket.emit('sendmsg',{from,to,msg})
    }
}

// 接收消息
export function recvMsg(){
    return dispatch =>{
        // 监听消息
        socket.on('recvmsg',function(data){
           console.log('recvmsg',data)
           dispatch(msgRecv(data))
        })
    }
}

// 获取消息列表
export function getMsgList(){
    return dispatch => {
        axios.get('/user/getmsglist').then(
            res=>{
                if(res.state ===200 && res.data.code ===0){
                   dispatch(msgList(res.data.msgs))
                }
            }
        )
    }
}


