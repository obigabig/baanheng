import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import requireAuth from '../../utils/requireAuth';
import { menuClicked } from '../../actions';

import ReportMenu from './ReportMenu';
import InvestmentRatio from './InvestmentRatio';


class Reports extends Component{
    
    componentDidMount(){
        this.props.menuClicked('Reports')
    }

    render() {
        return (             
            <div className="main-box">
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

export default compose(
    connect(null, { menuClicked }),
    requireAuth
  )(Reports);