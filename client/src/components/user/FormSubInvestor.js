import React, { Component } from 'react'
import { reduxForm , Field } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { 
    createUserSubInvestor
} from '../../actions';

import TextInput from '../reduxFormComponent/TextInput'
import SubmitButton from '../reduxFormComponent/SubmitButton'
import Spinner from '../reduxFormComponent/SubmitSpinner'
import Popup from 'react-popup'
import 'react-popup/style.css';

class FormSubInvestors extends Component{
    constructor(){
        super()
        this.state = {
            isLoading: false
        }
    }

    submit = (values) => {
        //SubmissionError
        //throw new SubmissionError({ username: 'User does not exist', _error: 'Login failed!' })
        this.setState({isLoading: true})
        this.props.createUserSubInvestor(values, 
        () => {
            this.setState({isLoading: false});
            this.props.onCancel()
        },
        () => {
            Popup.alert(this.props.user.errorMessage.error, 'พบข้อผิดพลาด');
            this.setState({isLoading: false});
        })
    }

    render () {
        const { handleSubmit } = this.props
        console.log(this.props.user)
        return (
            <form onSubmit={handleSubmit(this.submit)}>
                <div className="col s12">
                    <Field name="name" 
                        component={TextInput} 
                        placeholder="ชื่อผู้ลงทุน" 
                    />
                </div> 
                <div className="col s12"
                        style={{margin:'15px 0px 15px 0px'}}>                        
                        <div className="right-align">      
                            <a className="btn-flat" onClick={() => this.props.onCancel()}>ยกเลิก</a>            
                            <SubmitButton text="บันทึก"/>
                            {this.state.isLoading ? <Spinner /> : ''}   
                        </div>
                </div> 
                <Popup />
            </form>            
        )
    }
}

const validate = values => {
    const errors = {}
    if (!values.name)
        errors.name = 'ต้องระบุ';

    return errors;
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default compose(
    reduxForm({        
        form: 'subInvestor',
        validate
    }),
    connect(mapStateToProps,{createUserSubInvestor})
) (FormSubInvestors);