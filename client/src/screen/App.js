import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from '../components/Header';
import HomeScreen from './HomeScreen';
import SignIn from './SignIn';

import DashboardScreen from './DashboardScreen';
import Contract from './Contract';
import ContractLists from './ContractLists';

import Profile from './Profile';
import Reports from './Reports';
import Page404 from './Page404';

import '../css/main.css';
import Footer from '../components/Footer';

// Firebase.
import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from '../const';
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="container">
            <Header />
            <Switch>
              <Route exact path="/" component={HomeScreen} />
              <Route exact path="/login" component={SignIn} />

              <Route exact path="/Dashboard" component={DashboardScreen} />
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
