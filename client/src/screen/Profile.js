import React, { Component } from 'react';
import { connect } from 'react-redux';
import { menuClicked } from '../actions';
import UserSetting from '../components/user/UserSetting';

class Profile extends Component {
    componentDidMount(){
        this.props.menuClicked('')
    }

    render() {
        return (
            <div className="main-box">
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

export default connect(null, { menuClicked })(Profile)