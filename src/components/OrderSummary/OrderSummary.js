import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Hux from '../../hoc/Hux';
import Button from '../UI/Button/Button';

class orderSummary extends Component {

  componentDidUpdate() {
    console.log('[Order summary] updated');
  }

  render() {

    let ingredientsSummary = null;
    if(this.props.purchasable) {
      ingredientsSummary = Object.keys(this.props.ingredients).map(ingredient => {
        return(<li key={ingredient}>
          <span style={{textTransform: 'capitalize'}}>{ingredient}: </span>
          {this.props.ingredients[ingredient]}</li>);
      });
    } else {
      ingredientsSummary = 'There are no ingredients!';
    }
  
    return(
      <Hux>
        <h3>Your order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientsSummary}
        </ul>
        <p>Total price: <b> SGD {this.props.price.toFixed(2)}</b></p>
        <p>Continue to checkout?</p>
        <Button clicked={this.props.modalClosed} buttonType="Danger">Cancel</Button>
        <Button clicked={this.props.purchaseContinue} buttonType="Success">Continue</Button>
      </Hux>
    );
  }

};


orderSummary.propTypes = {
  ingredients: PropTypes.object,
  purchasable: PropTypes.bool,
  price: PropTypes.number,
  modalClosed: PropTypes.func,
  purchaseContinue: PropTypes.func,
};


export default orderSummary;