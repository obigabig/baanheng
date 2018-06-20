import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Home from './Home';
import Signup from './authen/signup/Signup';
import Login from './authen/login/Login';
import Dashboard from './dashboard/Dashboard';
import requireAuth from '../utils/requireAuth';

class App extends Component {
  componentDidMount() {
    
  }

  render() {

    return (
      <BrowserRouter>
      <div className="container">
        <Header />  
        <Route exact path="/" component={Home} />     
        <Route exact path="/Dashboard" component={requireAuth(Dashboard)} />   
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />        
      </div>
    </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, actions)(App);
