import React, { Component } from 'react';
import ContractForm from './ContractForm';
import requireAuth from '../../utils/requireAuth';
import InvestorRatio from '../dashboard/InvestorRatio';
import Navbar from '../reactComponent/Navbar';

import '../../css/contract.css';

class Contract extends Component {

    componentDidMount() {
    }

    render(){
       return (
        <div className="main-box">
            <div className="row">
                <Navbar ActiveIndex=""/>
            </div>
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

export default requireAuth(Contract);