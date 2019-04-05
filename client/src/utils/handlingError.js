// Firebase.
import firebase from 'firebase/app';
import 'firebase/auth';
import { AUTH_USER, AUTH_ERROR, FETCH_USER, FETCH_USER_ERROR } from '../actions/types';

export default (error, dispatch) => {
  if (error.response && error.response.status == '403') {
    //Unauthorized
    console.log(error.response.data);
    console.log(error.response.status);
    firebase
      .auth()
      .signOut()
      .then(res => {
        localStorage.removeItem('token');
        dispatch({ type: AUTH_USER, payload: false });
        dispatch({ type: FETCH_USER, payload: '' });
      });
  } else if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log('Error', error.message);
  }
  return;
};

/*if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log('Error', error.message);
  }
  console.log(JSON.stringify(error));*/
