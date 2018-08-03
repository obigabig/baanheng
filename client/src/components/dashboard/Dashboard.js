import React, { Component } from 'react';
import requireAuth from '../../utils/requireAuth';

import DueContractList from './DueContractList';
import InvestorRatio from './InvestorRatio';
import FixButton from '../reactComponent/FixButton';
import Navbar from '../reactComponent/Navbar';

class Dashboard extends Component{

    render() {
        return (             
            <div className="main-box">
                <div className="row">
                    <Navbar ActiveIndex="Dashboard"/>
                </div>
                <div className="row">
                    <div className="col s12 m4 l3 hide-on-small-only">
                        <InvestorRatio />
                    </div>
                    <div className="col s12 m8 l9">                           
                        <DueContractList />              
                    </div>
                </div>   
                <FixButton link="/Contract"> </FixButton>
            </div>
        );
    }
}

export default requireAuth(Dashboard);