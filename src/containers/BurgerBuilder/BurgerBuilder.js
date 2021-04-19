import React, { Component } from 'react';
import { connect } from 'react-redux';

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
import * as actionTypes from '../../store/action';

import { INGREDIENT_PRICES } from '../../util/constants';
import { sumTotalPrice, sumTotalIngredients } from '../../util/util';

class BurgerBuilder extends Component {

  state = {
    purchasing: false,
    loading: false,
    errorWithIngredients: false,
  }

  componentDidMount () {
    // ax.get('/ingredients.json')
    //   .then(response => {
    //     const updatedIngredients = response.data;
    //     this.setState({ingredients: updatedIngredients});

    //     const totalPrice = sumTotalPrice(updatedIngredients);
    //     this.setState({totalPrice: totalPrice});

    //     this.updatePurchasableState(updatedIngredients);
    //   })
    //   .catch(error => {
    //     console.log('Error: ', error.message);
    //     this.setState({errorWithIngredients: true});
    //   });
  }

  updatePurchasableState (ingredients) {
    const sum = sumTotalIngredients(ingredients);
    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  modalClosedHandler = () => {
    this.setState({purchasing: false});
  }
  
  purchaseContinueHandler = async () => {


    this.props.history.push('/checkout');


    
  }

  render () {

    const disabledInfo = {...this.props.ings};

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0; 
    }

    const orderSummary = this.state.loading | this.props.ings === null ?
      <Spinner/> : (
        <OrderSummary 
          ingredients={this.props.ings}
          purchasable={this.updatePurchasableState(this.props.ings)}
          price={this.props.totalPrice}
          modalClosed={this.modalClosedHandler}
          purchaseContinue={this.purchaseContinueHandler}
        />
      );

    let burger = this.props.ings === null ? <Spinner/> : (
      <Hux>
        <Burger 
          className={classes.Item}
          ingredients={this.props.ings}
        />
        <BuildControls 
          className={classes.Item}
          price={this.props.totalPrice}
          purchasable={this.updatePurchasableState(this.props.ings)}
          purchasing={this.state.purchasing}
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
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
  ings: PropTypes.object,
  onIngredientAdded: PropTypes.func,
  onIngredientRemoved: PropTypes.func,
  totalPrice: PropTypes.number,
};

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch({
      type: actionTypes.ADD_INGREDIENT, ingredientName: ingName,
    }),
    onIngredientRemoved: (ingName) => dispatch({
      type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName,
    }),
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps)(
  withErrorHandler(BurgerBuilder, ax));
