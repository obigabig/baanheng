import * as types from '../../actions/types';

import contractReducer from '../contractReducer';
import getContractMock from '../../mocks/contract';

import contractListReducer from '../contractListReducer';
import getContractListMock from '../../mocks/contractList';

const initailState = {}
describe('contract reducer', () => {
  it('should return the initial state', () => {
    expect(contractReducer(undefined, {})).toEqual({});
  });

  it('should handle FETCH_CONTRACT', () => {
    const successAction = {
      type: types.FETCH_CONTRACT,
      payload: getContractMock, // important to pass correct payload, that's what the tests are for ;)
    };
    expect(contractReducer(initailState, successAction)).toEqual({data: getContractMock});
  });

  it('should handle CONTRACT_ERROR', () => {
    const failAction = {
      type: types.CONTRACT_ERROR,
      payload: { success: false },
    };
    expect(contractReducer(initailState, failAction)).toEqual({ errorMessage: { success: false } });
  });
});

describe('contract list reducer', () => {
    it('should return the initial state', () => {
      expect(contractListReducer(undefined, {})).toEqual({});
    });
  
    it('should handle FETCH_CONTRACTLIST', () => {
      const successAction = {
        type: types.FETCH_CONTRACTLIST,
        payload: getContractListMock, // important to pass correct payload, that's what the tests are for ;)
      };
      expect(contractListReducer(initailState, successAction)).toEqual({data: getContractListMock});
    });

    it('should handle FETCH_CONTRACTLIST_LENGTH', () => {
        const successAction = {
          type: types.FETCH_CONTRACTLIST_LENGTH,
          payload: 30, // important to pass correct payload, that's what the tests are for ;)
        };
        expect(contractListReducer(initailState, successAction)).toEqual({length: 30});
      });

    
    it('should handle CONTRACT_ERROR', () => {
      const failAction = {
        type: types.CONTRACTLIST_ERROR,
        payload: { success: false },
      };
      expect(contractListReducer({}, failAction)).toEqual({ errorMessage: { success: false } });
    });
  });