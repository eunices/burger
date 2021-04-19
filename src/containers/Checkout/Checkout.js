import React, {Component} from 'react';

import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Layout  from '../../hoc/Layout/Layout';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

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
          ingredients={this.props.ings}
          onCheckoutCancelled={this.onCheckoutCancelledHandler}
          onCheckout={this.onCheckoutHandler}
        />
        <Route 
          path={this.props.match.path + '/contact-data'}
          render={(props) => <ContactData
            ingredients={this.props.ings}
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
  ings: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

export default connect(mapStateToProps)(Checkout);