import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

class NumberInput extends Component {
    
    onChange(event) {
        if (this.props.input.onChange && event != null) {
            this.props.input.onChange(event.value);

        } else {
            // Clear the input field
            this.props.input.onChange(null)
        }
    }

    render() {
        const {  input, 
            label, 
            placeholder = '', 
            require=false, 
            readonly=false,
            meta: { error, touched } } = this.props;

        const inputStyle = {
            textAlign: 'right',
            maxWidth: '25em'
        }

        return ( 
            <div style={{marginTop:'5px'}}>
                <label> 
                    {label} 
                    {require ? <span style={{
                        color:'red',
                        fontWeight: 'bold',
                        paddingLeft: '5px'
                    }}>*</span>  : ''}
                </label>
                <div style={{clear:'both'}} />
                <NumberFormat {...input} 
                    thousandSeparator=""
                    style={inputStyle} 
                    placeholder={placeholder}
                    displayType={readonly ? 'text': 'input' } 
                    onValueChange = { this.onChange.bind(this) }  
                />
                <div className="red-text">
                    { touched && error }
                </div>
            </div>
        );
    }
}
     
export default NumberInput;
