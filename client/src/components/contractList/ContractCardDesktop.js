import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';

import { numberWithCommas } from '../../utils/format';
import { ContractStatusValue } from '../../const';
import ContractCardDesktopDetail from './ContractCardDesktopDetail';

class ContractCardDesktop extends Component {
  state = {
    hovered: false
  };

  renderUpComingAction() {
    const { upComingAction } = this.props;
    if (!_.isEmpty(upComingAction)) {
      upComingAction.upComingDay = moment(
        upComingAction.dueDate,
        'DD/MM/YYYY'
      ).diff(moment(), 'days') + 1;

      return (
        <div
          className="col s12"
          style={{ textAlign: 'right', marginTop: '-8px' }}
        >
          <span
            style={{
              backgroundColor: '#ffff61',
              padding: '1px 5px 1px 5px',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          >
            {upComingAction.type &&
              `* ${
                upComingAction.description
                  ? `${upComingAction.type}(${upComingAction.description})`
                  : upComingAction.type
              } : ` +
                `${moment(upComingAction.dueDate).format('DD/MM/YYYY')}` +
                ` (${upComingAction.upComingDay} วัน)`}
          </span>
        </div>
      );
    }
    return;
  }

  render() {
    const { contract, selectedContractNo, setSelectedContractNo } = this.props;

    let hoverStyle;
    if (this.state.hovered) {
      hoverStyle = 'contractRow-hover';
    } else {
      hoverStyle = '';
    }

    return (
      <div>
        <div
          onClick={() => setSelectedContractNo(contract.no)}
          className={`row contractRow-desktop ${getRowClass(
            contract.status
          )} ${hoverStyle}`}
          onMouseOver={() => this.setState({ hovered: true })}
          onMouseLeave={() => this.setState({ hovered: false })}
          style={{ cursor: 'pointer' }}
        >
          <div className="col s10 m5 l6 truncate">
            <span className="">{`#${contract.no} : `} </span>
            <span style={{ fontWeight: '600' }}>{`${contract.title} `} </span>
          </div>
          <div
            className={`col s2 m2 l2 hide-on-small-only ${getTextStyle(
              contract.status
            )}`}
          >
            <span className=""> {`${contract.status}`} </span>
          </div>
          <div className="col s2 m3 l3 hide-on-small-only">
            <span className="right">
              {`${numberWithCommas(contract.value)} บาท`}{' '}
            </span>
          </div>
          <div
            className="col s2 m2 l1 valign-wrapper"
            style={{ height: '35px' }}
          >
            <Link to={`/Contract/${contract.no}`}>
              <i
                className={`material-icons right ${getEditButtonStyle(
                  contract.status
                )}`}
              >
                edit
              </i>
            </Link>
          </div>
          {this.renderUpComingAction()}
        </div>
        <ContractCardDesktopDetail
          visible={selectedContractNo === contract.no ? true : false}
          contract={contract}
        />
      </div>
    );
  }
}

const getRowClass = status => {
  if (status === ContractStatusValue.draft) return 'contractRow-new';
  else if (status === ContractStatusValue.ongoing) return 'contractRow-ongoing';
  else if (status === ContractStatusValue.break) return 'contractRow-break';
  else if (status === ContractStatusValue.end) return 'contractRow-end';

  return '';
};

const getEditButtonStyle = status => {
  if (status === ContractStatusValue.draft) return 'blue-text text-lighten-5';
  else if (status === ContractStatusValue.ongoing)
    return 'teal-text text-lighten-5';
  else if (status === ContractStatusValue.break)
    return 'red-text text-lighten-5';
  else if (status === ContractStatusValue.end)
    return 'grey-text text-lighten-5';

  return '';
};

const getTextStyle = status => {
  if (status === ContractStatusValue.draft) return 'grey-text text-darken-3';
  else if (status === ContractStatusValue.ongoing)
    return 'grey-text text-darken-3';
  else if (status === ContractStatusValue.break)
    return 'grey-text text-lighten-4';
  else if (status === ContractStatusValue.end) return 'grey-text text-darken-4';

  return '';
};

export default withRouter(ContractCardDesktop);
