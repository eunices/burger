import React, { Component } from 'react';

import classes from './Auth.module.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import {
  convertDictToArr,
  arrToInput,
} from '../../util/form';


class Auth extends Component {

  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
    },

    isSignUp: false,

  }

  inputChangedHandler = (event, id) => {
    const updatedForm = {...this.state.controls};
    const updatedFormElement = {...updatedForm[id]};
    updatedFormElement.value = event.target.value;
    updatedForm[id] =  updatedFormElement;
    this.setState({controls: updatedForm});
  }

  orderHandler = (e) => {
    e.preventDefault();

    const { email, password } = this.state.controls;
    this.props.onAuth(email.value, password.value, this.state.isSignUp);
    
  }

  toggleSignUp = () => {
    this.setState(prevState => {
      return {isSignUp: !prevState.isSignUp};
    });
  }

  render() {

    const formElementsArray = convertDictToArr(this.state.controls);
    const formInputs = arrToInput(formElementsArray, this.inputChangedHandler);
    const form = (
      <React.Fragment>
        <form onSubmit={this.orderHandler}>
          {formInputs}
          <Button buttontype="Success" disabled={false}>
            Submit
          </Button>
         
        </form>
      </React.Fragment>
    );

    return(
      <div className={classes.Auth}>
        <h2>{this.state.isSignUp ? 'Sign up' : 'Sign in'}</h2>
        {form}
        <Button 
          buttontype="Danger" 
          disabled={false} 
          onClick={this.toggleSignUp}
        >
            Switch to  {this.state.isSignUp ? 'sign in' : 'sign up'}
        </Button>
      </div>
    );
  }
}


Auth.propTypes = {
  onAuth: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
  };
};

export default connect(null, mapDispatchToProps)(Auth);