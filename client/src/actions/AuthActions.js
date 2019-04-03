import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, FETCH_USER, FETCH_USER_ERROR } from './types';


const setAxiosHeader = () => {
  let authTokenStr = localStorage.getItem('token')
    ? `${localStorage.getItem('token')}`
    : '';
  axios.defaults.headers.common['Authorization'] = `Bearer ${authTokenStr}`;
};

export const signInAction = (token, callback) => async dispatch => {
  try {
    console.log('\nsignInAction called\n');
    //Save token to localStorage.
    localStorage.setItem('token', token);
    //Save Token to Axios Header
    setAxiosHeader();
    //dispatch AUTH_USER
    dispatch({ type: AUTH_USER, payload: token });

    //Get user profile
    const resUser = await axios.get('/api/current-user');
    dispatch({ type: FETCH_USER, payload: resUser.data });

    callback();
  } catch (err) {
    console.log(err);
    dispatch({ type: AUTH_ERROR, payload: err });
  }
};

export const fetchUserAction = () => async dispatch => {
  try {
    setAxiosHeader();

    const res = await axios.get('/api/current-user');
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (e) {
    console.log(e);
    dispatch({ type: FETCH_USER_ERROR, payload: e });
  }
};

export const signOutAction = callback => dispatch => {
  try {
    localStorage.removeItem('token');
    dispatch({ type: AUTH_USER, payload: false });
    dispatch({ type: FETCH_USER, payload: '' });
    callback();
  } catch (err) {
    console.log(err);
    dispatch({ type: AUTH_ERROR, payload: err });
  }
};

export const signUpAction = callback => async dispatch => {
  callback();
};
