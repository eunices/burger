import React, {Component} from 'react';

import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Layout  from '../../hoc/Layout/Layout';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/index';

class Checkout extends Component {

  componentDidMount() {
    this.props.onInitPurchase();
    
  }

  onCheckoutCancelledHandler = () => {
    this.props.history.goBack();
  }
  
  onCheckoutHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {

    let summary = <Redirect to="/"/>;
    const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
    if (this.props.ings) {
      summary =  <div>
        {purchasedRedirect}
        <CheckoutSummary 
          ingredients={this.props.ings}
          onCheckoutCancelled={this.onCheckoutCancelledHandler}
          onCheckout={this.onCheckoutHandler}/>
        <Route 
          path={this.props.match.path + '/contact-data'}
          render={(props) => <ContactData
            ingredients={this.props.ings}
            {...props}
          />}
        />
      </div>;
    }

    return(
      <Layout>
        {summary}
      </Layout>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  ings: PropTypes.object,
  onInitPurchase: PropTypes.func,
  purchased: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitPurchase: () => dispatch(actions.purchaseInit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);