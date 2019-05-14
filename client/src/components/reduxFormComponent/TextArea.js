import React from 'react';

const inputStyle = {
    maxWidth: '35em'
};

const TextArea = ({ input, label, placeholder, meta: { error, touched } }) => {
    return (
        <div  style={{marginTop:'5px'}} >
            <label> {label} </label>
            <div style={{clear:'both'}} />
            <textarea {...input} style={inputStyle} placeholder={placeholder}/>
            <div className="red-text">
                { touched && error }
            </div>
        </div>
    );
};

export default TextArea;