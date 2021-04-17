import React, {Component} from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Layout  from '../../hoc/Layout/Layout';

class Checkout extends Component {

  state = {
    ingerdients: {
      salad: 1,
      cheese: 1,
      bacon: 1, 
      meat: 1,
    },
  }

  render() {
    return(
      <div>
        <CheckoutSummary/>
      </div>
    );
  }
}

export default Checkout;