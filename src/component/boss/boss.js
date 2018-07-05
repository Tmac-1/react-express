import React from 'react';
import axios from "axios";
import { Card,WingBlank,WhiteSpace } from "antd-mobile"; 


class Boss extends React.Component{

    state = {
        data:[]
    }
    componentDidMount(){
        axios.get('/user/list?type=genuis').then( res=>{
            if( res.data.code ===0){
                this.setState({data:res.data.data})
            }
        })    
    }
    render(){
        const Header = Card.Header;
        const Body = Card.Body;
        return (
            <WingBlank>
                 <WhiteSpace size='lg'></WhiteSpace>
                {
                    this.state.data.map(v=>(
                      v.avator?  
                        <Card key={v._id}>
                            <Header
                              title={v.user}
                              thumb={require(`../img/${v.avator}.png`)}
                              thumbStyle={{width:50}}
                              extra={<span> {v.title} </span>}
                            ></Header>
                            <Body>
                               {
                                   v.desc.split('\n').map(v=>(
                                       <div key={v}>{v}</div>
                                   ))
                               }
                            </Body>
                        </Card>:null
                    ))
                }
            </WingBlank>
        )
    }

}

export default Boss