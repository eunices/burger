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

export const auth = (email, password) => {
  return dispatch => {
    const authData = {
      email: email, password: password, returnSecureToken: true,
    };
    
    const BASE_URL = 'https://identitytoolkit.googleapis.com/v1/';
    let url = null;
    url = `${BASE_URL}accounts:signUp`;
    // url = `${BASE_URL}accounts:signInWithPassword`;
    
    const key = 'AIzaSyA7htGVRRgIkcA7UaIURMx-REMThEB_olQ';
    axios.post(`${url}?key=${key}`, authData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
};