import React, { Component } from 'react';
import { connect } from "react-redux";
import { get, map } from 'lodash';
import { saveToStoreAction } from '../redux/actions';
import './main.css'
import { StringConstants, JsonKeys } from '../utils/constants';
import Card from '../components/card.component';
import SideHeader from '../components/sideHeader.component';
import CategoryDropDown from '../components/categoryDropdown.component';
import GenderType from '../components/genderType.component';
import PriceRangeSlider from '../components/priceRangeSlider.component';
const cardData = require('../services/products-data.json');

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Productscard: null,
            category: "Select",
            type: "all",
            range: "1000"
        };
    }
    componentWillMount() {
        this.setState({ Productscard: cardData });
    }
    categoryFilter = (category) => {
        this.setState({ Productscard: cardData, category: category }, () => {
            this.ApplyAllTypeFilter();
        });
    }
    typeFilter = (type) => {
        this.setState({ Productscard: cardData, type: type }, () => {
            this.ApplyAllTypeFilter();
        });
    }
    rangeFilter = (range) => {
        this.setState({ Productscard: cardData, range: range }, () => {
            this.ApplyAllTypeFilter();
        });
    }
    ApplyAllTypeFilter = () => {
        let filterData = [];
        if (this.state.category === StringConstants.SELECT && this.state.type === JsonKeys.ALL) {
            map(cardData, (item) => {
                if (get(item, JsonKeys.DISCOUNT_PRICE) <= this.state.range) {
                    filterData.push(item);
                }
            });
        } else if (this.state.category !== StringConstants.SELECT && this.state.type === JsonKeys.ALL) {
            map(cardData, (item) => {
                if (get(item, JsonKeys.CATEGORY) === this.state.category && get(item, JsonKeys.DISCOUNT_PRICE) <= this.state.range) {
                    filterData.push(item);
                }
            });
        } else if (this.state.category === StringConstants.SELECT && this.state.type !== JsonKeys.ALL) {
            map(cardData, (item) => {
                if (get(item, JsonKeys.TYPE) === this.state.type && get(item, JsonKeys.DISCOUNT_PRICE) <= this.state.range) {
                    filterData.push(item);
                }
            });
        } else if (this.state.category !== StringConstants.SELECT && this.state.type !== JsonKeys.ALL) {
            map(cardData, (item) => {
                if (get(item, JsonKeys.CATEGORY) === this.state.category && get(item, JsonKeys.TYPE) === this.state.type && get(item, JsonKeys.DISCOUNT_PRICE) <= this.state.range) {
                    filterData.push(item);
                }
            });
        }
        this.setState({ Productscard: filterData });
    }
    render() {
        return (
            <div className="main-container">
                <div className="header-container">
                    <SideHeader text={StringConstants.SIDE_HEADING} />
                    <CategoryDropDown text={StringConstants.SELECT_CATEGORY} categoryFilter={this.categoryFilter} />
                    <GenderType typeFilter={this.typeFilter} />
                    <PriceRangeSlider rangeFilter={this.rangeFilter} />
                </div>
                <div className="card-container">
                    <Card cardsData={this.state.Productscard} />
                </div>
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