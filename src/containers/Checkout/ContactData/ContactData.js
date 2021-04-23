import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import classes from './ContactData.module.css';

import { sumTotalPrice } from '../../../util/util';
import ax from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { 
  convertDictToArr,
  arrToInput,
  checkValidity,
} from '../../../util/form';

class ContactData extends Component {

  state = {
    orderForm: {
      
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },

      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },

      street: {
        elementType: 'textArea',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },

      postalCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Postal code',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
        },
        valid: false,
        touched: false,
      },

      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ],
        },
        value: 'cheapest',
        valid: true,
        touched: false,
      },

    },
    isFormValid: false,
  }

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({loading: true});

    const formData = {};
    for (let id in this.state.orderForm) {
      formData[id] = this.state.orderForm[id].value;
    }
    
    const order = {
      ingredients: this.props.ings,
      price: sumTotalPrice(this.props.ings), 
      // calculate on server, potential for price manipulation
      customer: formData,
      userId: this.props.userId,
    };

    this.props.onOrderBurger(order, this.props.token);

  }

  inputChangedHandler = (event, id) => {
    const updatedOrderForm = {...this.state.orderForm};
    const updatedFormElement = {...updatedOrderForm[id]};
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = updatedFormElement.validation ? checkValidity(
      updatedFormElement.value, updatedFormElement.validation,
    ) : true;
    updatedFormElement.touched = true;
    updatedOrderForm[id] =  updatedFormElement;

    let isFormValid  = true;
    for (let id in updatedOrderForm) {
      isFormValid = updatedOrderForm[id].valid && isFormValid;
    }

    this.setState({orderForm: updatedOrderForm, isFormValid: isFormValid});
  }

  render() {

    const formElementsArray = convertDictToArr(this.state.orderForm);
    const formInputs = arrToInput(formElementsArray, this.inputChangedHandler);
    const form = this.props.loading ? <Spinner/> : (
      <React.Fragment>
        <form onSubmit={this.orderHandler}>
          {formInputs}
          <Button buttontype="Success" disabled={!this.state.isFormValid}>
            Order
          </Button>
        </form>
      </React.Fragment>
    );

    return(
      <div className={classes.ContactData}>
        <h4>Enter your data</h4>
        {form}
      </div>
    );
  }
}

ContactData.propTypes = {
  history: PropTypes.object,
  ings: PropTypes.object,
  onOrderBurger: PropTypes.func,
  loading: PropTypes.bool,
  token: PropTypes.string,
  userId: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    loading: state.order.loading,
    token: state.auth.idToken,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) => dispatch(
      actions.purchaseBurger(orderData, token),
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(ContactData, ax),
);