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
    };

    this.props.onOrderBurger(order);

  }

  inputChangedHandler = (event, id) => {
    const updatedOrderForm = {...this.state.orderForm};
    const updatedFormElement = {...updatedOrderForm[id]};
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = updatedFormElement.validation ? this.checkValidity(
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

  checkValidity(value, rules) {
    let isValid = true;

    if(rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength) {
      isValid = value.length >=  rules.minLength && isValid;
    }

    return isValid;
  }

  render() {

    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key, 
        config: this.state.orderForm[key],
      });
    }

    const form = this.props.loading ? <Spinner/> : (
      <React.Fragment>
        <form onSubmit={this.orderHandler}>
          {/* <Input elementType={} elementConfig={}/> */}
          {formElementsArray.map(el => {
            return(
              <Input
                key={el.id}
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                value={el.config.value}
                invalid={!el.config.valid}
                shouldValidate={el.config.validation}
                touched={el.config.touched}
                changed={(event) => this.inputChangedHandler(event, el.id)}
              />
            );
          })}
          
          <Button buttontype="Success" disabled={!this.state.isFormValid}>
            Order
          </Button>
        </form>
      </React.Fragment>);
    

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
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(ContactData, ax),
);