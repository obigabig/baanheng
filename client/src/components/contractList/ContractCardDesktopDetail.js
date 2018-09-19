import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import _ from 'lodash';
import moment from 'moment';

import { ContractStatusValue } from '../../const';
import { numberWithCommas } from '../../utils/format';

class ContractCardDesktopDetail extends Component {
  state = {
    index: 0
  };

  handleChangeIndex = index => {
    this.setState({
      index
    });
  };


  renderAlertSection() {
    const { upComingAction } = this.props
    if (!_.isEmpty(upComingAction)) {
      upComingAction.upComingDay = moment(
        upComingAction.dueDate,
        'DD/MM/YYYY'
      ).diff(moment(), 'days');

      return (
        <span style={{backgroundColor: 'yellow'}}>
          {upComingAction.type &&
            `${upComingAction.description ? `${upComingAction.type}(${upComingAction.description})` :  upComingAction.type} : ` +
              `${moment(upComingAction.dueDate).format('DD/MM/YYYY')}` +
              ` (${upComingAction.upComingDay} วัน)`}            
        </span>
      );
    }
    return;
  }

  renderMainDetail() {
    const { contract, upComingAction } = this.props
    return (
      <div>
        <span> {`สถานะ: ${contract.status}`} </span>
        <br />
        <span> {`ประเภท: ${contract.type}`} </span>
        <br />
        <span>
          {' '}
          {`${contract.pact} : ${numberWithCommas(contract.value)} บาท`}{' '}
        </span>
        <br />
        <span>
          {' '}
          {`เริ่มสัญญา: ${contract.beginDate ? contract.beginDate : '-'}`}{' '}
        </span>
        <br />
        <span>
          {' '}
          {`จบสัญญา: ${contract.closeDate ? contract.closeDate : '-'}`}{' '}
        </span>
        <br />
        {this.renderAlertSection(upComingAction)}
      </div>
    );
  }

  renderSubInvestor() {
    const { contract } = this.props
      
    return _.map(contract.subInvestor, (subInvestor, index) => {
      return (
        <div key={index}>
          <span>
            {' '}
            {`${subInvestor._userSubInvestor.name} : ${numberWithCommas(
              subInvestor.value
            )} บาท`}{' '}
          </span>
          <br />
        </div>
      );
    });
  }

  render() {
    const { contract, visible } = this.props;
    const { index } = this.state;


    if (visible) {
      return (
        <div className={`${getRowClass(contract.status)}`} style={styles.root}>
          <SwipeableViews
            enableMouseEvents
            index={index}
            onChangeIndex={this.handleChangeIndex}
          >
            <div style={Object.assign({}, styles.slide, styles.slide1)}>
              <div className="row">
                <div className="col s10">{this.renderMainDetail()}</div>
                <div className="col s2">
                  <i className="material-icons right black-text">
                    keyboard_arrow_right
                  </i>
                </div>
              </div>
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide2)}>
              <div className="col s10">
                {this.renderSubInvestor()}
                <div style={{ borderTop: '1px solid grey' }}>
                  <span>
                    {' '}
                    <strong>
                      {' '}
                      {`รวม (${numberWithCommas(contract.value)} บาท)`}{' '}
                    </strong>
                  </span>
                </div>
              </div>
              <div className="col s2">
                <i className="material-icons right black-text">
                  keyboard_arrow_left
                </i>
              </div>
            </div>
          </SwipeableViews>
        </div>
      );
    }
    return '';
  }
}



const getRowClass = status => {
  if (status === ContractStatusValue.new) return 'contractRowDetail-new';
  else if (status === ContractStatusValue.ongoing)
    return 'contractRowDetail-ongoing';
  else if (status === ContractStatusValue.break)
    return 'contractRowDetail-break';
  else if (status === ContractStatusValue.end) return 'contractRowDetail-end';

  return '';
};

const styles = {
  root: {
    position: 'relative'
  },
  slide: {
    padding: 5,
    minHeight: 120
  },
  slide1: {
    backgroundColor: 'inherit'
  },
  slide2: {
    backgroundColor: 'inherit'
  },
  slide3: {
    backgroundColor: 'inherit'
  }
};

export default ContractCardDesktopDetail;
