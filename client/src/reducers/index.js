import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import userReducer from './userReducer';
import contractReducer from './contractReducer';
import contractListReducer from './contractListReducer';
import dueContractListReducer from './dueContractListReducer';
import reportReducer from './reportReducer';

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  contracts: contractReducer,
  contractsList: contractListReducer,
  dueContractList: dueContractListReducer,
  report: reportReducer,
  form: reduxForm
});

