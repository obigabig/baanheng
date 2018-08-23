import { AUTH_USER, AUTH_ERROR, FETCH_USER, FETCH_USER_ERROR } from './types';
import { FETCH_CONTRACT, CONTRACT_ERROR } from './types';
import { FETCH_CONTRACTLIST, FETCH_CONTRACTLIST_LENGTH, CONTRACTLIST_ERROR } from './types';
import { FETCH_DUE_CONTRACTLIST, DUE_CONTRACTLIST_ERROR } from './types';
import { FETCH_INVESTOR_RATIO, FETCH_INVESTOR_RATIO_ERROR } from './types';

import { change, arrayInsert } from 'redux-form';
import axios from 'axios';


const setAxiosHeader = () => {
  let xAuthTokenStr = localStorage.getItem('token') ? `${localStorage.getItem('token')}` : '';
  axios.defaults.headers['x-auth-token'] = xAuthTokenStr;
}

let xAuthTokenStr = localStorage.getItem('token') ? `${localStorage.getItem('token')}` : '';
axios.defaults.headers['x-auth-token'] = xAuthTokenStr;

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
/*-----------------------[Contract List]-------------------------------*/
export const getContractListsAction = (
  skip, limit, sort, no, title, status, pact, propType, value, callback
) => async dispatch => {
  try { 
    const contractList = await axios.get(
      `/api/ContractLists?sort=${sort.field}&sortType=${sort.type}` + 
      `&no=${no}` +
      `&title=${title}` +
      `&status=${status}` +
      `&pact=${pact}` +
      `&propType=${propType}` +
      `&value=${value}` +
      `&skip=${skip}&limit=${limit}`
    )
    const contractListLength = await axios.get(`/api/getContractListsLength?` + 
      `&no=${no}` +
      `&title=${title}` +
      `&status=${status}` +     
      `&pact=${pact}` +
      `&propType=${propType}` +
      `&value=${value}`
    )
    dispatch({ type: FETCH_CONTRACTLIST, payload: contractList.data });
    dispatch({ type: FETCH_CONTRACTLIST_LENGTH, payload: contractListLength.data });
    callback();
  } catch(err) {
    console.log(err)
    dispatch({ type: CONTRACTLIST_ERROR, payload: err.response.data.error });
  }
};

/*-----------------------[Dashboard:Due Contract List]-------------------------------*/
export const getDueContractListsAction = (callback) => async dispatch => {
  try {
    const contractList = await axios.get(`/api/getDueContractLists`);

    dispatch({ type: FETCH_DUE_CONTRACTLIST, payload: contractList.data });
    callback();
  } catch(err) {
    dispatch({ type: DUE_CONTRACTLIST_ERROR, payload: err.response.data.error });
  }
};

export const markActionAsComplete = (contractId, actionId) => async dispatch => {
  try {
    const contractList = await axios.get(`/api/markActionAsComplete?contractId=${contractId}&actionId=${actionId}`);
    dispatch({ type: FETCH_DUE_CONTRACTLIST, payload: contractList.data });
  } catch(err) {
    dispatch({ type: DUE_CONTRACTLIST_ERROR, payload: err.response.data.error });
  }
  
}

/*-----------------------[Report]-------------------------------*/
export const getinvestorRatioAction = () => async dispatch => {
  try {
    const investorRatio = await axios.get(`/api/getInvestorRatio`);
    dispatch({ type: FETCH_INVESTOR_RATIO, payload: investorRatio.data });
  } catch(err) {
    dispatch({ type:FETCH_INVESTOR_RATIO_ERROR, payload: err.response.data.error });
  }
};

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










