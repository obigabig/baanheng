import React, { Component } from 'react';
import requireAuth from '../utils/requireAuth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import DueContractList from '../components/dashboard/DueContractList';
import InvestorRatio from '../components/dashboard/InvestorRatio';
import FixButton from '../components/reactComponent/FixButton';
import { menuClicked } from '../actions';

class DashboardScreen extends Component{

    componentDidMount(){
        this.props.menuClicked('Dashboard')
    }

    render() {
        return (             
            <div className="main-box">
                <div className="row">
                    <div className="col s12 m4 l3 hide-on-small-only">
                        <InvestorRatio />
                    </div>
                    <div className="col s12 m8 l9 mobile-box">                           
                        <DueContractList />              
                    </div>
                </div>   
                <FixButton link="/Contract"> </FixButton>
            </div>
        );
    }
}

export default compose(
    requireAuth,
    connect(null, { menuClicked }),    
  )(DashboardScreen);