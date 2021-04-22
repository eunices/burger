import React from 'react';

import PropTypes from 'prop-types';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => {


  // console.log('[build controls.js]', this.props);

  const button = props.isAuthenticated ? 
 
    <button 
      className={classes.OrderButton}
      disabled={!props.purchasable | props.purchasing}
      onClick={props.ordered}
    >
        Order
    </button>
    :
    <button 
      className={classes.OrderButton}
      disabled
    >
      Sign in to continue
    </button>;

  return(
    <div className={classes.BuildControls}>
      <p>Price: <b>SGD {props.price.toFixed(2)}</b></p>
      {controls.map(control => {
        return (
          <BuildControl 
            key={control.label} 
            label={control.label}
            added={() => props.ingredientAdded(control.type)}
            removed={() => props.ingredientRemoved(control.type)}
            disabled={props.disabled[control.type]}
            disableAll={props.purchasing}
          />
        );
      })}
      {button}
    </div>
  );

};


buildControls.propTypes = {
  price: PropTypes.number,
  ingredientAdded: PropTypes.func,
  ingredientRemoved: PropTypes.func,
  ordered: PropTypes.func,
  disabled: PropTypes.object,
  purchasable: PropTypes.bool,
  purchasing: PropTypes.bool,
};


export default buildControls;