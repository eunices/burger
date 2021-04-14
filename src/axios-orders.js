import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-b1961-default-rtdb.firebaseio.com/',
});

export default instance;