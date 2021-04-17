import React from 'react';

import PropTypes from 'prop-types';

import classes from './CheckoutSummary.module.css';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {
  return(
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes great!</h1>
      <div style={{width: '300px', height: '300px'  }}>
        <Burger ingredients={props.ingredients}/>
        <Button btn="Danger" clicked>Cancel</Button>
        <Button btn="Success" clicked>Continue</Button>
      </div>
    </div>
  );
};

checkoutSummary.propTypes = {
  ingredients: PropTypes.object,
};

export default checkoutSummary;