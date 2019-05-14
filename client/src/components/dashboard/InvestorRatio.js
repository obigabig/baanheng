import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getinvestorRatioAction } from '../../actions';
import { numberWithCommas } from '../../utils/format';
import Spinner from '../reactComponent/Spinner';

class InvestorRatio extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true
    };

    this.renderMainData = this.renderMainData.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true }, () => {
      this.props.getinvestorRatioAction(() => {
        this.setState({ isLoading: false });
      });
    });
  }

  rendersumValue() {
    return (
      <tr>
        <td className="indigo-text">
          <div className="left">รวม:</div>
        </td>
        <td className="indigo-text">
          <div className="right">
            {`${numberWithCommas(
              _.sumBy(this.props.report.investorRatio, 'value')
            )}`}
          </div>
        </td>
      </tr>
    );
  }

  renderInvestor() {
    let index = 0;
    if (this.props.report.investorRatio)
      return _.map(this.props.report.investorRatio, data => {
        index++;
        return (
          <tr key={index}>
            <td>
              <div
                className="Truncation left-align"
                style={{ fontSize: 'small' }}
              >
                {data.name}
              </div>
            </td>
            <td>
              <div className="right-align" style={{ fontSize: 'small' }}>
                {`${numberWithCommas(data.value)}`}
              </div>
            </td>
          </tr>
        );
      });
  }

  renderPieChart = () => {
    /*const { investorRatio } = this.props.report
        if(investorRatio){               
                        
            const data =_.map(investorRatio, (data) => {
                return ([
                    data.name,
                    data.value
                ])       
            })           
        }*/

    return '';
  };

  renderMainData() {
    const { isLoading } = this.state;

    if (isLoading) return <Spinner />;

    return (
      <table>
        <thead>
          <tr>
            <th colSpan="2" className="indigo-text center-align">
              สัดส่วนการลงทุน (บาท)
            </th>
          </tr>
        </thead>
        <tbody>
          {this.renderInvestor()}
          {this.rendersumValue()}
        </tbody>
      </table>
    );
  }

  render() {
    const boxStyle = {
      border: '1px solid #80808020',
      margin: '10px -10px 10px 0px',
      color: '#545454'
    };

    return (
      <div style={boxStyle}>
        <div className="right-align red-text">
          {/*this.props.report.errorMessage && (
            <strong>{this.props.report.errorMessage}</strong>
          )*/}
        </div>
        {this.renderMainData()}
      </div>
    );
  }
}

function mapStateToProps({ report }) {
  return { report };
}

export default compose(
  connect(
    mapStateToProps,
    { getinvestorRatioAction }
  )
)(InvestorRatio);
