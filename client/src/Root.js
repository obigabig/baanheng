import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';
import reduxThunk from 'redux-thunk';
//import logger from 'redux-logger';

export default ({ children, initialState = {} }) => {

  //Create store and set JWT to reducer
  //const middleware = [reduxThunk, logger];
  const middleware = [reduxThunk];
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(...middleware)
  );

  return <Provider store={store}>{children}</Provider>;
};


