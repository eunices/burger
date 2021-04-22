import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import classes from './Layout.module.css';

import Hux from '../Hux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';

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
          isAuthenticated={this.props.isAuth}
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
  children: PropTypes.node,
  isAuth: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.idToken !== null,
  };
};

export default connect(mapStateToProps, null)(Layout);
