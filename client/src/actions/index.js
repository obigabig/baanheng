import axios from 'axios';

let xAuthTokenStr = localStorage.getItem('token') ? `${localStorage.getItem('token')}` : '';
axios.defaults.headers['x-auth-token'] = xAuthTokenStr;

export * from './AuthActions';
export * from './ContractActions';
export * from './ContractListActions';
export * from './DueContractListActions';
export * from './UserActions';
export * from './Menu';















