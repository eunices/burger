import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    return(
      <Redirect to="/"/>
    );
  }
}

Logout.propTypes = {
  logout: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.authLogout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);