import React from 'react';
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_FIREBASE,
});

export default instance;