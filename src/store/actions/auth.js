import * as actions from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actions.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: actions.AUTH_SUCCESS,
    authData: authData,
  };
};

export const authFail = (error) => {
  return {
    type: actions.AUTH_FAIL,
    error: error,
  };
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    const authData = {
      email: email, password: password, returnSecureToken: true,
    };
    
    const BASE_URL = 'https://identitytoolkit.googleapis.com/v1/';
    let url = null;
    if (isSignUp) {
      url = `${BASE_URL}accounts:signUp`;
    } else {
      url = `${BASE_URL}accounts:signInWithPassword`;
    }
    
    const key = 'AIzaSyA7htGVRRgIkcA7UaIURMx-REMThEB_olQ';
    axios.post(`${url}?key=${key}`, authData)
      .then(response => {
        dispatch(authSuccess(response.data));
      })
      .catch(error => {
        console.log('[error]', error.response.data.error.message);
        dispatch(authFail(error));
      });
  };
};