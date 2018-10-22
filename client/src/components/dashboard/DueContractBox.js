import React, { Component } from 'react';
import _ from 'lodash';
import { Collapse } from 'react-collapse';

import DueContractCard from './DueContractCard';

class DueContractBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isListOpen: true
    };

    this.handleChkUpcomingInputChange = this.handleChkUpcomingInputChange.bind(
      this
    );
  }

  handleChkUpcomingInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      isListOpen: value
    });
  }

  renderCardList(contractList) {
    return _.map(contractList, (contract, i) => {
      return <DueContractCard key={i} contract={contract} index={i} />;
    });
  }

  render() {
    const { contractList, label, icon, iconClassname } = this.props;
    
    return (
      <div className="collapseBox">
        <div className="collapseTitle">
          <label>
            <div className="row">
              <div className="col s11">
                <div className="left valign-wrapper">
                <span style={{marginRight:'10px'}}>
                    <i className={`Medium material-icons ${iconClassname}`}>
                        {icon}
                    </i>
                </span>
                <span style={{ fontSize: '20px' }}>
                  {` ${label}`}
                </span>
                </div>

              </div>
              <div className="col s1">
                <i
                  className="Medium material-icons right"
                  style={{ paddingTop: '2px' }}
                >
                  {this.state.isListOpen
                    ? 'keyboard_arrow_down'
                    : 'keyboard_arrow_up'}
                </i>
              </div>
            </div>
            <input
              id="chkUpcoming"
              name="chkUpcoming"
              type="checkbox"
              checked={this.state.isListOpen}
              onChange={this.handleChkUpcomingInputChange}
            />
          </label>
        </div>
        <div>
          <div>
            <Collapse isOpened={this.state.isListOpen}>
              {this.renderCardList(contractList)}
            </Collapse>
            <div
              className="center-align grey-text"
              style={{ marginTop: '10px' }}
            >
              {`ทั้งหมด ${contractList.length} รายการ...`}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DueContractBox;
