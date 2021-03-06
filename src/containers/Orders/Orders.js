import React, {Component} from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import classes from './Orders.modules.css';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

import ax from '../../axios-orders';


class Orders extends Component { 

  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {

    const ordersShown = this.props.loading ? 
      <Spinner/> :
      (this.props.orders.map((order, i) => {
        return(
          <Order
            key={`order${i}`}
            ingredients={order.ingredients}
            totalPrice={order.price}
          />
        );
      }));

    return(
      <div className={classes.Orders}>
        {ordersShown}
      </div>
    );
  }
}

Orders.propTypes = {
  onFetchOrders: PropTypes.func,
  loading: PropTypes.bool,
  orders: PropTypes.array,
  token: PropTypes.string,
  userId: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    token: state.auth.idToken,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(Orders, ax),
);