import React, { Component } from 'react';
import { connect } from "react-redux";
import { map } from 'lodash';
import { DropDownStrings, StringConstants } from '../utils/constants';
import { saveToStoreAction } from '../redux/actions';
import './categoryDropdown.css'

export default class CategoryDropDown extends Component {
    changeCategory = (e) => {
        this.props.categoryFilter(e.target.value);
    }
    render() {
        const list = map(DropDownStrings.dropdownList, (data) => {
            return (<option value={data}>{data}</option>)
        })
        return (
            <div className="category-drop-down">
                <p>{this.props.text}</p>
                <select className="select_box" onChange={(e) => this.changeCategory(e)}>
                    <option value={StringConstants.SELECT}>{StringConstants.SELECT}</option>
                    {list}
                </select>
            </div>
        );
    };
}
const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return {
        saveData: data => { dispatch(saveToStoreAction(data)) }
    };
}
export const Category = connect(mapStateToProps, mapDispatchToProps)(CategoryDropDown);