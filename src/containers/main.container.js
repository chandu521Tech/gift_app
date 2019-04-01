import React, { Component } from 'react';
import { connect } from "react-redux";
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
            category: null,
            type: null,
            range: "1000"
        };
    }
    componentWillMount() {
        this.setState({ Productscard: cardData });
    }
    categoryFilter = (category) => {
        if (category !== StringConstants.SELECT) {
            this.setState({ Productscard: cardData, category: category }, () => {
                let filterData = [];
                this.state.Productscard.filter((item) => {
                    if (this.state.category !== null) {
                        if (item.category === this.state.category) {
                            filterData.push(item);
                        }
                    }
                });
                this.setState({ Productscard: filterData });
            });
        } else {
            this.setState({ Productscard: cardData, category: null });
        }
        this.ApplyAllTypeFilter();
    }
    typeFilter = (type) => {
        if (type !== JsonKeys.ALL) {
            this.setState({ Productscard: cardData, type: type }, () => {
                let TypeFilter = [];
                this.state.Productscard.filter((item) => {
                    if (this.state.type !== null) {
                        if (item.type === this.state.type) {
                            TypeFilter.push(item);
                        }
                    }
                });
                this.setState({ Productscard: TypeFilter });
            });
        } else {
            this.setState({ Productscard: cardData, type: null });
        }
        this.ApplyAllTypeFilter();
    }
    rangeFilter = (range) => {
        this.setState({ Productscard: cardData, range: range }, () => {
            let RangeFilter = [];
            this.state.Productscard.filter((item) => {
                if (item.discountPrice <= this.state.range) {
                    RangeFilter.push(item);
                }
            });
            this.setState({ Productscard: RangeFilter });
        });
        this.ApplyAllTypeFilter();
    }
    ApplyAllTypeFilter = () => {
        if (this.state.category !== null && this.state.type !== null) {
            this.setState({ Productscard: cardData }, () => {
                let filterData = [];
                this.state.Productscard.filter((item) => {
                    if (item.category === this.state.category && item.type === this.state.type && item.discountPrice <= this.state.range) {
                        filterData.push(item);
                    }
                });
                this.setState({ Productscard: filterData });
            });
        }
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