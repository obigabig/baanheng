import React from 'react';
import Spinner from 'react-spinkit';

const spinner = () => {
    return (
        <div className="center-align" style={{lineHeight: '100px'}}>
            <Spinner name="ball-pulse-sync" color="steelblue"/>
        </div>
    );
};

export default spinner;