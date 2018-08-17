import React, { Component } from 'react'
import _ from 'lodash';
import { connect } from 'react-redux';

import FormSubInvestor from './FormSubInvestor'
import SubInvestorRow from './SubInvestorRow'


class UserSettingSubInvestors extends Component{

    state = {
        isShowEditForm: false,
        showEditOnRow: 0,
        isShowAddForm: false
    }

    componentDidMount() {
        
    }
    
    toggleAddForm = () => {
        this.setState({
            isShowAddForm: !this.state.isShowAddForm,
            isShowEditForm: false,
        });
    }

    renderHeader() {
        return (
                <div className="row green lighten-1 white-text text-darken-2 valign-wrapper"
                    style={{marginTop: '10px'}}>   
                    <div className="col s1 right-align">
                        <i className="material-icons valign-wrapper">group</i> 
                    </div>  
                    <div className="col s12 left-align"><h6> รายชื่อผู้ลงทุน </h6></div>     
                </div>
        );
    }

    renderRows() {
        const { user } = this.props;
        const { isShowEditForm , showEditOnRow } = this.state
        return _.map(user.userSubInvestors, ({_id,name}, index) => {
            return(
                <SubInvestorRow 
                    key={index} 
                    _id={_id} 
                    name={name} 
                    index={index}
                    isShowEdit={ isShowEditForm && showEditOnRow === index}
                    showEditForm={() => this.setState({
                        isShowAddForm: false,
                        isShowEditForm: true,
                        showEditOnRow: index
                    })}
                    closeEditForm={() => this.setState({
                        isShowEditForm: false,
                        showEditOnRow: index
                    })}
                />
            )
        })
    }

    renderAddSubInvestor() {
        if(this.state.isShowAddForm){
            
            return (
                <li>
                    <FormSubInvestor 
                        mode="New"
                        onCancel={() => this.toggleAddForm()}
                     />
                </li>
            )
        }

        return (
            <li>
                <div className="right-align">
                    <a 
                        className="btn-flat" 
                        onClick={() => this.toggleAddForm()}
                    >เพิ่มรายชื่อผู้ลงทุน</a>
                </div>
            </li>
        )
    }

    render() {
        
        return (
            <div className="flex-container">
                { this.renderHeader() }
                <ul className="collection">
                    { this.renderRows() }   
                    { this.renderAddSubInvestor() }   
                </ul>  
            </div>
        );
                    
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserSettingSubInvestors)