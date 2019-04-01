import React, { Component } from 'react';
import './genderType.css'
import { StringConstants, JsonKeys } from '../utils/constants';

export default class GenderType extends Component{
    constructor(props){
        super(props);
        this.state = {
            type: null
        }
    }
    typeFilter = (e, type) => {
        if(this.state.type != type || this.state.type == null){
            // e.currentTarget.children[0].classList.toggle('active');
            // e.currentTarget.children[1].classList.toggle('active');
            let elements = document.querySelectorAll('.icon-item span')
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.remove('active')
            }
            e.currentTarget.children[0].classList.add('active');
            e.currentTarget.children[1].classList.add('active');
            this.props.typeFilter(type);
        }
    }
    render(){
        return(
            <div className="gender-type-box">
                <div className="icon-item" onClick={(e)=>this.typeFilter(e, JsonKeys.ALL)}>
                    <span className="icon icon-1 active"></span>
                    <span className="icon-text active" >{StringConstants.ALL}</span>
                </div>
                <div className="icon-item" onClick={(e)=>this.typeFilter(e, JsonKeys.MEN)}>
                    <span className="icon icon-2"></span>
                    <span className="icon-text">{StringConstants.MEN}</span>
                </div>
                <div className="icon-item" onClick={(e)=>this.typeFilter(e, JsonKeys.WOMEN)}>
                    <span className="icon icon-3"></span>
                    <span className="icon-text">{StringConstants.WOMEN}</span>
                </div>
                <div className="icon-item" onClick={(e)=>this.typeFilter(e, JsonKeys.KIDS)}>
                    <span className="icon icon-4"></span>
                    <span className="icon-text">{StringConstants.KIDS}</span>
                </div>
                <div className="icon-item" onClick={(e)=>this.typeFilter(e, JsonKeys.TEEN)}>
                    <span className="icon icon-5"></span>
                    <span className="icon-text">{StringConstants.TEEN}</span>
                </div>
           </div>
        );
    };
}