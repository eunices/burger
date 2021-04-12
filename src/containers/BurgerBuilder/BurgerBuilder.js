import React, { Component } from 'react';

import Hux from '../../hoc/Hux';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
  render () {
    return (
      <Hux>
        <Burger/>
        <div>Build controls</div>
      </Hux>
    );
  }
}

export default BurgerBuilder;
