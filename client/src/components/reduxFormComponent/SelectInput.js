import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class SelectInput extends Component {

        onChange(event) {
            //console.log(event)
     
            if (this.props.input.onChange && event != null) {
                // To be aligned with how redux-form publishes its CHANGE action payload. The event received is an object with 2 keys: "value" and "label"
                this.props.input.onChange(event.value);
            } else {
                // Clear the input field
                this.props.input.onChange(null)
            }
        }
     
        render() {
            const { input, options, label, require=false, meta: { error, touched } } = this.props;
            const inputStyle = {
                textAlign: 'left',
                maxWidth: '25em'
            }
            
            return ( 
                <div style={{marginTop:'5px'}}>
                    <label> {label}                 {require ? <span style={{
                                            color:'red',
                                            fontWeight: 'bold',
                                            paddingLeft: '5px'
                                        }}>*</span>  : ''}
                    </label>
                    <div style={{clear:'both'}} />
                    <Select {...this.props }
                    style={inputStyle}
                    value = { input.value || '' }
                    onBlur = {() => input.onBlur(this.props.input.value) }
                    onChange = { this.onChange.bind(this) }                    
                    options = {options}
                    placeholder = {label}
                    />
                    <div className="red-text" >
                        { touched && error }
                    </div>
                </div>
            );
        }
    }
     
    export default SelectInput;


