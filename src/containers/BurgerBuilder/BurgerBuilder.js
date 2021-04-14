import React, { Component } from 'react';

import classes from './BurgerBuilder.module.css';

import Hux from '../../hoc/Hux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import ax from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 1,
  meat: 1.3,  
};

class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    errorWithIngredients: false,
  }

  componentDidMount () {
    ax.get('/ingredients.json')
      .then(response => {
        const updatedIngredients = response.data;
        this.setState({ingredients: updatedIngredients});
        this.updatePurchasableState(updatedIngredients);
      })
      .catch(errorWithIngredients => {
        this.setState({errorWithIngredients: true});
      });
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
  
  purchaseContinueHandler = async () => {
    // alert('You continue!');

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice, 
      // calculate on server, potential for price manipulation
      customer: {
        name: 'Test Test',
        address: 'Test Street',
        zipcode: '124422',
        country: 'Singapore',
      },
      email: 'test@test.com',
      delivery: 'fastest',
    };

    this.setState({loading: true});
    
    await ax.post('/orders.json', order)
      .then(_response => {
        this.setState({loading: false, purchasing: false});
      })
      .catch(_error => {
        this.setState({loading: false, purchasing: false});
      });

    
  }

  render () {

    const disabledInfo = {...this.state.ingredients};

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0; 
    }

    const orderSummary = this.state.loading | this.state.ingredients === null ?
      <Spinner/> : (
        <OrderSummary 
          ingredients={this.state.ingredients}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
          modalClosed={this.modalClosedHandler}
          purchaseContinue={this.purchaseContinueHandler}
        />
      );

    let burger = this.state.ingredients === null ? <Spinner/> : (
      <Hux>
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
      </Hux>
    );

    if (this.state.errorWithIngredients) {
      burger = <span>Error. Ingredients cannot be loaded!</span>;
    }

    return (
      <Hux>

        <div className={classes.BurgerBuilder}>

          <Modal 
            visible={this.state.purchasing}
            modalClosed={this.modalClosedHandler}
          >
            {orderSummary}
          </Modal>
          
          {burger}

        </div>

      </Hux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, ax);
