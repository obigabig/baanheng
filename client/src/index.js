import 'materialize-css/dist/css/materialize.min.css';

import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import HttpsRedirect from 'react-https-redirect';

import App from './components/App';

/*import axios from 'axios';
window.axios = axios;*/

//Create store and set JWT to reducer
const middleware = [reduxThunk];
const store = createStore(
    reducers,   
    {
        auth: { authenticated: localStorage.getItem('token') }
    }, 
    applyMiddleware(...middleware)
);

ReactDom.render(
    <Provider store={store}> 
        <HttpsRedirect>
            <App/>
        </HttpsRedirect>        
    </Provider>
    , document.querySelector('#root')
);