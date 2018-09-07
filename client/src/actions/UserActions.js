import axios from 'axios';
import { FETCH_USER, FETCH_USER_ERROR } from './types';

/*-----------------------[User Profile]-------------------------------*/
export const createUserSubInvestor = (values , callback, error) => async dispatch => {
    try {
      const res = await axios.post('/api/createUserSubInvestor', values);
      dispatch({ type: FETCH_USER, payload: res.data });
      callback();
    } catch(err) {
      dispatch({ type: FETCH_USER_ERROR, payload: err.response.data });
      error();
    }
  };
  
  export const updateUserSubInvestor = (_id, updatedName, callback, error) => async dispatch => {
    try {
      const res = await axios.get(`/api/updateUserSubInvestor?_id=${_id}&updatedName=${updatedName}`);
      dispatch({ type: FETCH_USER, payload: res.data });    
      callback();
    } catch(err) {
      dispatch({ type: FETCH_USER_ERROR, payload: err.response.data });
      error();
    }
  };