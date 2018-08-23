import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

class NumberInput extends Component {
    
    render() {
        const {  input,            
            label, 
            placeholder = '', 
            thousandSeparate=false,
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
                <NumberFormat 
                    value={input.value}
                    type={input.type}
                    style={inputStyle} 
                    placeholder={placeholder}
                    displayType={readonly ? 'text': 'input' } 
                    allowNegative={false}
                    decimalSeparator={'.'}
                    thousandSeparator={thousandSeparate}
                    onValueChange={(values) => {
                        if (isNaN(values.floatValue)) {
                            input.onChange('');
                          } else {
                            input.onChange(values.floatValue);
                          }
                    }}
                />

                <div className="red-text">
                    { touched && error }
                </div>
            </div>
        );
    }
}
     
export default NumberInput;
