import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import _ from 'lodash';

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

  renderRow(label, value) {
    return (
      <div>
        <span style={{color: '#353535'}}> {`${label}: `} </span>
        <span style={{ fontWeight: 'bold'}}> {value} </span>
        <br />
      </div>
    );
  }

  renderMainDetail() {
    const { contract } = this.props;
    return (
      <div>
        {this.renderRow('สถานะ', contract.status)}
        {this.renderRow(`${contract.pact}/${contract.type}`, `${numberWithCommas(contract.value)} บาท`)}
        {this.renderRow(`วันที่เริ่มสัญญา`, `${contract.beginDate ? contract.beginDate : '-'}`)}
        {this.renderRow(`วันที่จบสัญญา`, `${contract.closeDate ? contract.closeDate : '-'}`)}
        {this.renderRow(`ผู้ทำสัญญา`, `${contract._signBy ? contract._signBy.name : '-'}`)}
      </div>
    );
  }

  renderSubInvestor() {
    const { contract } = this.props;

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

  renderActionList() {
    const { contract } = this.props;

    if (contract.actions.length > 0) {
      return _.map(contract.actions, (action, index) => {
        return (
          <div className="row" key={index}>
            <div className="col s12 m6">
              {`${
                action.description
                  ? `${action.type}(${action.description})`
                  : action.type
              }`}
            </div>
            <div className="col s6 m3">{`${action.dueDate}`}</div>
            <div className="col s6 m3">
              <span>แจ้งเตือน: </span>
              {action.isCompleted ? (
                <span className="red-text">ปิด</span>
              ) : (
                <span className="green-text text-darken-4">เปิด</span>
              )}
            </div>
          </div>
        );
      });
    }

    return <div className="center-align"> ไม่มีรายการแจ้งเตือน </div>;
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
              <div className="row">
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
                    keyboard_arrow_right
                  </i>
                </div>
              </div>
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide3)}>
              <div className="col s10">{this.renderActionList()}</div>
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
  if (status === ContractStatusValue.draft) return 'contractRowDetail-new';
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
