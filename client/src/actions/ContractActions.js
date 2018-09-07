
import axios from 'axios';
import { FETCH_CONTRACT, CONTRACT_ERROR } from './types';
import { change, arrayInsert } from 'redux-form';

/*-----------------------[New Contract Form]-------------------------------*/
export const createContractAction = (values , callback, error) => async dispatch => {
    try {
        //Sign up & Get token from server
      const res = await axios.post('/api/create-contract', values);
      dispatch({ type: FETCH_CONTRACT, payload: res.data });
      callback();
    } catch(err) {
      dispatch({ type: CONTRACT_ERROR, payload: err.response.data.error });
      error();
    }
  };
  
  export const initContractFormAction = (callback) => async dispatch => {
    try {
      const res = await axios.get('/api/initialContractForm');
      dispatch({ type: FETCH_CONTRACT, payload: res.data });
      callback();
    } catch(err) {
      dispatch({ type: CONTRACT_ERROR, payload: err.response.data.error });
    }
  };
  
  export const createContractActionsFormAction = (value, index) => dispatch => {
      dispatch(arrayInsert('contract','contractActions', index, value));
  };
  
  export const updateContractActionsIsCompletedFormAction = (value, index) => dispatch => {
      dispatch(change('contract',`contractActions[${index}].isCompleted`, value));
  };
  
  export const updateContractSubInvestorFormAction = (value, index) => dispatch => {
      dispatch(change('contract',`contractSubInvestors[${index}].value`, value));
  };
  
  export const updateContractLocationAction = (value) => dispatch => {
    dispatch(change('contract',`contractLocation.url`, value));
  };
  
  /*-----------------------[Edit Contract Form]-------------------------------*/
  export const getContractAction = (id, callback) => async dispatch => {
    try { 
      const res = await axios.get(`/api/getContract/${id}`);
      dispatch({ type: FETCH_CONTRACT, payload: res.data });
      callback();
    } catch(err) {
      dispatch({ type: CONTRACT_ERROR, payload: err.response.data.error });
    }
  };
  
  export const updateContractAction = (values , callback, error) => async dispatch => {
    try {
        //Sign up & Get token from server
      const res = await axios.post('/api/update-contract', values);
      dispatch({ type: FETCH_CONTRACT, payload: res.data });
      callback();
    } catch(err) {
      dispatch({ type: CONTRACT_ERROR, payload: err.response.data.error });
      error();
    }
  };
  
  /*-----------------------[Delete Contract Form]-------------------------------*/
  export const deleteContractAction = (id , callback) => async dispatch => {
    try {
      console.log(id)
      const res = await axios.get(`/api/deleteContract/${id}`);
      dispatch({ type: FETCH_CONTRACT, payload: res.data });
      callback();
    } catch(err) {
      dispatch({ type: CONTRACT_ERROR, payload: err.response.data.error });
    }
  };