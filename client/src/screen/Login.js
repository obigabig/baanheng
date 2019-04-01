import React , { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';
//import { facebookClientId } from '../../../const'
import { googleClientId } from '../const'

//import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

class Login extends Component {

    constructor() {
        super();
        this.googleResponse = this.googleResponse.bind(this)
    }

    componentDidMount(){
        if(this.props.authenticated){
            this.props.history.push('/Dashboard')
        }
    }
    /*facebookResponse = (response) => {
        const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
        this.props.fbLogInAction(tokenBlob, () => {this.props.history.push('/Dashboard')})
    }*/
    
    googleResponse = (response) => {
        const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
        this.props.googleLogInAction(tokenBlob, () => {this.props.history.push('/Dashboard')})
    };

    onFailure = (error) => {
      alert(error);
    }

    render (){
        let content = 
            (
                <div className="row grey lighten-3">
                    
                    <div className="col s12 center-align">
                        <h5> เข้าสู่ระบบด้วยบัญชี Google </h5>
                    </div>
                    <div className="col s12 center-align">
                        <GoogleLogin
                            clientId={googleClientId}
                            buttonText="Login with google"
                            onSuccess={this.googleResponse}
                            onFailure={this.onFailure}
                            className="google-login-btn"
                        />
                    </div>
                    <div className="col s12"> 
                        <img src={require('../img/mainPic.jpg')} 
                            alt="Login pic"
                            style={{width: '100%',
                            margin: '10px 0px 10px 0px'}} />
                    </div> 
                </div>   
            );

        return (
            <div>
                {content}
            </div>            
        );
    }
}

function mapStateToProps({ auth }) {
    return { 
                authenticated: auth.authenticated 
            };
}

export default connect(mapStateToProps, actions)(withRouter(Login));

//------------------[FB Log in]------------------------//
/*
                    <div className="col s12 center-align">
                        <FacebookLogin
                            appId={facebookClientId}
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={this.facebookResponse} 
                            cssClass="fb-login-btn"
                        />
                    </div>*/