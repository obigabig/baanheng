import axios from 'axios';
import { FETCH_CONTRACTLIST, FETCH_CONTRACTLIST_LENGTH, CONTRACTLIST_ERROR } from './types';
import handlingError from '../utils/handlingError';

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
      handlingError(err, dispatch)
      dispatch({ type: CONTRACTLIST_ERROR, payload: err });
    }
  };
  
  