import React, { Component } from 'react';
import _ from 'lodash';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import requireAuth from '../../utils/requireAuth';
import { getContractListsAction} from '../../actions';
import Spinner from '../reactComponent/Spinner'
import Navbar from '../reactComponent/Navbar';

import FixButton from '../reactComponent/FixButton';
import ContractCard from './ContractCard';

class ContractLists extends Component{

    constructor() {
        super();
        this.state = {
            isLoading: true,
            currentPage: 1,
            dataPerPage: 50
        };
        this.handlePaginationClick = this.handlePaginationClick.bind(this);
        this.handlePaginationLeftClick = this.handlePaginationLeftClick.bind(this);
        this.handlePaginationRightClick = this.handlePaginationRightClick.bind(this);
    }

    componentDidMount() {
        const {getContractListsAction} = this.props;
        const {currentPage, dataPerPage} = this.state;

        this.setState({
            isLoading: true
        });

        getContractListsAction((currentPage-1) * dataPerPage, dataPerPage, () => {
            this.setState({isLoading: false});
        });        
    }

    renderCardLists() {
        return _.map(this.props.contractsList.data, (contract) => {
            return <ContractCard key={contract.no} contract ={contract} />;
        });
    }

    handlePaginationClick(event) {
        const {getContractListsAction} = this.props;
        const {dataPerPage} = this.state;
        const newCurrentPage = Number(event.target.id);
        this.setState({
          currentPage: newCurrentPage,
          isLoading: true
        });
        
        getContractListsAction((newCurrentPage-1) * dataPerPage, dataPerPage, () => {
            this.setState({isLoading: false});
        });        
        window.scrollTo(0, 0)
    }

    handlePaginationLeftClick(event) {
        const {getContractListsAction} = this.props;
        const {currentPage, dataPerPage} = this.state;
        if(currentPage > 1)
        {
            const newCurrentPage = currentPage - 1;

            this.setState({
                currentPage: newCurrentPage,
                isLoading: true
            });

            getContractListsAction((newCurrentPage-1) * dataPerPage, dataPerPage, () => {
                this.setState({isLoading: false});
            });        
            window.scrollTo(0, 0)
        }
    }

    handlePaginationRightClick(event) {  
        const {getContractListsAction, contractsList} = this.props;
        const {currentPage, dataPerPage} = this.state;

        if(currentPage < Math.ceil(contractsList.length / dataPerPage))
        {  
            const newCurrentPage = currentPage + 1;    
            this.setState({
                currentPage: newCurrentPage,
                isLoading: true
            });
            getContractListsAction((newCurrentPage-1) * dataPerPage, dataPerPage, () => {
                this.setState({isLoading: false});
            });        
            window.scrollTo(0, 0)
        }
    }

    renderPagination(){
        const { contractsList } = this.props
        const { currentPage, dataPerPage } = this.state
        // Logic for displaying page numbers
        const pageNumbers = [];
        if(contractsList.length)
        {            
            for (let i = 1; i <= Math.ceil(contractsList.length / dataPerPage); i++) {
                pageNumbers.push(i);
            }
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    className={ number === currentPage ? "active" : "waves-effect"}
                    key={number}           
                >
                    <a 
                        id={number}
                        onClick={this.handlePaginationClick}
                    >
                        {number} 
                    </a>
                </li>
            );
        });

        return (
            <div className = "row center-align">  
                <ul className="pagination">
                    <li 
                        className={currentPage === 1 ? "disabled" : "waves-effect"}>
                        <a onClick={this.handlePaginationLeftClick}>
                            <i className="material-icons">chevron_left</i>
                        </a>
                    </li>
                    {renderPageNumbers}
                    <li 
                        className={currentPage === pageNumbers.length ? "disabled" : "waves-effect"}>
                        <a onClick={this.handlePaginationRightClick}><i className="material-icons">chevron_right</i></a></li>
                </ul>     
            </div>
        )  
    }

    render() {
        const { isLoading } = this.state;

        return (
            <div className="main-box">
                <div className="row">
                    <Navbar ActiveIndex="ContractLists"/>
                </div>
                <div className="row">
                    <div className="col s12 m4 l3">Filter component</div>
                    <div className="col s12 m8 l9" style={{background:'#faf8f8'}}>
                        <div>
                            Sort component
                        </div>
                        <div className="right-align red-text">  
                            {this.props.contractsList.errorMessage && <strong>{this.props.contractsList.errorMessage}</strong>}
                        </div>
                        {isLoading ? <Spinner /> : this.renderCardLists()} 
                        {this.renderPagination()}
                    </div>
                </div>   
                <FixButton link="/Contract"> </FixButton>
            </div>
        );
    }
}

function mapStateToProps({ contractsList }){
    return { contractsList };
}

export default 
compose(
    connect(mapStateToProps, {getContractListsAction}),
    withRouter,
    requireAuth
) (ContractLists);

