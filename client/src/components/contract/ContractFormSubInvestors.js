import React, { Component } from 'react';
import { Field  } from 'redux-form';
import NumberInput from '../reduxFormComponent/NumberInput';
import SelectInputAsync from '../reduxFormComponent/SelectInputAsync';

class ContractFormSubInvestors extends Component{
    
    removeList(fields, index){
        setTimeout(() => {
            fields.remove(index);
        },200);
    }
    
    render(){
        const {fields, meta: {error, submitFailed}} = this.props;
        return(
            <div className="flex-container">
                <div className="row green lighten-1 white-text text-darken-2 valign-wrapper"
                    style={{marginTop: '10px'}}>   
                    <div className="col s1 right-align">
                        <i className="material-icons valign-wrapper">group</i> 
                    </div>  
                    <div className="col s8 left-align"><h6> สัดส่วนการลงทุน </h6></div>     
                    <div className="col s3 right-align" style={{paddingRight: '0px'}}>
                        <button className="btn-flat green lighten-2 white-text right-align" type="button" onClick={() => fields.push({})}>
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
                    {fields.map((investor, index) => (
                        <li key={index} className="fieldArrayRow">
                        <div className="row valign-wrapper">
                            <div className="col s1 m1">                             
                                <label style={{float: 'left'}}>#{index + 1}</label>
                            </div>   
                            <div className="col s6 m5">   
                                <Field 
                                    name={`${investor}._userSubInvestor`}
                                    component={SelectInputAsync} 
                                    url='/api/select/user-subInvestors'
                                    />
                            </div>                            
                            <div className="col s3 m4">
                                <Field
                                    name={`${investor}.value`}
                                    component={NumberInput}
                                    thousandSeparate={true}
                                    placeholder="จำนวนเงิน"
                                />
                            </div>      
                            <div className="col s2 m1">
                                <div className="row right">
                                    <button className="waves-effect waves-teal btn-flat btn-flat-inline"
                                        type="button"
                                        title="ลบรายการ"
                                        style={index>0? {display: 'inline'}: {display: 'none'}}
                                        
                                        onClick={() => this.removeList(fields, index)}                                
                                    >
                                        <i className="material-icons valign-wrapper btnDelete">delete</i>
                                    </button>
                                </div>
                            </div> 
                        </div>                        
                        </li>
                    ))}
                </ul>
                
            </div>
  
        );
    }
}

export default ContractFormSubInvestors

