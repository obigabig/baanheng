import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import { withRouter } from 'react-router-dom';


class Header extends Component {

    componentDidMount(){
        if(this.props.authenticated)     
        {   
            this.props.fetchUserAction()
        }
    }

    renderLogin() {       
        switch(this.props.authenticated){
            case false:
            case null:
                return (
                    <div>                        
                        <Link to="/login" className="light-blue darken-4 btn-flat white-text">   
                            <i className="material-icons left">account_circle</i>         
                            เข้าสู่ระบบ
                        </Link>
                    </div>
                );
            default:
                return (
                <div style={{ padding: '10px'}}>
                    <div className="row">
                        <Link to="/Profile" className="white-text right valign-wrapper">   
                            <i className="material-icons">account_circle</i>         
                            {`${this.props.user.email? this.props.user.email : ''}`}
                            { this.props.user.isAdmin ? ' (Admin)' : '' }
                        </Link>
                    </div>                    
                    <div className="row">
                    <a href="" 
                        className="white-text text-darken-2 logOut"                         
                        onClick={actions.signOutAction(this.props.history)}>
                        ออกจากระบบ
                    </a>
                    </div>
                </div>
                
            );
        }
          
    }

    render() {
        return (
            <div>
                <div className="row teal lighten-2 valign-wrapper">
                    <div 
                        className="col s12 m5"
                        style={{ padding: '10px'}}
                    > 
                        <Link to="/" className=" white-text text-darken-5" > 
                            <div className="left">
                                <img src={require("../img/favicon.png")}   
                                    width="79px"
                                    height="79px"
                                    alt="favicon" />  
                            </div>       
                        </Link>                        
                    </div>
                    <div className="col s12 m7 right-align white-text text-darken-2">                        
                        { this.renderLogin() }                        
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ user, auth }) {
    return { 
                user,
                authenticated: auth.authenticated 
            };
}

export default connect(mapStateToProps, actions) (withRouter(Header));
