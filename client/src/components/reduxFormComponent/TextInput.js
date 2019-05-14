import React from 'react';

const inputStyle = {
    textAlign: 'left',
    maxWidth: '25em'
}

const TextInput = ({ input, 
                        label, 
                        placeholder,
                        type, 
                        autocomplete = "false", 
                        readonly=false, 
                        require=false,
                        meta: { error, touched } }) => {

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
            <input {...input} 
                type= {type} 
                autoComplete = {autocomplete} 
                style={inputStyle}
                readOnly={readonly}  
                placeholder={placeholder}                 
                />
            <div className="red-text" >
                { touched && error }
            </div>
        </div>
    );
};

export default TextInput;