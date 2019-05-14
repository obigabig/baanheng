import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import ContractForm from '../components/contract/ContractForm';
import requireAuth from '../utils/requireAuth';
import InvestorRatio from '../components/dashboard/InvestorRatio';
import { menuClicked } from '../actions';

import '../css/contract.css';

class Contract extends Component {

    componentDidMount(){
        this.props.menuClicked('')
    }

    render(){
       return (
        <div className="main-box">
            <div className="row">
                <div className="col s12 m4 l3 hide-on-med-and-down"><InvestorRatio/></div>
                <div className="col s12 m8 l9">
                    <ContractForm 
                        mode={this.props.match.params.id? 'edit' : 'new'}
                        id={this.props.match.params.id}
                    /></div>
            </div>   
        </div>    
       )
    }
}

export default compose(
    connect(null, { menuClicked }),
    requireAuth
  )(Contract);