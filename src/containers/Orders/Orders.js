import React, {Component} from 'react';

import classes from './Orders.modules.css';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import ax from '../../axios-orders';

class Orders extends Component { 

  state = {
    loading: false,
    orders: [],
  }

  componentDidMount() {
    this.setState({loading: true});

    ax.get('/orders.json')
      .then(response => {
        const orders = Object.keys(response.data)
          .map(key => {
            return {...response.data[key], key: key};
          });
        this.setState({loading: false, orders: orders});
      })
      .catch(_error => {
        this.setState({loading: false});
      });
  }

  render() {

    const ordersShown = this.state.loading ? 
      <Spinner/> :
      (this.state.orders.map((order, i) => {
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

export default Orders;