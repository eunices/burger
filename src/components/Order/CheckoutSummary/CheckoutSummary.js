import React from 'react';

import PropTypes from 'prop-types';

import classes from './CheckoutSummary.module.css';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {

  return(
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes great!</h1>
      <div style={{width: '300px', height: '300px', margin: 'auto'}}>
        <Burger ingredients={props.ingredients}/>
        <Button 
          buttontype="Danger" 
          onClick={props.onCheckoutCancelled}
        >
          Cancel
        </Button>
        <Button 
          buttontype="Success"
          onClick={props.onCheckout}
        >
           Continue
        </Button>
      </div>
    </div>
  );

};

checkoutSummary.propTypes = {
  ingredients: PropTypes.object,
  onCheckoutCancelled: PropTypes.func,
  onCheckout: PropTypes.func,
};

export default checkoutSummary;