import React, { Component } from 'react';
import moment from 'moment';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './../../css/popup.css';

import { ActionsType, ActionsTypeValue } from '../../const';
import { isEmpty } from '../../utils/format';

//When Click this form all props will be assign to Contractform
class ActionsPopupForm extends Component {
  state = {
    selectedActionTypeOption: { value: '' },
    description: '',
    dueDate: '',
    errorMessage: ''
  };

  componentWillMount() {
    const { type, description, dueDate, isCompleted } = this.props.data;
    this.setState({
      selectedActionTypeOption: { value: type },
      description,
      dueDate,
      isCompleted
    });
  }

  handleSubmitAction = event => {
    const { selectedActionTypeOption, description, dueDate } = this.state;

    if (this.validateAddAction()) {
      this.props.submitActionToForm(
        selectedActionTypeOption.value,
        description,
        dueDate
      );
    }
  };

  validateAddAction = () => {
    const { selectedActionTypeOption, description, dueDate } = this.state;
    this.setState({ errorMessage: '' });

    if (selectedActionTypeOption.value === 'อื่นๆ' && description === '') {
      this.setState({ errorMessage: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
      return false;
    }
    if (selectedActionTypeOption && dueDate !== '') {
      return true;
    }
    this.setState({ errorMessage: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
    return false;
  };

  handleActionTypeChange = event => {
    if (event === ActionsTypeValue.other) {
      this.setState({
        selectedActionTypeOption: event
      });
    } else {
      this.setState({
        selectedActionTypeOption: event,
        description: ''
      });
    }
  };

  handleDescriptionChange = event => {
    this.setState({ description: event.target.value });
  };

  handleActionDateChange = date => {
    this.setState({ dueDate: moment(date).format('DD/MM/YYYY') });
  };

  renderLabel(label, value){
    if(value)
      return <label> {`${label} (${moment(value, 'DD/MM/YYYY').add('year',543).format('DD/MMM/YYYY')})`} </label>
    else
      return <label>{label} </label>
  }

  render() {
    const { closePopup } = this.props;
    const { selectedActionTypeOption } = this.state;
    const selectedActionValue =
      selectedActionTypeOption && selectedActionTypeOption.value;

    return (
      <div className="popup">
        <div className="popup_inner popupNew">
          <div className="right-align">
            <button type="button" onClick={closePopup} className="btn-flat">
              <i className="material-icons">close</i>
            </button>
          </div>
          <div className="container">
            <div className="row valign-wrapper">
              <div className="col s1 right ">
                <i className="material-icons valign-wrapper">edit</i>
              </div>
              <div className="col s11">
                <h5>
                  {' '}
                  {isEmpty(this.props.data)
                    ? 'เพิ่มรายการ'
                    : 'แก้ไขรายการ'}{' '}
                </h5>
              </div>
            </div>
            <div>
              <label>รายการ:</label>
              <Select
                name="actionType"
                value={selectedActionValue}
                onChange={this.handleActionTypeChange}
                options={ActionsType}
                placeholder="รายการ"
              />
            </div>
            <div>
              <label>เพิ่มเติม :</label>
              <input
                name="description"
                type="text"
                placeholder="เช่น ดอกเบี้ยค้างชำระ"
                onChange={this.handleDescriptionChange}
              />
            </div>
            <div>
              {this.renderLabel('วันที่ดำเนินการ:', this.state.dueDate)}
              <DatePicker
                autoComplete="off"
                placeholder="วันที่ดำเนินการ"
                locale="th"
                dateFormat="DD/MM/YYYY"
                selected={
                  this.state.dueDate
                    ? moment(this.state.dueDate, 'DD/MM/YYYY')
                    : null
                }
                onChange={this.handleActionDateChange}
                showMonthDropdown
                showYearDropdown
                fixedHeight
              />
            </div>
            <div />
            <div className="right-align">
              {this.state.errorMessage && (
                <span className="red-text">{this.state.errorMessage}</span>
              )}
            </div>
            <div className="right-align" style={{ margin: '10px 0 30px 0' }}>
              <button
                type="button"
                onClick={this.handleSubmitAction}
                className="waves-effect waves-light btn"
                style={{ zIndex: '0' }}
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ActionsPopupForm;
