import React, { Component } from 'react';
import { map, isEmpty, get, isNull } from 'lodash';
import { StringConstants, JsonKeys } from '../utils/constants';
import CardsError from './cardsError.component';
import './card.css';

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardDetails: null,
            showDetails: false,
            detailsId: null,
            offsetLeft: null,
            offsetTop: null
        }
    }
    openCardDetails = (e) => {
        this.setState({
            showDetails: true,
            detailsId: e.currentTarget.id,
            offsetLeft: (e.currentTarget.offsetLeft - 50) + "px",
            offsetTop: (e.currentTarget.offsetTop - 70) + "px"
        });
    }
    closeCardDetails = (e) => {
        this.setState({
            showDetails: false,
            detailsId: null,
            offsetLeft: null,
            offsetTop: null
        });
    }
    render() {
        let cards = "";
        let cardDetails = "";
        if (!isEmpty(this.props.cardsData)) {
            cards = map(this.props.cardsData, (card) => {
                {
                    return (
                        <div id={get(card, JsonKeys.ID)} className="card" onClick={() => window.open(get(card, JsonKeys.LINK), "_blank")} onMouseOver={(e) => this.openCardDetails(e)}>
                            <img src={get(card, JsonKeys.PRODUCT_IMAGE)} alt={get(card, JsonKeys.NAME)} />
                            <div className="container">
                                <p>{get(card, JsonKeys.MARCHANT)}</p>
                                <p>{`$ ${get(card, JsonKeys.DISCOUNT_PRICE)}`}</p>
                            </div>
                        </div>
                    );
                }
            });
            if (this.state.showDetails === true && !isNull(this.state.detailsId) && !isNull(this.state.offsetLeft) && !isNull(this.state.offsetTop)) {
                cardDetails = map(this.props.cardsData, (item) => {
                    if (get(item, JsonKeys.ID) === this.state.detailsId) {
                        return (
                            <div id={get(item, JsonKeys.ID)} style={{ top: this.state.offsetTop, left: this.state.offsetLeft }} className="card-details" onClick={() => window.open(get(item, JsonKeys.LINK), "_blank")} onMouseLeave={(e) => this.closeCardDetails(e)}>
                                <img src={get(item, JsonKeys.PRODUCT_IMAGE)} alt={get(item, JsonKeys.NAME)} />
                                <div className="details-container">
                                    <p>{get(item, JsonKeys.NAME)}</p>
                                    <p>{`$ ${get(item, JsonKeys.ACTUAL_PRICE)}`}</p>
                                    <p>{`$ ${get(item, JsonKeys.DISCOUNT_PRICE)}`}</p>
                                    <p>{get(item, JsonKeys.BRAND)}</p>
                                </div>
                                <div className="details-footer">
                                    <p>{`${StringConstants.SEE_MORE} ${get(item, JsonKeys.TYPE)} ${StringConstants.APPAREL}`}</p>
                                </div>
                            </div>
                        );
                    }
                });
            }
        } else {
            return (<CardsError />);
        }
        return (
            <React.Fragment>
                {cards}
                {this.state.showDetails ? cardDetails : ''}
            </React.Fragment>
        );
    };
}