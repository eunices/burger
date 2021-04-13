import React, { Component } from 'react';

import PropTypes from 'prop-types';

import classes from './Layout.module.css';

import Hux from '../../hoc/Hux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component {

  state = {
    showSidedrawer: false,
  }

  sidedrawerClosedHandler = () => {
    this.setState({showSidedrawer: false});
  }
  
  sidedrawerOpenHandler = () => {
    this.setState({showSidedrawer: true});
  }

  sidedrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {showSidedrawer: !prevState.showSidedrawer};
    });
  }

  render() {
    return(
      <Hux>
        <Sidedrawer 
          visible={this.state.showSidedrawer}
          closed={this.sidedrawerClosedHandler}
        />
        <Toolbar
          clicked={this.sidedrawerToggleHandler}
        />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Hux>
    );
  }
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
