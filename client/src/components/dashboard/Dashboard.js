import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Dashboard extends Component{

    componentDidMount() {

    }
        
    renderDashboard() {        
        if (!this.props.authenticated){
            return (
                <div> Dashboard 
                </div>
            );
        }

        return(
            <div> {this.props.authenticated} </div>
        );
    }

    render() {
        return (
            <div>
                { this.renderDashboard() }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  
export default connect(mapStateToProps,actions)(Dashboard);