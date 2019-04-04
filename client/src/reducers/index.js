import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import userReducer from './userReducer';
import contractReducer from './contractReducer';
import contractListReducer from './contractListReducer';
import dueContractListReducer from './dueContractListReducer';
import reportReducer from './reportReducer';
import migrateReducer from './migrateReducer';
import menuReducer from './menuReducer';

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  contracts: contractReducer,
  contractsList: contractListReducer,
  dueContractList: dueContractListReducer,
  report: reportReducer,
  migrate: migrateReducer,
  menu: menuReducer,
  form: reduxForm
});

