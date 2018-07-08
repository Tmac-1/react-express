import React from "react";

export default function imoocForm(Comp){
    return class WrapperComp extends React.Component{
        state={}

        handleChagnge = (key,val)=>{
            // console.log(key,val)
            this.setState({
              [key]:val
            })
        }

        render(){
            return <Comp  handleChagnge={this.handleChagnge}  {...this.props} state={this.state}></Comp>
        }
    }
}    