import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import UserSettingSubInvestors from './UserSettingSubInvestors'

class UserSetting extends Component {

    renderUserInfo() {
        const { user } = this.props
        console.log(user)
        return (
            <div>
                <div className="blue lighten-2 white-text text-darken-2 valign-wrapper"
                    style={{marginTop: '10px'}}>   
                    <div className="col s1 right ">
                        <i className="Medium material-icons valign-wrapper">info</i> 
                    </div>                               
                    <div className="col s11"><h5> ข้อมูลผู้ใช้ </h5></div>                     
                </div> 
                <ul className="collection">
                    <li className="collection-item">{`ชื่อ: ${user.name}`}</li>
                    <li className="collection-item">{`email: ${user.email}`}</li>
                    <li className="collection-item">{`สถานะ: ${user.isAdmin? 'ผู้ดูแลระบบ' : 'ผู้ใช้งาน'}`}</li>
                </ul>
            </div> 
        )
    }

    render() {
        return (
            <div> 
                { this.renderUserInfo() }
                <UserSettingSubInvestors />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default compose(
    connect(mapStateToProps)
)(UserSetting)