import React, { Component } from 'react';
import { map, isEmpty } from 'lodash';
import CardsError from './cardsError.component';
import './card.css';

export default class Card extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         isCardsEmpty: false,
    //         cardsData: null
    //     }
    // }
    render() {
        let cards = "";
        if (!isEmpty(this.props.cardsData)) {
            cards = map(this.props.cardsData, (card) => {
                {
                    return (
                        <div className="card" onClick={()=> window.open(card.link, "_blank")}>
                            <img src={card.ProductImage} alt="Product" />
                            <div className="container">
                                <p>{card.marchant}</p>
                                <p>{`$ ${card.discountPrice}`}</p>
                            </div>
                        </div>
                    );
                }
            });
        } else {
            return (<CardsError />);
        }
        return (
            <React.Fragment>
                {cards}
            </React.Fragment>
        );
    };
}