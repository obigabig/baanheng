import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import Spinner from '../reactComponent/Spinner';
import { getDueContractListsAction } from '../../actions';

import DueContractBox from './DueContractBox';

export class DueContractList extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    if (this.props.authenticated) {
      this.props.getDueContractListsAction(() => {
        this.setState({ isLoading: false });
      });
    }
  }

  render() {
    let overDueList = [];
    let upComingList = [];
    //Split overDueList and  upComingList
    if (this.props.dueContractList.data) {
      const sortedList = _.orderBy(
        this.props.dueContractList.data,
        function(e) {
          return moment(e.actions[0].dueDate, 'DD/MM/YYYY');
        },
        ['asc']
      );

      _.each(sortedList, contract => {
        if (
          moment(contract.actions[0].dueDate, 'DD/MM/YYYY').diff(
            moment(),
            'days'
          ) < 0
        )
          overDueList.push(contract);
        else upComingList.push(contract);
      });
    }

    if (this.state.isLoading) return <Spinner />;

    return (
      <div data-test="component-due-contract-lists">
        <div className="right-align red-text">
          {this.props.dueContractList.errorMessage && (
            <strong>{this.props.dueContractList.errorMessage}</strong>
          )}
        </div>
        <DueContractBox
          data-test="component-due-contract-box"
          contractList={overDueList}
          label="เลยกำหนด"
          icon="warning"
          iconClassname=" red-text accent-4"
        />
        <DueContractBox
          data-test="component-due-contract-box"
          contractList={upComingList}
          label="กำลังจะถึง"
          icon="warning"
          iconClassname="orange-text darken-4"
        />
      </div>
    );
  }
}

function mapStateToProps({ auth, dueContractList }) {
  return {
    authenticated: auth.authenticated,
    dueContractList
  };
}

export default connect(
  mapStateToProps,
  { getDueContractListsAction }
)(DueContractList);
