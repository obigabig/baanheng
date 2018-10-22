import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Home from './Home';
import Signup from './authen/signup/Signup';
import Login from './authen/login/Login';

import Dashboard from './dashboard/Dashboard';
import Contract from './contract/Contract';
import ContractLists from './contractList/ContractLists';

import Profile from './user/Profile';
import Reports from './report/Reports';
import Page404 from './Page404';

import '../css/main.css';
import Footer from './Footer';

import { StickyContainer } from 'react-sticky';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />

              <Route exact path="/Dashboard" component={Dashboard} />
              <Route path="/Contract/:id?" component={Contract} />
              <Route exact path="/ContractLists" component={ContractLists} />

              <Route exact path="/Profile" component={Profile} />

              <Route exact path="/Reports" component={Reports} />

              <Route exact path="/404" component={Page404} />
              <Redirect to="/404" />
            </Switch>
            <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(
  mapStateToProps,
  actions
)(App);
