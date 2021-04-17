import React from 'react';

import classes from  './Order.module.css';

const order = (props) => {

  const ingredientsFormatted = Object.keys(props.ingredients).map(
    ingredient => {
      return(
        <span 
          key={ingredient}
          style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0px 8px',
            border: '1px solid #ccc',
            padding: '5px',
          }}>
          {`${ingredient} (${props.ingredients[ingredient]})`}
        </span>
      );},
  );

  return(
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsFormatted}</p>
      <p>Price: <strong>SGD {props.totalPrice.toFixed(2)}</strong></p>
    </div>
  );
};

export default order;