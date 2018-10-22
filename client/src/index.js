import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDom from 'react-dom';
import HttpsRedirect from 'react-https-redirect';
import Root from './Root';
import App from './components/App';

ReactDom.render(
    <Root initialState={    
        { auth: { authenticated: localStorage.getItem('token') }}
    }> 
        <HttpsRedirect>
            <App/>
        </HttpsRedirect>        
    </Root>
    , document.querySelector('#root')
);