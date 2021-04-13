import React from 'react';

import PropTypes from 'prop-types';

import Hux from '../../hoc/Hux';
import Button from '../UI/Button/Button';

const orderSummary = (props) => {

  let ingredientsSummary = null;
  if(props.purchasable) {
    ingredientsSummary = Object.keys(props.ingredients).map(ingredient => {
      return(<li key={ingredient}>
        <span style={{textTransform: 'capitalize'}}>{ingredient}: </span>
        {props.ingredients[ingredient]}</li>);
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
      <p>Total price: <b> SGD {props.price.toFixed(2)}</b></p>
      <p>Continue to checkout?</p>
      <Button clicked={props.modalClosed} buttonType="Danger">Cancel</Button>
      <Button clicked={props.purchaseContinue} buttonType="Success">Continue</Button>
    </Hux>
  );
};


orderSummary.propTypes = {
  ingredients: PropTypes.object,
  purchasable: PropTypes.bool,
  price: PropTypes.number,
  modalClosed: PropTypes.func,
  purchaseContinue: PropTypes.func,
};


export default orderSummary;