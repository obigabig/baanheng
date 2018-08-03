import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

class Datepicker extends Component {

    constructor (props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange (date) {
        this.props.input.onChange(moment(date).format('DD/MM/YYYY'));
    }
 
    render () {
      const {
          input, placeholder, label, 
          meta: {touched, error}
      } = this.props
        
      const inputStyle = {
        textAlign: 'right',
        maxWidth: '25em'
      }

        return (
          <div style={{marginTop:'5px'}}>
            <label> {label} </label>
            <div style={{clear:'both'}} />
            <DatePicker
              {...input}
              style={inputStyle}
              placeholder={placeholder}
              dateFormat="DD/MM/YYYY"
              selected={input.value ? moment(input.value, 'DD/MM/YYYY') : null}
              onChange={this.handleChange}
              placeholderText={label}
            >
            </DatePicker>
            {touched && error && <span>{error}</span>}
          </div>
        )
    }
}
 
export default Datepicker;
