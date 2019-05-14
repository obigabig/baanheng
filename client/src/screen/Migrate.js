import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'
import * as actions from '../actions';
import requireAuth from '../utils/requireAuth';

class Migrate extends Component {

  onMigrateButtonClicked = () => {
    this.props.migrateSQL2MongoAction();
  }

  render() {
    if(this.props.user.role !== 'superadmin'){
      return <p>Permission denied.</p>
    }

    return (
      <div className="container center-align" style={{ marginBottom: '10px'}}>
        <div className="row">
          <div className="col s12 ">
            <p>Start migrate data: </p>
          </div>
        </div>
        <div className="row">
          <div className="col s12 ">
            <p></p>
          </div>
        </div>
        <div className="row">
          <button className="waves-effect waves-light btn">Go!</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { migrate: state.migrate,
    user: state.user };
}

export default compose(
  requireAuth,
  connect(mapStateToProps, actions),    
)(Migrate);