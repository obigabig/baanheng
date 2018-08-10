import React, { Component } from 'react'

class ContractPagination extends Component{
    constructor() {
        super();
        this.state = {
            currentPage: 1
        }

        this.handlePaginationClick = this.handlePaginationClick.bind(this)
        this.handlePaginationLeftClick = this.handlePaginationLeftClick.bind(this)
        this.handlePaginationRightClick = this.handlePaginationRightClick.bind(this)
    }

    componentDidMount() {
       /* const {sort} = this.state;
        this.props.updateContractList(sort)    */
    }

    handlePaginationClick(event) {
        const newCurrentPage = Number(event.target.id);

        this.setState({
          currentPage: newCurrentPage
        }, () => {
            this.props.updateContractList(this.state.currentPage)  
        });
    }

    handlePaginationLeftClick(event) {
        const {currentPage} = this.state;
        if(currentPage > 1)
        {
            const newCurrentPage = currentPage - 1;

            this.setState({
                currentPage: newCurrentPage
            }, () => {
                this.props.updateContractList(this.state.currentPage)                 
            })
        }
    }

    handlePaginationRightClick(event) {  
        const {contractsList, dataPerPage} = this.props;
        const {currentPage} = this.state;

        if(currentPage < Math.ceil(contractsList.length / dataPerPage))
        {  
            const newCurrentPage = currentPage + 1;    
            this.setState({
                currentPage: newCurrentPage,
            }, () => {
                this.props.updateContractList(this.state.currentPage) 
            })
        }
    }


    render(){
        const { contractsList, dataPerPage } = this.props
        const { currentPage } = this.state
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
}

export default (ContractPagination);
