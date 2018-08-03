import React, { Component } from 'react';
import ContractForm from './ContractForm';
import requireAuth from '../../hoc/requireAuth';
import InvestorRatio from '../dashboard/InvestorRatio';
import Navbar from '../reactComponent/Navbar';

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
                <div className="col s12 m4 l3"><InvestorRatio/></div>
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