import React, { Component } from 'react'
import { reduxForm , Field } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { 
    createUserSubInvestor,
    updateUserSubInvestor
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

        this.submit = this.submit.bind(this)
    }

    componentDidMount(){
        const { mode, name } = this.props

        if( mode === 'Edit'){
            this.props.initialize({ 
                name
            })
        }
    }

    submit = (values) => {
        const { mode, _id, name } = this.props
        const { createUserSubInvestor, updateUserSubInvestor } = this.props //Action

        if(mode === 'New'){
            this.setState({isLoading: true}, () => {
                createUserSubInvestor(values, 
                () => {
                    this.setState({isLoading: false}, ()=>{
                        this.props.onCancel()
                    })                    
                },
                () => {
                    this.setState({isLoading: false}, ()=>{
                        Popup.alert(this.props.user.errorMessage.error, 'พบข้อผิดพลาด')
                    })    
                })
            })
        }
        else if(mode === 'Edit' && values.name !== name ){
            this.setState({isLoading: true}, () => {
                updateUserSubInvestor(_id, values.name,
                () => {
                    this.setState({isLoading: false}, ()=>{
                        this.props.onCancel()
                    })     
                },
                () => {
                    this.setState({isLoading: false}, ()=>{
                        Popup.alert(this.props.user.errorMessage.error, 'พบข้อผิดพลาด')
                    })  
                })
            })
        }
        else{
            this.setState({isLoading: false}, ()=>{
                this.props.onCancel()
            })
        }
    }

    render () {
        const { handleSubmit } = this.props
        const { mode } = this.props
        return (
            <form onSubmit={handleSubmit(this.submit)}>
                <div className="col s12 blue-text">
                    <h5>
                        { mode==='Edit' ? 'แก้ไขผู้ลงทุน' : 'เพิ่มผู้ลงทุน'}
                    </h5>
                </div>
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
    connect(mapStateToProps,{createUserSubInvestor, updateUserSubInvestor})
) (FormSubInvestors);