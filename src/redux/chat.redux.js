import axios from "axios";
import io from "socket.io-client";

// 连接
const socket = io('ws://localhost:9093')

// 获取聊列表
const MSG_LIST = "MSG_LIST";
// 读取信息
const MSG_RECV = "MSG_RECV";
// 标识已读
const MSG_READ = "MSG_READ";

const initState = {
    chatmsg:[],
    users:{},
    unread:0, // 未读消息
}

export function chat(state=initState,action){
    switch(action.type){
        case MSG_LIST:
        return {...state,users:action.payload.users,chatmsg:action.payload.msgs,unread:action.payload.msgs.filter(v=>!v.read&&v.to==action.payload.userid).length}
        case MSG_RECV:
        const n = action.payload.to == action.userid?1:0
        return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+n}
        case MSG_READ:
        default :
        return state
    }
}


function msgList(msgs,users,userid){
    return {type:MSG_LIST,payload:{msgs,users,userid}}
}

function msgRecv(msg,userid){
    return {userid,type:MSG_RECV,payload:msg}
}

// 发送消息
export function sendMsg({from,to,msg}){
    return dispatch =>{
        socket.emit('sendmsg',{from,to,msg})
    }
}

// 接收消息
export function recvMsg(){
    return (dispatch,getState) =>{
        // 监听后台发来的消息
        socket.on('recvmsg',function(data){
           console.log('recvmsg',data)
           const userid = getState().user._id;
           dispatch(msgRecv(data,userid))
        })
    }
}

// 获取消息列表
export function getMsgList(){
    return (dispatch,getState) => {
        axios.get('/user/getmsglist').then(
            res=>{
                console.log(res)
                if(res.status ===200 && res.data.code ===0){
                    const userid = getState().user._id;
                   dispatch(msgList(res.data.msgs,res.data.users,userid))
                }
            }
        )
    }
}



