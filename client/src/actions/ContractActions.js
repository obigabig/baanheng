import axios from 'axios';
import { FETCH_CONTRACT, CONTRACT_ERROR } from './types';
import { change, arrayInsert } from 'redux-form';
import handlingError from '../utils/handlingError';
/*-----------------------[New Contract Form]-------------------------------*/
export const createContractAction = (
  values,
  callback,
  error
) => async dispatch => {
  try {
    //Sign up & Get token from server
    const res = await axios.post('/api/create-contract', values);
    dispatch({ type: FETCH_CONTRACT, payload: res.data });
    callback();
  } catch (err) {
    handlingError(err, dispatch)
    dispatch({ type: CONTRACT_ERROR, payload: err });
    error();
  }
};

export const initContractFormAction = callback => async dispatch => {
  try {
    const res = await axios.get('/api/initialContractForm');
    dispatch({ type: FETCH_CONTRACT, payload: res.data });
    callback();
  } catch (err) {
    handlingError(err, dispatch)
    dispatch({ type: CONTRACT_ERROR, payload: err });
  }
};

export const createContractActionsFormAction = (value, index) => dispatch => {
  dispatch(arrayInsert('contract', 'contractActions', index, value));
};

export const updateContractActionsFormAction = value => dispatch => {
  dispatch(change('contract', 'contractActions', value));
};

export const updateOneContractActionsAction = (value, index) => dispatch => {
  dispatch(change('contract', `contractActions[${index}]`, value));
};

export const updateContractActionsIsCompletedFormAction = (
  value,
  index
) => dispatch => {
  dispatch(change('contract', `contractActions[${index}].isCompleted`, value));
};

export const updateContractSubInvestorFormAction = (
  value,
  index
) => dispatch => {
  /*const floatValue = value.replace(/[,]/g, function(m) {
    // m is the match found in the string
    // If `,` is matched return `.`, if `.` matched return `,`
    return m === ',' ? '' : '';
  });*/
  dispatch(change('contract', `contractSubInvestors[${index}].value`, value));
};

export const updateContractLocationAction = value => dispatch => {
  dispatch(change('contract', `contractLocation.url`, value));
};

export const clearErrorMessageAction = () => dispatch => {
  dispatch({ type: CONTRACT_ERROR, payload: undefined });
};

/*-----------------------[Edit Contract Form]-------------------------------*/
export const getContractAction = (id, callback) => async dispatch => {
  try {
    const res = await axios.get(`/api/getContract/${id}`);
    dispatch({ type: FETCH_CONTRACT, payload: res.data });
    callback();
  } catch (err) {
    handlingError(err, dispatch)
    dispatch({ type: CONTRACT_ERROR, payload: err });
  }
};

export const updateContractAction = (
  values,
  callback,
  error
) => async dispatch => {
  try { 
    //Sign up & Get token from server
    const res = await axios.post('/api/update-contract', values);
    dispatch({ type: FETCH_CONTRACT, payload: res.data });
    callback();
  } catch (err) {
    handlingError(err, dispatch)
    dispatch({ type: CONTRACT_ERROR, payload: err });
    error();
  }
};

/*-----------------------[Delete Contract Form]-------------------------------*/
export const deleteContractAction = (id, callback) => async dispatch => {
  try {
    const res = await axios.get(`/api/deleteContract/${id}`);
    dispatch({ type: FETCH_CONTRACT, payload: res.data });
    callback();
  } catch (err) {
    handlingError(err, dispatch)
    dispatch({ type: CONTRACT_ERROR, payload: err });
  }
};
