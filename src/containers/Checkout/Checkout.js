import React, {Component} from 'react';

import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Layout  from '../../hoc/Layout/Layout';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

  state = {
    ingredients: {},
  }

  UNSAFE_componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }
    this.setState({ingredients: ingredients});
  }
  
  onCheckoutCancelledHandler = () => {
    this.props.history.goBack();
  }
  
  onCheckoutHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {

    return(
      <Layout>
        <CheckoutSummary 
          ingredients={this.state.ingredients}
          onCheckoutCancelled={this.onCheckoutCancelledHandler}
          onCheckout={this.onCheckoutHandler}
        />
        <Route 
          path={this.props.match.path + '/contact-data'}
          render={(props) => <ContactData
            ingredients={this.state.ingredients}
            {...props}
          />}
        />
      </Layout>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
};

export default Checkout;