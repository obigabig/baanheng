
import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, FETCH_USER } from './types';

const setAxiosHeader = () => {
    let xAuthTokenStr = localStorage.getItem('token') ? `${localStorage.getItem('token')}` : '';
    axios.defaults.headers['x-auth-token'] = xAuthTokenStr;
}

export const fbLogInAction = (values, callback) => async dispatch => {
    try {
      
      //Sign up & Get token from server
      const res = await axios.post('/api/auth/facebook', values);
      const token = res.headers['x-auth-token'];

      if (token) {              
        dispatch({ type: AUTH_USER, payload: token });
        localStorage.setItem('token', token);
        setAxiosHeader()
        //dispatch user profile
        const resUser = await axios.get('/api/current-user');
        dispatch({ type: FETCH_USER, payload: resUser.data });
        callback()
      }
      
    } catch(err) {
      console.log(err)
      dispatch({ type: AUTH_ERROR, payload: err });
    }
  };

  export const googleLogInAction = (values, callback) => async dispatch => {
    try {
      
      //Sign up & Get token from server
      const res = await axios.post('/api/auth/google', values);
      const token = res.headers['x-auth-token'];

      if (token) {              
        dispatch({ type: AUTH_USER, payload: token });
        localStorage.setItem('token', token);
        setAxiosHeader()
        //dispatch user profile
        const resUser = await axios.get('/api/current-user');
        dispatch({ type: FETCH_USER, payload: resUser.data });
        callback()
      }
      
    } catch(err) {
      console.log(err)
      dispatch({ type: AUTH_ERROR, payload: err });
    }
  };

  export const signUpAction = (values , callback) => async dispatch => {
    try {
      //Sign up & Get token from server
      const res = await axios.post('/api/signup', values);

      dispatch({ type: AUTH_USER, payload: res.data.token });
      localStorage.setItem('token', res.data.token);
      //Get user profile
      const resUser = await axios.get('/api/current-user', {
        headers: {
          Authorization: res.data.token ? `JWT ${res.data.token}` : ''
        }
      });
      dispatch({ type: FETCH_USER, payload: resUser.data });
      callback();
    } catch(err) {
      dispatch({ type: AUTH_ERROR, payload: err.response.data.error });
    }
  };

  export const signInAction = (values , callback) => async dispatch => {
    try {
      //Sign in & Get token from server
      const res = await axios.post('/api/signin', values);
      dispatch({ type: AUTH_USER, payload: res.data.token });
      localStorage.setItem('token', res.data.token);
      //Get user profile (and add token for request)
      const resUser = await axios.get('/api/current-user', {
        headers: {
          Authorization: res.data.token ? `JWT ${res.data.token}` : ''
        }
      });
      dispatch({ type: FETCH_USER, payload: resUser.data });

      callback();
    } catch(err) {
      if(err.response.status === 401)
      {
        dispatch({ type: AUTH_ERROR, payload: 'Incorrect email or password.' });
      }
      else{
        dispatch({ type: AUTH_ERROR, payload: err.response.data });
      }
    }
  };
  
  export const fetchUserAction = () => async dispatch => {
    try {
      const res = await axios.get('/api/current-user');
      dispatch({ type: FETCH_USER, payload: res.data });
    } catch (e) {
      dispatch({ type: AUTH_USER, payload: false });
    }
  };


  export const signOutAction = (callback) => async dispatch => {
    localStorage.removeItem('token');
    dispatch({ type: AUTH_USER, payload: '' });
    dispatch({ type: FETCH_USER, payload: '' });
    callback();
  };