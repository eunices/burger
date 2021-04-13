import React, { Component } from 'react';

import classes from './BurgerBuilder.module.css';

import Hux from '../../hoc/Hux';
import Modal from '../../components/UI/Modal/Modal';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 1,
  meat: 1.3,  
};

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice + priceAddition;

    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchasableState(updatedIngredients);
  }
  
  removeIngredientHandler =  (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount <= 0 ? oldCount : oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    
    const priceReduction = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice - priceReduction;

    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchasableState(updatedIngredients);
  }

  updatePurchasableState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(ingredient => {
        return ingredients[ingredient];
      })
      .reduce((sum, value) => {
        return sum + value;
      }, 0);
    this.setState({purchasable: sum > 0});
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  modalClosedHandler = () => {
    this.setState({purchasing: false});
  }
  
  purchaseContinueHandler = () => {
    alert('You continue!');
  }

  render () {

    const disabledInfo = {...this.state.ingredients};

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0; 
    }

    return (
      <Hux>

        <div className={classes.BurgerBuilder}>

          <Modal 
            visible={this.state.purchasing}
            modalClosed={this.modalClosedHandler}
          >
            <OrderSummary 
              ingredients={this.state.ingredients}
              purchasable={this.state.purchasable}
              price={this.state.totalPrice}
              modalClosed={this.modalClosedHandler}
              purchaseContinue={this.purchaseContinueHandler}
            />
          </Modal>

          <Burger 
            className={classes.Item}
            ingredients={this.state.ingredients}
          />

          <BuildControls 
            className={classes.Item}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            purchasing={this.state.purchasing}
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            ordered={this.purchaseHandler}
            disabled={disabledInfo}
          />

        </div>

      </Hux>
    );
  }
}

export default BurgerBuilder;
