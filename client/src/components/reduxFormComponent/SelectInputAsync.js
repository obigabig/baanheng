import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import axios from 'axios';
import * as actions from '../../actions';
import { connect } from 'react-redux';

/*
 * assuming the API returns something like this:
 *   const json = [
 *      { value: 'one', label: 'One' },
 *      { value: 'two', label: 'Two' }
 *   ]
 */

class SelectInputAsync extends Component {
  constructor(props) {
    super(props);
    this.url = this.props.url;
  }

  filterOptionAsync(option) {
    // Make logic here, just return true for test
    return true;
  }

  getOptions = async input => {
    try {
      const { data } = await axios.get(this.url);
      return { options: data };
    } catch (e) {
      console.log(this.url + ' :' + e);
    }
  };

  onChange(event) {
    if (this.props.input.onChange && event != null) {
      // To be aligned with how redux-form publishes its CHANGE action payload. The event received is an object with 2 keys: "value" and "label"
      this.props.input.onChange(event.value);
    } else {
      // Clear the input field
      this.props.input.onChange(null);
    }
  }

  renderLabel(label, require) {
    if (label) {
      return (
        <div style={{marginTop:'5px'}}>
          <label>
            {' '}
            {label}{' '}
            {require ? (
              <span
                style={{
                  color: 'red',
                  fontWeight: 'bold',
                  paddingLeft: '5px'
                }}
              >
                *
              </span>
            ) : (
              ''
            )}
          </label>
          <div style={{ clear: 'both' }} />
        </div>
      );
    }

    return;
  }

  render() {
    const {
      input,
      label,
      require = false,
      meta: { error, touched }
    } = this.props;
    return (
      <div>
        {this.renderLabel(label, require)}
        <Select.Async
          {...this.props}
          value={input.value || ''}
          onBlur={() => input.onBlur(this.props.input.value)}
          onChange={this.onChange.bind(this)}
          loadOptions={this.getOptions}
          filterOption={this.filterOptionAsync}
          isLoading={true}
        />
        <div className="red-text">{touched && error}</div>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(SelectInputAsync);
