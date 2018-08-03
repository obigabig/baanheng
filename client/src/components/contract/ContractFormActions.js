import React, { Component } from 'react';
import { Field, getFormValues } from 'redux-form';
import _ from 'lodash';
import moment from 'moment';
import AddActionsPopup from './AddActionsPopup';

import { connect } from 'react-redux';
import { createContractActionsFormAction,
        updateContractActionsIsCompletedFormAction } from '../../actions';

import '../../css/main.css';

const renderField = ({input, type}) => (
    <div style={{float:'left'}}>
        <input {...input} type={type} className="grid-input-readonly" disabled="true" />
    </div>
)
const renderHiddenField = ({input, type}) => (
    <div style={{float:'left'}}>
        <input {...input} type={type} className="hide" disabled="true" />
    </div>
)

const renderActionPeriodField = ({input, type}) => (
    <div style={{float:'left'}}>
        <div className="row left valign-wrapper">
            <div className="left">
                <input {...input} type={type} className="right-align grid-input-readonly" disabled="true" />
            </div>
            <div className="left"
                 style={{height:'25px'}}>
                &nbsp;ด.
            </div>
       </div>
    </div>
)

class ContractFormActions extends Component{
    state = {
        showActionsPopup: false
    };

    componentDidUpdate(prevProps) {

    }

    togglePopup = () => {
        this.setState({
            showActionsPopup: !this.state.showActionsPopup
        });
    }

    removeList(fields, index){
        setTimeout(() => {
            fields.remove(index);
        },200);
    }

    toggleIsCompleted( index){
        setTimeout(() => {
            this.props.updateContractActionsIsCompletedFormAction(
                !this.props.contractForm.contractActions[index].isCompleted,
                index
            );
        },200);
    }

    addDataToLists(type, description, period, dueDate){
        //Find insert index
        let insertIndex = 0;
        if(this.props.contractForm.contractActions)
        {   
            _.each(this.props.contractForm.contractActions, (values, index) =>{              
                if(moment(dueDate, "DD/MM/YYYY").isBefore(moment(values.dueDate, "DD/MM/YYYY"))){                        
                    insertIndex = index;
                    return false;
                }                     
                insertIndex = index + 1;
            });
        }
        //Insert data to sepecific index
        this.props.createContractActionsFormAction({
            type: type,
            description: description,
            period: parseInt(period, 10),            
            isCompleted: false,
            dueDate: dueDate
        }, insertIndex);
    }
    
    renderPopup(fields){
        if(this.state.showActionsPopup)
        {
            return( 
                <AddActionsPopup
                    closePopup={this.togglePopup.bind(this)}
                    addActionToForm={(type, description, period, dueDate) => {
                        //Close popup
                        this.togglePopup();
                        //Insert data to list
                        this.addDataToLists(type, description, period, dueDate);
                    }}
                />
            );
        }

        return ''
    }

    renderEmptyRow(){
        return (
            <div className="row center-align">
                ยังไม่มีรายการแจ้งเตือน 
                <button className="btn-flat blue-text" type="button" onClick={this.togglePopup}>
                    คลิ๊ก
                </button>
                เพื่อเพิ่ม
            </div>
        )
    }

    renderRow(fields, action, index){
        
            const bgColor = this.props.contractForm.contractActions[index].isCompleted ?
            'light-green lighten-5'  : '';

            const isCompletedIcon = () => {
                if(this.props.contractForm.contractActions[index].isCompleted)
                    return (<i className="material-icons valign-wrapper grey-text">cancel</i>) 

                return (<i className="material-icons valign-wrapper btnApprove">check_circle</i>)  
            };

            return (
                <li key={index} className='fieldArrayRow'>
                <div className={`row valign-wrapper ${bgColor}`}>
                    <div className="col s1 m1">                             
                        <label style={{float: 'left'}}>#{index + 1}</label>
                        <Field
                            name={`${action}.isCompleted`}
                            type="text"
                            component={renderHiddenField}                                    
                            label="วันที่"
                        />
                    </div>   
                    <div className="col s3 m3">   
                        <Field
                        name={`${action}.description`}
                        type="text"
                        component={renderField}
                        label="description"
                    />
                    </div>                          
                    <div className="col s1 m2">
                        <Field
                            className="right-align"
                            name={`${action}.period`}
                            type="text"
                            component={renderActionPeriodField}
                            label="ระยะเวลา"                          
                        />
                    </div>                                          
                    <div className="col s4 m3">
                        <Field
                            name={`${action}.dueDate`}
                            type="text"
                            component={renderField}
                            label="วันที่"
                        />
                    </div>                                              
                    <div className="col s3 m2">
                        <div className="row right">
                            <div className="left"> 
                                <button className="btn-flat btn-flat-inline"
                                    name="btnComplete"
                                    type="button"
                                    title="ทำเครื่องหมายว่าเสร็จแล้ว"
                                    onClick={() => this.toggleIsCompleted(index)}                                
                                >
                                    {isCompletedIcon()}
                                </button>
                            </div>
                            <div className="left"> 
                                <button className="waves-effect waves-teal btn-flat btn-flat-inline"
                                    name="btnDelete"
                                    type="button"
                                    title="ลบรายการ"
                                    onClick={() => this.removeList(fields, index)}                                
                                >
                                    <i className="material-icons valign-wrapper btnDelete">delete</i>
                                </button>
                            </div>
                        </div>
                    </div>  
                </div>                        
            </li>
    )}
        
    render(){
        const {fields, meta: {error, submitFailed}} = this.props;
        
        return(
            <div className="flex-container">
                <div className="row red lighten-1 white-text text-darken-2 valign-wrapper"
                    style={{marginTop: '10px'}}>   
                    <div className="col s1 right-align">
                        <i className="material-icons valign-wrapper">alarm_on</i> 
                    </div>  
                    <div className="col s8 left-align"><h6> การแจ้งเตือน </h6></div>     
                    <div className="col s3 right-align" style={{paddingRight: '0px'}}>
                        <button className="btn-flat red lighten-2 white-text right-align" type="button" onClick={this.togglePopup}>
                            <i className="material-icons right">add</i>
                            เพิ่ม
                        </button>
                    </div> 
                </div> 
                <ul>
                    <li key="0" >
                        <div className="row">
                            <div className="col s12">  
                                    {submitFailed && error && <span>{error}</span>}
                            </div>
                        </div>
                    </li>
                    {
                        fields.length > 0 ?
                        fields.map((action,index) => this.renderRow(fields, action, index)) 
                        : this.renderEmptyRow()
                    }
                    
                </ul>                
                {this.renderPopup(fields)}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        contractForm: getFormValues('contract')(state)
    };
}

export default connect(
                        mapStateToProps, 
                        {createContractActionsFormAction,
                            updateContractActionsIsCompletedFormAction}
                    )(ContractFormActions);

