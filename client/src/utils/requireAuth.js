import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
// Firebase.
import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';

export default ChildComponent => {
  class ComposedComponent extends Component {
    // Our component just got rendered
    componentDidMount() {
      this.shouldNavigateAway();
    }

    // Our component just got updated
    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    setAxiosHeader = () => {
      let authTokenStr = localStorage.getItem('token')
        ? `${localStorage.getItem('token')}`
        : '';
      axios.defaults.headers.common['Authorization'] = `Bearer ${authTokenStr}`;
    };

    checkLoginStatus = async () => {
      try {
        let user = await firebase.auth().currentUser;
        //console.log('Require Auth:[checkLoginStatus]');
        if (user) {
          //Update token
          let token = await user.getIdToken(/*Refresh token*/ true);
          this.props.updateAuthTokenAction(token);
          //console.log(token);
        } else {
          //console.log(' Not found firebase.auth().currentUser.');
        }
      } catch (err) {
        console.log(err);
      }
    };

    shouldNavigateAway() {
      //Check & Update auth token
      this.checkLoginStatus();
      //Set Authorization Token to axios req header
      this.setAxiosHeader();

      //If not auth return to login.
      if (!this.props.auth) {
        this.props.history.push('/login');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { auth: state.auth.authenticated };
  }

  return connect(
    mapStateToProps,
    actions
  )(ComposedComponent);
};
