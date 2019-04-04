import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';

// Firebase.
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

class Signin extends Component {
  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      console.log('onAuthStateChanged....');
      if (user) {
        console.log('User sign in....');
        firebase
          .auth()
          .currentUser.getIdToken(true)
          .then(accessToken => {
            this.props.signInAction(
              accessToken,
              () => {
                this.props.history.push('/Dashboard');
              },
              () => {
                //if error do sign out.
                firebase
                  .auth()
                  .signOut()
                  .then(response => {
                    this.props.signOutAction(() =>
                      this.props.history.push('/login')
                    );
                  });
              }
            );
          });
      } else {
        console.log('User sign out....');
        this.props.history.push('/Login');
      }
    });
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  onFailure = error => {
    alert(error);
  };

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google , Facebook , Etc as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  render() {
    let content = (
      <div className="row grey lighten-3">
        <div className="col s12 center-align">
          <h5> กรุณาเข้าสู่ระบบ </h5>
        </div>
        <div className="col s12 center-align">
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
        <div className="col s12">
          <img
            src={require('../img/mainPic.jpg')}
            alt="Login pic"
            style={{ width: '100%', margin: '10px 0px 10px 0px' }}
          />
        </div>
      </div>
    );

    return <div>{content}</div>;
  }
}

function mapStateToProps({ auth }) {
  return {
    authenticated: auth.authenticated
  };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(Signin));
