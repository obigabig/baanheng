import React from 'react';
import { Link } from 'react-router-dom';

const fixBtnStyle = {
    position: 'fixed',
    right: '23px',
    bottom: '23px',
    marginBottom: '0',
    zIndex: '997'
  }; 

const fixButton = ({link}) => {
    return (
        <Link to={link} style={fixBtnStyle} className="btn-floating btn-large waves-effect waves-light red">
             <i className="material-icons">add</i>
        </Link>
    );
};

export default fixButton;