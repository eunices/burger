import React, { Component } from 'react';

import PropTypes from 'prop-types';

import classes from './ContactData.module.css';

import { sumTotalPrice } from '../../../util/util';
import ax from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import propTypes from 'prop-types';

class ContactData extends Component {

  state = {
    customer: {
      name: '',
      email: '',
      address: {
        street: '',
        postalCode: '',
      },
    },
    loading: false,
  }

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({loading: true});
    
    const order = {
      ingredients: this.props.ingredients,
      price: sumTotalPrice(this.props.ingredients), 
      // calculate on server, potential for price manipulation
      customer: this.state.customer,
      delivery: 'fastest',
    };

    ax.post('/orders.json', order)
      .then(_response => {
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(_error => {
        this.setState({loading: false});
      });

  }

  render() {

    const form = this.state.loading ? <Spinner/> : (
      <React.Fragment>
        <form>
          <input 
            type="text" 
            className={classes.Input}
            name="name"
            placeholder="Your name"/>
          <input 
            type="text" 
            className={classes.Input}
            name="email"
            placeholder="Email"
          />
          <input 
            type="text" 
            className={classes.Input}
            name="street"
            placeholder="Street"
          />
          <input 
            type="text" 
            className={classes.Input}
            name="postalCode"
            placeholder="Postal code"/>
          <Button 
            buttontype="Success" 
            onClick={this.orderHandler} 
            type="submit"
          >
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
  history: propTypes.object,
  ingredients: propTypes.object,
};

export default ContactData;