import React from 'react';
import { Field, getFormValues } from 'redux-form';
import TextInput from '../reduxFormComponent/TextInput';
import { connect } from 'react-redux';

const removeList = (fields, index) => {
    setTimeout(() => {
        fields.remove(index);
    },200);
}

const renderEmptyRow = (fields) => {
    return (
        <div className="row center-align">
            ยังไม่มีข้อมูลติดต่อ
        </div>
    )
}

const renderRow = (fields, debtor, index, contractForm) => {
    return (<li key={index} className="fieldArrayRow">
                <div className="row valign-wrapper">
                    <div className="col s1 m1">                             
                        <label style={{float: 'left'}}>#{index + 1}</label>
                    </div>   
                    <div className="col s4 m4">   
                        <Field
                            name={`${debtor}.name`}
                            component={TextInput}
                            placeholder="ชื่อ"
                        />
                    </div>                            
                    <div className="col s4 m4">
                         <Field 
                                type="number" 
                                name={`${debtor}.tel`}
                                component={TextInput} 
                                placeholder="เบอร์ติดต่อ"                                                
                            />
                    </div>   
                    <div className="col s3 m2">                                
                        <div className="row right valign-wrapper">
                            <div className="left">
                                <a title="โทร" 
                                    href={`tel:${contractForm.contractDebtor[index].tel}`}
                                > 
                                    <i className="material-icons valign-wrapper btnApprove">local_phone</i>
                                </a>
                            </div>
                            <div className="left">
                                <button className="waves-effect waves-teal btn-flat btn-flat-inline"
                                    type="button"
                                    title="ลบรายการ"
                                    onClick={() => removeList(fields, index)}                                
                                >
                                    <i className="material-icons valign-wrapper btnDelete">delete</i>
                                </button>
                            </div>
                        </div>
                    </div>                             
                </div>                        
            </li>
    )
}

const ContractFormDebtor = ({fields, contractForm, meta: {error, submitFailed}}) => {
    return (

        <div className="flex-container">
            <div className="row orange darken-2 white-text text-darken-2 valign-wrapper"
                style={{marginTop: '10px'}}>   
                <div className="col s1 right-align">
                    <i className="material-icons valign-wrapper">contact_phone</i> 
                </div>  
                <div className="col s8 left-align"><h6> ติดต่อ </h6></div>     
                <div className="col s3 right-align" style={{paddingRight: '0px'}}>
                    <button className="btn-flat orange darken-1 white-text right-align" 
                            type="button" 
                            onClick={() => fields.push({})}>
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
                        fields.map((debtor,index) => renderRow(fields, debtor, index, contractForm)) 
                        : renderEmptyRow(fields)
                }
                </ul>
        </div>
    );
}

const mapStateToProps = (state) => {
    return { 
        contractForm: getFormValues('contract')(state)
    };
}

export default connect(mapStateToProps)(ContractFormDebtor);