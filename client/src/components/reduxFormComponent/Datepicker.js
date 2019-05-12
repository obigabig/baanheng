import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/th';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class Datepicker extends Component {
  handleChange(date) {
    this.props.input.onChange(moment(date).format('DD/MM/YYYY'));
  }

  handleKeyDown(key) {
    this.props.input.onChange(null);
  }

  renderLabel(label, value){
    if(value)
      return <label> {`${label} (${moment(value, 'DD/MM/YYYY').add('year',543).format('DD/MMM/YYYY')})`} </label>
    else
      return <label>{label} </label>
  }

  render() {
    const {
      input,
      placeholder,
      label,
      meta: { touched, error }
    } = this.props;

    const inputStyle = {
      textAlign: 'right',
      maxWidth: '25em'
    };

    moment.locale('th');

    return (
      <div style={{ marginTop: '5px' }}>
        {this.renderLabel(label, input.value)}
        <div style={{ clear: 'both' }} />
        <DatePicker
          {...input}
          autoComplete="off"
          dateFormat="DD/MM/YYYY"
          locale="th"
          style={inputStyle}
          placeholder={placeholder}
          selected={input.value ? moment(input.value, 'DD/MM/YYYY') : null}
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
          showMonthDropdown
          showYearDropdown
          fixedHeight
          withPortal
          placeholderText={label}
        />
        <div className="red-text">
          {touched && error && <span>{error}</span>}
        </div>
      </div>
    );
  }
}

Datepicker.propTypes = {
  input: PropTypes.shape().isRequired,
  meta: PropTypes.shape().isRequired
};

export default Datepicker