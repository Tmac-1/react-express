import React from 'react';
import {Grid,List} from 'antd-mobile';
import PropTypes from "prop-types";

class AvatarSelector extends React.Component{

    static propTypes = {
        selectAvatar:PropTypes.func.isRequired
    }

    state ={ }
    render(){
        const avatarList = 'ai,anxi,caizi,chimu,clay,cp3,gonchen,gorden,james,liuchan,mumu,nash,qingzi,sanjin,xiandao,yingmu'
                           .split(',')
                           .map(v=>({
                               icon:require(`../img/${v}.png`),
                               text:v
                           }))
        const girdHeader = this.state.icon ? 
                           <div> 
                               <span>已选头像</span>
                               <img style={{width:20,height:20}} src={this.state.icon} alt=''/>
                           </div> :'请选择头像';                
        return (
            <div>
                 <List renderHeader={()=>girdHeader}>
                    <Grid data={avatarList} columNum={4}
                    onClick = { elm =>{
                        this.setState(elm)
                        this.props.selectAvatar(elm.text)
                        }
                    }
                    />
                 </List>

            </div>
        )
    }
}

export default AvatarSelector;