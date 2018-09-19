import React, { Component } from 'react';
import { getFormValues } from 'redux-form';
import moment from 'moment';

import { connect } from 'react-redux';
import {
  createContractActionsFormAction,
  updateContractActionsFormAction,
  updateOneContractActionsAction
} from '../../actions';
import ActionsPopupForm from './ActionsPopupForm';
import '../../css/main.css';

class ContractFormActions extends Component {
  state = {
    showActionsPopup: false,
    mode: '',
    popUpData: {}
  };

  componentDidUpdate(prevProps) {}

  renderHeader() {
    return (
      <div
        className="row red lighten-1 white-text text-darken-2 valign-wrapper"
        style={{ marginTop: '10px' }}
      >
        <div className="col s1 right-align">
          <i className="material-icons valign-wrapper">work</i>
        </div>
        <div className="col s8 left-align">
          <h6> การดำเนินงาน </h6>
        </div>
        <div className="col s3 right-align" style={{ paddingRight: '0px' }}>
          <button
            className="btn-flat red lighten-2 white-text right-align"
            type="button"
            onClick={() => this.togglePopup('new')}
          >
            <i className="material-icons right">add</i>
            เพิ่ม
          </button>
        </div>
      </div>
    );
  }

  togglePopup = (mode = 'new', index = 0) => {
    this.setState({
      showActionsPopup: !this.state.showActionsPopup,
      mode,
      index,
      popUpData:
        mode === 'edit' && this.props.contractForm
          ? this.props.contractForm.contractActions[index]
          : {}
    });
  };

  removeList(index) {
    const { fields } = this.props;
    setTimeout(() => {
      fields.remove(index);
    }, 200);
  }

  toggleIsCompleted(index) {    
    setTimeout(() => {
      const { fields } = this.props;
      let data = fields.get(index)
      data.isCompleted = !data.isCompleted
      this.props.updateOneContractActionsAction(
        data,
        index
      );
    }, 200);
  }

  addDataToLists(type, description, dueDate) {
    const { fields } = this.props;
    const sortedField = (fields.getAll() || [])
      .concat([
        {
          type,
          description,
          dueDate
        }
      ])
      .sort(function(a, b) {
        var dateA = moment(a.dueDate, 'DD/MM/YYYY'),
          dateB = moment(b.dueDate, 'DD/MM/YYYY');
        if (dateA.isBefore(dateB)) return -1;
        if (dateA.isAfter(dateB)) return 1;
        return 0;
      });

    this.props.updateContractActionsFormAction(sortedField);

  }

  updateDataToLists(type, description, dueDate) {
    const { fields } = this.props;

    const items = fields.getAll() || [];
    //remove current data
    items.splice(this.state.index, 1);
    //Add new data and sort by date
    const sortedField = (items || [])
      .concat([
        {
          type,
          description,
          dueDate
        }
      ])
      .sort(function(a, b) {
        var dateA = moment(a.dueDate, 'DD/MM/YYYY'),
          dateB = moment(b.dueDate, 'DD/MM/YYYY');
        if (dateA.isBefore(dateB)) return -1;
        if (dateA.isAfter(dateB)) return 1;
        return 0;
      });

    this.props.updateContractActionsFormAction(sortedField);
  }

  renderActionPopup() {
    if (this.state.showActionsPopup) {
      return (
        <ActionsPopupForm
          data={this.state.popUpData}
          closePopup={this.togglePopup.bind(this)}
          submitActionToForm={(type, description, dueDate) => {
            //Close popup
            this.togglePopup();
            //Insert or Update actions data to list
            if (this.state.mode === 'edit') {
              this.updateDataToLists(type, description, dueDate);
            } else {
              this.addDataToLists(type, description, dueDate);
            }
          }}
        />
      );
    }

    return '';
  }

  renderEmptyRow() {
    return (
      <div className="row center-align">
        ยังไม่มีรายการแจ้งเตือน
        <button
          className="btn-flat blue-text"
          type="button"
          onClick={() => this.togglePopup('new')}
        >
          คลิ๊ก
        </button>
        เพื่อเพิ่ม
      </div>
    );
  }

  renderIsCompletedIcon(isCompleted) {
    if (isCompleted)
      return (
        <i className="material-icons valign-wrapper grey-text">alarm_off</i>
      );

    return <i className="material-icons valign-wrapper btnApprove">alarm_on</i>;
  }

  renderRow(action, index) {
    const bgColor = action.isCompleted ? 'grey lighten-4' : '';

    return (
      <li key={index} className="fieldArrayRow">
        <div className={`row valign-wrapper ${bgColor}`}>
          <div className="col s2 m1">#{index + 1}</div>
          <div className="col s6 m6">{ action.description ? `${action.type} (${action.description})` : action.type}</div>
          <div className="col s4 m2">{ action.dueDate }</div>
          <div className="col s12 m3">
            <div className="row right">
              <div className="left">
                <button
                  className="btn-flat btn-flat-inline"
                  name="btnComplete"
                  type="button"
                  title="การแจ้งเตือน"
                  onClick={() => this.toggleIsCompleted(index)}
                >
                  {this.renderIsCompletedIcon(action.isCompleted)}
                </button>
              </div>
              <div className="left" style={{
                borderRight:'2px solid grey',
                width: '13px',
                margin: '8px 5px 0px 0px',
                height: '20px'
              }}>
              
              </div>
              <div className="left">
                <button
                  className="waves-effect waves-teal btn-flat btn-flat-inline"
                  name="btnEdit"
                  type="button"
                  title="แก้ไข"
                  onClick={() => this.togglePopup('edit', index)}
                >
                  <i className="material-icons valign-wrapper btnEdit">edit</i>
                </button>
              </div>
              <div className="left">
                <button
                  className="waves-effect waves-teal btn-flat btn-flat-inline"
                  name="btnDelete"
                  type="button"
                  title="ลบรายการ"
                  onClick={() => this.removeList(index)}
                >
                  <i className="material-icons valign-wrapper btnDelete">
                    delete
                  </i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }

  renderActionLists() {
    const { fields } = this.props;

    const sortFields = (fields.getAll() || []).sort(function(a, b) {
      var dateA = moment(a.dueDate, 'DD/MM/YYYY'),
        dateB = moment(b.dueDate, 'DD/MM/YYYY');
      if (dateA.isBefore(dateB)) return -1;
      if (dateA.isAfter(dateB)) return 1;
      return 0;
    });

    if (sortFields.length > 0)
      return sortFields.map((action, index) => this.renderRow(action, index));
    else return this.renderEmptyRow();
  }

  render() {
    const {
      meta: { error, submitFailed }
    } = this.props;

    return (
      <div className="flex-container">
        {this.renderHeader()}
        <ul>
          <li key="-1">
            <div className="row">
              <div className="col s12">
                {submitFailed && error && <span>{error}</span>}
              </div>
            </div>
          </li>
          {this.renderActionLists()}
        </ul>
        {this.renderActionPopup()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    contractForm: getFormValues('contract')(state)
  };
}

export default connect(
  mapStateToProps,
  {
    createContractActionsFormAction,
    updateContractActionsFormAction,
    updateOneContractActionsAction
  }
)(ContractFormActions);
