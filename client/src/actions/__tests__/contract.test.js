import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
//import * as actions from './getPosts';
import * as actions from '../../actions';
import { FETCH_CONTRACT } from '../types';
import getContractMock from '../../mocks/contract';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const callback = () => {};

describe('ContractActions', () => {
  beforeEach(function() {
    moxios.install();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: getContractMock
      });
    });
  });

  afterEach(function() {
    moxios.uninstall();
  });

  /*---- moxios.requests.at(0) //กรณีมีหลาย Request*/

  /*// Match against an exact URL value(ใช้แทน Url ที่เรียก)
    moxios.stubRequest('/say/hello', {
        status: 200,
        responseText: 'hello'
    })*/

  it('create Contract Action successfuly', () => {
    const expectedActions = [
      { type: FETCH_CONTRACT, payload: getContractMock }
    ];
    const store = mockStore({ payload: {} });
    return store.dispatch(actions.createContractAction(getContractMock, callback, callback)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
      //.toContainEqual
    });
  });

  it('init Contract Form Action', () => {
    const expectedActions = [
      { type: FETCH_CONTRACT, payload: getContractMock }
    ];
    const store = mockStore({ payload: {} });
    return store.dispatch(actions.initContractFormAction(callback)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('get Contract Action successfuly', () => {
    const expectedActions = [
      { type: FETCH_CONTRACT, payload: getContractMock }
    ];
    const store = mockStore({ payload: {} });
    return store.dispatch(actions.getContractAction(1, callback)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('update Contract Action successfuly', () => {
    const expectedActions = [
      { type: FETCH_CONTRACT, payload: getContractMock }
    ];
    const store = mockStore({ payload: {} });
    return store.dispatch(actions.updateContractAction(1, callback, callback)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('delete Contract Action successfuly', () => {
    const expectedActions = [
      { type: FETCH_CONTRACT, payload: getContractMock }
    ];
    const store = mockStore({ payload: {} });
    return store.dispatch(actions.deleteContractAction(1, callback)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
