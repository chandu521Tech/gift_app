import React, { Component } from 'react';

export default class SideHeader extends Component{

    render(){
        return(
            <div className="side-header">
                <h2>{this.props.text}</h2>
           </div>
        );
    };
}