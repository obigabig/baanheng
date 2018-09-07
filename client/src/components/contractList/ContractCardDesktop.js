import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import { numberWithCommas } from '../../utils/format';
import { ContractStatusValue } from '../../const';
import ContractCardDesktopDetail from './ContractCardDesktopDetail';

class ContractCardDesktop extends Component {

  render() {
    const { contract, upComingAction, selectedContractNo, setSelectedContractNo } = this.props;

    return (
      <div>
        <div
          onClick={() => setSelectedContractNo(contract.no)}
          className={`row contractRow-desktop ${getRowClass(contract.status)}`}
        >
          <div className="col s10 m5 l6 truncate">
            <span className="">{`#${contract.no} : `} </span>
            <span style={{ fontWeight: '600' }}>{`${contract.title} `} </span>
          </div>
          <div className={`col s2 m2 l2 hide-on-small-only ${getTextStyle(contract.status)}`}>
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
              <i className={`material-icons right ${getEditButtonStyle(contract.status)}`}>
                edit
              </i>
            </Link>
          </div>
        </div>
        <ContractCardDesktopDetail
          visible={selectedContractNo === contract.no ? true : false }
          contract={contract}
          upComingAction={upComingAction}
        />
      </div>
    );
  }
}

const getRowClass = status => {
  if (status === ContractStatusValue.new) return 'contractRow-new';
  else if (status === ContractStatusValue.ongoing) return 'contractRow-ongoing';
  else if (status === ContractStatusValue.break) return 'contractRow-break';
  else if (status === ContractStatusValue.end) return 'contractRow-end';

  return '';
};

const getEditButtonStyle = status => {
  if (status === ContractStatusValue.new) return 'teal-text';
  else if (status === ContractStatusValue.ongoing) return 'light-blue-text text-darken-1';
  else if (status === ContractStatusValue.break) return 'red-text text-lighten-5';
  else if (status === ContractStatusValue.end) return 'cyan-text text-lighten-5';

  return '';
};

const getTextStyle = status => {
  if (status === ContractStatusValue.new) return 'grey-text text-darken-3';
  else if (status === ContractStatusValue.ongoing) return 'grey-text text-darken-3';
  else if (status === ContractStatusValue.break) return 'grey-text text-lighten-4';
  else if (status === ContractStatusValue.end) return 'grey-text text-lighten-4';

  return '';
};

export default withRouter(ContractCardDesktop);
