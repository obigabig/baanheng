import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import { withRouter } from 'react-router-dom';
import './Header.css';


class Header extends Component {
    componentDidMount(){
        if(this.props.authenticated)
        {
            this.props.fetchUserAction();            
        }
    }

    renderSignup() {  
        if(this.props.user.isAdmin)
        {
            return (
                <Link to="/signup" className="btn-flat white-text">       
                    สมัครสมาชิก
                </Link>
            );
        }
    }

    renderLogin() {       
        switch(this.props.authenticated){
            case false:
            case null:
                return (
                    <div>                        
                        <Link to="/login" className="red btn-flat white-text">   
                            <i className="material-icons left">account_circle</i>         
                            เข้าสู่ระบบ
                        </Link>
                    </div>
                );
            default:
                return (
                    <div>
                        <ul className="white-space:nowrap;">
                            <li key="1">
                                <div>
                                    Welcome
                                    { this.props.user.isAdmin ? ' Admin' : '' }    
                                </div>   
                            </li>
                            <li key="2">
                                { this.renderSignup() }
                                <Link to="/" className="blue btn-flat white-text">   
                                    <i className="material-icons left">account_circle</i>         
                                    {this.props.user.name}
                                </Link>
                            </li>
                            <li key="3">
                                <a href="" className="white-text text-darken-2" onClick={actions.signOutAction(this.props.history)}>
                                    ออกจากระบบ
                                </a>
                            </li>
                        </ul>
                    </div>
                );
        }
          
    }

    render() {
        
        return (
            <div className="">
                <div className="row card-panel teal lighten-2 ">
                    <div className="col s5 left-align white-text text-darken-5"> BaanHengHeng ๙๙ </div>
                    <div className="col s7 right-align white-text text-darken-2">                        
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
