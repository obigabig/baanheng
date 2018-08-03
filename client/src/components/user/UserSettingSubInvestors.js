import React, { Component } from 'react'
import _ from 'lodash';
import { connect } from 'react-redux';

import FormSubInvestor from './FormSubInvestor'

class UserSettingSubInvestors extends Component{

    state = {
        isShowAddForm: false
    }

    toggleAddForm = () => {
        this.setState({
            isShowAddForm: !this.state.isShowAddForm
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

        return _.map(user.userSubInvestors, ({_id,name}, index) => {
            return(
                <li key={_id} className="collection-item">  
                    <div>
                        {`#${index+1}: ${name}`}
                        <a href="#!" className="secondary-content">
                            <i className="material-icons">edit
                            </i>
                        </a>
                    </div>             
                </li>

            )
        })
    }

    renderAddSubInvestor() {
        if(this.state.isShowAddForm){
            return (
                <li>
                    <FormSubInvestor onCancel={() => this.toggleAddForm()} />
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