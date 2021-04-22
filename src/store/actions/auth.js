import * as actions from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actions.AUTH_START,
  };
};

export const authSuccess = (token) => {
  return {
    type: actions.AUTH_SUCCESS,
    idToken: token,
  };
};

export const authFail = (error) => {
  return {
    type: actions.AUTH_FAIL,
    error: error,
  };
};

export const authLogout = () => {
  localStorage.removeItem('idToken');
  localStorage.removeItem('expirationDate');

  return {
    type: actions.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
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
        
        const { idToken, expiresIn } = response.data;
        
        localStorage.setItem('idToken', idToken);
        const expirationDate = 
          new Date(new Date().getTime() + expiresIn * 1000);       
        localStorage.setItem('expirationDate', expirationDate);
        
        dispatch(authSuccess(idToken));
        dispatch(checkAuthTimeout(expiresIn));
      })
      .catch(error => {
        // console.log('[error]', error.response.data.error.message);
        dispatch(authFail(error));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('idToken');
    if (!token) {
      dispatch(authLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate < new Date()) {
        dispatch(authLogout());
      } else {
        dispatch(authSuccess(token));
        
        const expirationTime = 
          expirationDate.getSeconds() - new Date().getSeconds();
        dispatch(checkAuthTimeout(expirationTime));
      }
    }
  };
};