import React, { Component } from 'react'
import _ from 'lodash'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import requireAuth from '../../utils/requireAuth'
import { getContractListsAction} from '../../actions'

import DataNotFound from '../reactComponent/DataNotFound'
import Spinner from '../reactComponent/Spinner'
import Navbar from '../reactComponent/Navbar'
import FixButton from '../reactComponent/FixButton'
import ContractCard from './ContractCard'
import ContractFilter from './ContractFilter'
import ContractSort from './ContractSort'
import ContractPagination from './ContractPagination'


class ContractLists extends Component{

    constructor() {
        super();
        this.state = {
            isLoading: true,
            currentPage: 1,
            dataPerPage: 10,
            sort: { field: 'no', type: -1},
            filterStatus: '1',
            filterPact: '0,1,2',
            filterPropType: '0,1,2,3,4,5,6,7,8,9,10',
            filterValue: '0'
        }

        this.fetchContractLists = this.fetchContractLists.bind(this)
        /*this.handlePaginationClick = this.handlePaginationClick.bind(this)
        this.handlePaginationLeftClick = this.handlePaginationLeftClick.bind(this)
        this.handlePaginationRightClick = this.handlePaginationRightClick.bind(this)*/
    }

    componentDidMount() {
        this.fetchContractLists()  
    }

    fetchContractLists() {
        const {getContractListsAction} = this.props;
        const {
            currentPage, dataPerPage
            , sort
            , filterStatus
            , filterPact
            , filterPropType
            , filterValue
        } = this.state;

        this.setState({ isLoading: true }, () => {            
            getContractListsAction(
                (currentPage-1) * dataPerPage, 
                dataPerPage, 
                sort, 
                filterStatus,
                filterPact,
                filterPropType,
                filterValue,
                () => {                
                    this.setState({isLoading: false});
            });   
        });
    }

    

    renderCardLists() {
        const { contractsList } = this.props

        if(contractsList.data && contractsList.data.length > 0)
        {
            return _.map(this.props.contractsList.data, (contract) => {
                return <ContractCard key={contract.no} contract ={contract} />;
            })
        }

        return (
            <DataNotFound />
        )
    }

    render() {
        return (
            <div className="main-box">
                <div className="row">
                    <Navbar ActiveIndex="ContractLists"/>
                </div>
                <div className="row">
                    <div className="col s12 m4 l3" >
                        <ContractFilter 
                            updateContractList={(status, pact, propType, value) => {
                                this.setState({
                                        filterStatus: status,
                                        filterPact: pact,
                                        filterPropType: propType,
                                        filterValue: value
                                    }, () => {                                                    
                                    this.fetchContractLists()  
                                })                                     
                            }
                        }/>
                    </div>
                    <div className="col s12 m8 l9" >
                        <ContractSort 
                            updateContractList={(sort) => {
                                this.setState({
                                    sort
                                }, () => {                                                    
                                    this.fetchContractLists()  
                                })                                     
                            }
                        }/>
                        <div className="right-align red-text">  
                            {this.props.contractsList.errorMessage && <strong>{this.props.contractsList.errorMessage}</strong>}
                        </div>
                        {this.state.isLoading ? <Spinner/> : this.renderCardLists()} 
                        <ContractPagination 
                            contractsList = {this.props.contractsList}
                            dataPerPage={20}
                            updateContractList={(currentPage) => {
                                this.setState({
                                    currentPage
                                }, () => {                                                    
                                    this.fetchContractLists()
                                    window.scrollTo(0, 0)  
                                })                                     
                            }
                        }/>
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

