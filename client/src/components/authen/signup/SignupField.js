import React from 'react';

const SignupField = ({ input, label, type, meta: { error, touched } }) => {
    return (
        <div>
            <label> {label} </label>
            <input {...input} style={{ marginBottom: '5px' }} type= {type}/>
            <div className="red-text" style={{ marginBottom: '20px' }}>
                { touched && error }
            </div>
        </div>
    );
};

export default SignupField;