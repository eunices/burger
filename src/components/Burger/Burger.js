import React from 'react';

import classes from './Burger.module.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  const transformedIngredients = Object.keys(props.ingredients)
    .map(ingredient => {
      return [...Array(props.ingredients[ingredient])] // initialize arr
        .map((_, i) => { 
          return <BurgerIngredient key={ingredient+i} type={ingredient}/>;
        });
    })
    .reduce((arr, el) => { // flatten
      return arr.concat(el); 
    }, []);

  return (
    <div className={classes.Burger}>
      <BurgerIngredient key='breadTop' type="bread-top"/>
      {
        transformedIngredients.length > 0 ?
          transformedIngredients :
          <p>There are no ingredients!</p> 
      }
      <BurgerIngredient key='breadBottom' type="bread-bottom"/>
    </div>
  );
};

export default burger;
