import React from 'react';
import Spinner from 'react-spinkit';

const spinner = () => {
    return (
        <div className="center-align">
            <Spinner name="ball-pulse-sync" color="steelblue"/>
        </div>
    );
};

export default spinner;