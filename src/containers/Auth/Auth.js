import React, { Component } from 'react';

import classes from './Auth.module.css';

import Button from '../../components/UI/Button/Button';
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
        {form}
      </div>
    );
  }
}

export default Auth;