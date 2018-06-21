import React from 'react';

const LoginField = ({ input, label, type, autocomplete, meta: { error, touched } }) => {
    return (
        <div>
            <label> {label} </label>
            <input {...input} style={{ marginBottom: '5px' }} type= {type} autoComplete = {autocomplete} />
            <div className="red-text" style={{ marginBottom: '20px' }}>
                { touched && error }
            </div>
        </div>
    );
};

export default LoginField;