import React, { Component } from 'react';

class ReportMenu extends Component {
  state = {
    actiiveItem: 'InvestRaio'
  };

  render() {
    const { actiiveItem } = this.state;

    return (
      <div className="collection">
        <a
          href="#!"
          className={`collection-item ${
            actiiveItem === 'InvestRaio' ? 'active' : ''
          }`}
        >
          <div className="valign-wrapper">
            <i className="material-icons">pie_chart</i>
            <p>&nbsp;สัดส่วนการลงทุน</p>
          </div>
        </a>
        <a
          href="#!"
          className={`collection-item ${
            actiiveItem === 'BreakContractSummary' ? 'active' : ''
          }`}
        >
          ยอดทรัพย์หลุด
          <br />
          (Comming Soon)
        </a>
        <a
          href="#!"
          className={`collection-item ${
            actiiveItem === 'EstimateTotalIncome' ? 'active' : ''
          }`}
        >
          รายการไถ่ถอน
          <br />
          (Comming Soon)
        </a>
        <a
          href="#!"
          className={`collection-item ${
            actiiveItem === 'EstimateTotalInterest' ? 'active' : ''
          }`}
        >
          ประมาณการดอกเบี้ย
          <br />
          (Comming Soon)
        </a>
        <a
          href="#!"
          className={`collection-item ${
            actiiveItem === 'EstimateTotalCommission' ? 'active' : ''
          }`}
        >
          ประมาณการค่านายหน้า
          <br />
          (Comming Soon)
        </a>
      </div>
    );
  }
}

export default ReportMenu;
