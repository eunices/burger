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
import * as actions from '../../store/actions/index';

import { sumTotalIngredients } from '../../util/util';
import burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {

  state = {
    purchasing: false,
  }

  componentDidMount () {
    this.props.onInitIngredients();

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
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  render () {
    const disabledInfo = {...this.props.ings};

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0; 
    }

    const orderSummary = this.props.ings === null ?
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
          isAuthenticated={this.props.isAuthenticated}
        />
      </Hux>
    );

    if (this.props.error) {
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
  onInitIngredients: PropTypes.func,
  onInitPurchase: PropTypes.func,
  totalPrice: PropTypes.number,
  error: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.idToken !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: (ingName) => dispatch(actions.initIngredients()),
    onInitPurchase: (ingName) => dispatch(actions.purchaseInit()),
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps)(
  withErrorHandler(BurgerBuilder, ax),
);
