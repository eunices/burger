import React, { Component } from 'react';

import PropTypes from 'prop-types';

import classes from './BurgerBuilder.module.css';

import Hux from '../../hoc/Hux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import ax from '../../axios-orders';

import { INGREDIENT_PRICES } from '../../util/constants';
import { sumTotalPrice, sumTotalIngredients } from '../../util/util';

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

        const totalPrice = sumTotalPrice(updatedIngredients);
        this.setState({totalPrice: totalPrice});

        this.updatePurchasableState(updatedIngredients);
      })
      .catch(error => {
        console.log('Error: ', error.message);
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
    const sum = sumTotalIngredients(ingredients);
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

    this.setState({loading: true});
    const { ingredients } = this.state;
    const queryParams = [];
    for (let i in ingredients) {
      queryParams.push(
        `${encodeURIComponent(i)}=${encodeURIComponent(ingredients[i])}`,
      );
    }
    const queryString = '?' + queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: queryString,
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

BurgerBuilder.propTypes = {
  history: PropTypes.object,
};

export default withErrorHandler(BurgerBuilder, ax);
