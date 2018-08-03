import React from 'react';

const style = {
    fontSize: '16px'
}

const SubmitButton = ({text}) => {
    return (
        <button type="submit" 
            className="waves-effect waves-light btn" 
            style={style} >
            {text}        
        </button>
    );
};

export default SubmitButton;