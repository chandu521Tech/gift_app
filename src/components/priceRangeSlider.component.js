import React, { Component } from 'react';
import StepRangeSlider from 'react-step-range-slider'
import { map } from 'lodash';
import './priceRange.css'
import { StringConstants } from '../utils/constants';

export default class PriceRangeSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rangevalue: "1000"
        }
    }
    rangeFilter = (value) => {
        this.setState({ rangevalue: value });
        this.props.rangeFilter(value);
    }
    render() {
        const range = [
            { value: 25, step: 25 },
            { value: 50, step: 50 },
            { value: 100, step: 900 },
            { value: 1000, step: 1000 },
            { value: 2000 }
        ]
        return (
            <div className="price-range-slider">
                <span>{StringConstants.SET_PRICE}</span>
                <StepRangeSlider
                    value={this.state.rangevalue}
                    range={range}
                    onChange={value => this.rangeFilter(value)}
                />
                <div className="price-list">
                    {map(range, (item) => {
                        if (item.value <= 1000) {
                            return (<li>{`$ ${item.value}`} </li>);
                        } else {
                            return (<li>$ 1000+ </li>);
                        }
                    })}
                </div>
            </div>
        );
    };
}