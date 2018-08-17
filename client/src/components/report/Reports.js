import React, { Component } from 'react';
import requireAuth from '../../utils/requireAuth';

import Navbar from '../reactComponent/Navbar';
import ReportMenu from './ReportMenu';
import InvestmentRatio from './InvestmentRatio';


class Reports extends Component{

    render() {
        return (             
            <div className="main-box">
                <div className="row">
                    <Navbar ActiveIndex="Reports"/>
                </div>
                <div className="row">
                    <div className="col s12 m4 l3 hide-on-small-only">
                        <ReportMenu />           
                    </div>
                    <div className="col s12 m8 l9">                           
                        <InvestmentRatio />   
                    </div>
                </div>                   
            </div>
        );
    }
}

export default requireAuth(Reports);