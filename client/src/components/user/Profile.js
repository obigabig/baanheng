import React, { Component } from 'react';
import Navbar from '../reactComponent/Navbar';
import UserSetting from './UserSetting';

class Profile extends Component {
    render() {
        return (
            <div className="main-box">
                <div className="row">
                    <Navbar ActiveIndex=""/>
                </div>
                <div className="row">
                    <div className="col s12 m4 l3"></div>
                    <div className="col s12 m8 l9">
                        <UserSetting />
                    </div>
                </div>   
            </div>  
        )
    }
}

export default Profile