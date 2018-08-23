import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { numberWithCommas } from '../../utils/format';
import _ from 'lodash';

const styles = {
  root: {
    position: 'relative',
  },
  slide: {
    padding: 5,
    minHeight: 120
  },
  slide1: {
    backgroundColor: 'inherit',
  },
  slide2: {
    backgroundColor: 'inherit',
  },
  slide3: {
    backgroundColor: 'inherit',
  },
};

class ContractCardDetail extends React.Component {
  state = {
    index: 0,
  };

  handleChangeIndex = index => {
    this.setState({
      index,
    });
  };

  renderMainDetail(contract){
    return (
      <div>
        <span> {`สถานะ: ${contract.status}`} </span><br/>
        <span> {`ประเภท: ${contract.type}`} </span><br/>
        <span> {`${contract.pact} : ${numberWithCommas(contract.value)} บาท`} </span><br/>                           
        <span> {`เริ่มสัญญา: ${contract.beginDate ? contract.beginDate : '-'}`} </span> 
      </div>
    );
  }

  renderSubInvestor(contract){
    return _.map(contract.subInvestor, (subInvestor, index) => {
      return (
        <div key={index}>
          <span> {`${subInvestor._userSubInvestor.name} : ${numberWithCommas(subInvestor.value)} บาท`} </span><br/>
        </div>)
    });
    
  }

  render() {
    const { index } = this.state;
    const { contract } = this.props;
    
    return (
        <div style={styles.root}>
          <SwipeableViews enableMouseEvents index={index} onChangeIndex={this.handleChangeIndex}>
            <div style={Object.assign({}, styles.slide, styles.slide1)}>
              <div className="row">
                <div className="col s10 contractCard-detail">
                  { this.renderMainDetail(contract)}
                </div> 
                <div className="col s2">
                  <i className="material-icons right grey-text lighten-5">keyboard_arrow_right</i> 
                </div> 
              </div> 
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide2)}>
              <div className="col s10 contractCard-detail">
                { this.renderSubInvestor(contract)}
                <div style={{borderTop: '1px solid grey'}}>
                <span> <strong> {`รวม (${numberWithCommas(contract.value)} บาท)`} </strong></span>
                </div>
              </div> 
              <div className="col s2">
                <i className="material-icons right grey-text lighten-5">keyboard_arrow_left</i> 
              </div> 
            </div>
          </SwipeableViews >
        </div>

    );
  }
}

export default ContractCardDetail;