import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import formFileds from './formFields';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { signInAction } from '../../../actions';
import { withRouter } from 'react-router-dom';
import utilValidate from '../../../utils/validate';

import LoginField from './LoginField';

class LoginForm extends Component {

    submit = (values) => {
        this.props.signInAction(values, () => {this.props.history.push('/')});
    }

    renderField() {    
        return _.map(formFileds, ({label, name, type}) => {
                return (
                    <Field 
                        key={ name }
                        type={type}
                        name={name} 
                        component={LoginField}
                        label={label}
                    />
                );
        });    
      }

    renderSubmitError() {    
        return (
            <div className="right-align red-text text-darken-2"> 
                {this.props.errorMessage}   
            </div>
        );
    }

    renderSubmitButton() {    
        const style = {
            fontSize: '16px'
        }

        return (
            <div className="right-align">
                <button type="submit" 
                    className="waves-effect waves-light btn" 
                    style={style} >
                    เข้าสู่ระบบ
                </button>
            </div>
        );
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit(this.submit)}>
                    {this.renderField()}   
                    {this.renderSubmitError()}
                    {this.renderSubmitButton()}   
                </form>
            </div>
        );
    }
}

function validate(values){
    const errors = {}
    _.map(formFileds, ({ name }) => {
        if(!values[name]){           
            errors[name] = 'You must provide a ' + name;
        }
    });

    const emailValidate = utilValidate.validateEmail(values.email);
    if(emailValidate){
        errors.email = emailValidate;
    }

    return errors;
}

function mapStateToProps({ auth }) {
    return { errorMessage: auth.errorMessage };
}

export default compose(
    connect(mapStateToProps, { signInAction }),
    reduxForm({ validate, form: 'login' }),
    
  )(withRouter(LoginForm));


