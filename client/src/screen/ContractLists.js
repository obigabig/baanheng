import React, { Component } from 'react';
import _ from 'lodash';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import requireAuth from '../utils/requireAuth';
import { getContractListsAction, menuClicked } from '../actions';

import DataNotFound from '../components/reactComponent/DataNotFound';
import Spinner from '../components/reactComponent/Spinner';
import FixButton from '../components/reactComponent/FixButton';
import ContractCard from '../components/contractList/ContractCard';
import ContractFilter from '../components/contractList/ContractFilter';
import ContractFilterMobile from '../components/contractList/ContractFilterMobile';
import ContractSort from '../components/contractList/ContractSort';
import ContractPagination from '../components/contractList/ContractPagination';

class ContractLists extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      selectedContractNo: null,
      currentPage: 1,
      dataPerPage: 30,
      sort: { field: 'no', type: -1 },
      filterNo: '',
      filterTitle: '',
      filterStatus: '0,1,2,3',
      filterPact: '0,1,2',
      filterPropType: '0,1,2,3,4,5,6,7,8,9,10',
      filterValue: '0'
    };

    this.fetchContractLists = this.fetchContractLists.bind(this);
    this.renderMainData = this.renderMainData.bind(this);
    this.renderCardLists = this.renderCardLists.bind(this);
  }

  componentDidMount() {
    this.props.menuClicked('ContractLists')
    this.fetchContractLists();
  }

  fetchContractLists() {
    const { getContractListsAction } = this.props;
    const {
      currentPage,
      dataPerPage,
      sort,
      filterNo,
      filterTitle,
      filterStatus,
      filterPact,
      filterPropType,
      filterValue
    } = this.state;

    this.setState({ isLoading: true }, () => {
      getContractListsAction(
        (currentPage - 1) * dataPerPage,
        dataPerPage,
        sort,
        filterNo,
        filterTitle,
        filterStatus,
        filterPact,
        filterPropType,
        filterValue,
        () => {
          this.setState({ isLoading: false });
        }
      );
    });
  }

  renderTotalCardNumber() {
    const { contractsList } = this.props;
    if (contractsList.length && contractsList.length > 0) {
      return (
        <div
          className="center-align grey-text"
          style={{
            marginTop: '10px',
            fontStyle: 'italic',
            fontSize: 'small'
          }}
        >
          ผลลัพธ์ทั้งหมด {contractsList.length} รายการ
        </div>
      );
    }
    return '';
  }

  renderFilterComponent() {
    const pc = (
      <div className="hide-on-med-and-down">
        <ContractFilter
          updateContractList={(no, title, status, pact, propType, value) => {
            this.setState(
              {
                filterNo: no,
                filterTitle: title,
                filterStatus: status,
                filterPact: pact,
                filterPropType: propType,
                filterValue: value
              },
              () => {
                this.fetchContractLists();
              }
            );
          }}
        />
      </div>
    );
    const mobileAndTablet = (
      <div className="hide-on-large-only">
        <ContractFilterMobile
          updateContractList={(no, title, status, pact, propType, value) => {
            this.setState(
              {
                filterNo: no,
                filterTitle: title,
                filterStatus: status,
                filterPact: pact,
                filterPropType: propType,
                filterValue: value
              },
              () => {
                this.fetchContractLists();
              }
            );
          }}
        />
      </div>
    );

    return (
      <div>
        {pc}
        {mobileAndTablet}
      </div>
    );
  }

  renderCardLists() {
    const { contractsList } = this.props;
    const { selectedContractNo } = this.state;

    if (contractsList.data && contractsList.data.length > 0) {
      return _.map(this.props.contractsList.data, contract => {
        return <ContractCard 
                    key={contract.no} 
                    contract={contract}
                    selectedContractNo={selectedContractNo} 
                    setSelectedContractNo={(contractNo) => {
                      if(contractNo === selectedContractNo)
                        this.setState({selectedContractNo : null})
                      else
                        this.setState({selectedContractNo : contractNo})
                    }}
                      
                />;
      });
    }

    return <DataNotFound />;
  }

  renderMainData() {
    const { isLoading } = this.state;
    if (isLoading) return <Spinner />;

    return (
      <div>
        <div className="right-align red-text">
          {this.props.contractsList.errorMessage && (
            <strong>{this.props.contractsList.errorMessage}</strong>
          )}
        </div>
        {this.renderTotalCardNumber()}
        {this.renderCardLists()}
        <ContractPagination
          contractsList={this.props.contractsList}
          dataPerPage={this.state.dataPerPage}
          updateContractList={currentPage => {
            this.setState(
              {
                currentPage
              },
              () => {
                this.fetchContractLists();
                window.scrollTo(0, 0);
              }
            );
          }}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="main-box">
        <div className="row">
          <div className="col s12 m4 l3">{this.renderFilterComponent()}</div>
          <div className="col s12 m8 l9">
            <ContractSort
              updateContractList={sort => {
                this.setState(
                  {
                    sort
                  },
                  () => {
                    this.fetchContractLists();
                  }
                );
              }}
            />
            {this.renderMainData()}
          </div>
        </div>
        <FixButton link="/Contract"> </FixButton>
      </div>
    );
  }
}

function mapStateToProps({ contractsList }) {
  return { contractsList };
}

export default compose(
  connect(
    mapStateToProps,
    { getContractListsAction, menuClicked }
  ),
  withRouter,
  requireAuth
)(ContractLists);
