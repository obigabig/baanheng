import React, { Component } from 'react'

class ContractPagination extends Component{
    constructor() {
        super();
        this.state = {
            curPage: 1
        }
        console.log('ContractPagination constructor')
        this.handlePaginationClick = this.handlePaginationClick.bind(this)
        this.handlePaginationLeftClick = this.handlePaginationLeftClick.bind(this)
        this.handlePaginationRightClick = this.handlePaginationRightClick.bind(this)
    }

    componentDidMount() {
       /* const {sort} = this.state;
        this.props.updateContractList(sort)    */
        this.props.currentPage !== undefined ? this.setState({curPage : this.props.currentPage}) : this.setState({curPage : 1})
    }

    handlePaginationClick(event) {
        const newcurPage = Number(event.target.id);

        this.setState({
          curPage: newcurPage
        }, () => {
            this.props.updateContractList(this.state.curPage)  
        });
    }

    handlePaginationLeftClick(event) {
        const {curPage} = this.state;
        if(curPage > 1)
        {
            const newcurPage = curPage - 1;

            this.setState({
                curPage: newcurPage
            }, () => {
                this.props.updateContractList(this.state.curPage)                 
            })
        }
    }

    handlePaginationRightClick(event) {  
        const {contractsList, dataPerPage} = this.props;
        const {curPage} = this.state;

        if(curPage < Math.ceil(contractsList.length / dataPerPage))
        {  
            const newcurPage = curPage + 1;    
            this.setState({
                curPage: newcurPage,
            }, () => {
                this.props.updateContractList(this.state.curPage) 
            })
        }
    }

    renderPageNumbers = pageNumbers => pageNumbers.map(number => {
        
        return (
            <li
                className={ number === this.state.curPage ? "active" : "waves-effect"}
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

    render(){
        const { contractsList, dataPerPage } = this.props
        const { curPage } = this.state
        console.log('renderPageNumbers >>> ' , this.state)
        // Logic for displaying page numbers
        const pageNumbers = [];
        if(contractsList.length)
        {        
            for (let i = 1; i <= Math.ceil(contractsList.length / dataPerPage); i++) {
                pageNumbers.push(i);
            }
        }

        return (
            <div className = "row center-align">  
                <ul className="pagination">
                    <li 
                        className={curPage === 1 ? "disabled" : "waves-effect"}>
                        <a onClick={this.handlePaginationLeftClick}>
                            <i className="material-icons">chevron_left</i>
                        </a>
                    </li>
                    {this.renderPageNumbers(pageNumbers)}
                    <li 
                        className={curPage === pageNumbers.length ? "disabled" : "waves-effect"}>
                        <a onClick={this.handlePaginationRightClick}><i className="material-icons">chevron_right</i></a></li>
                </ul>     
            </div>
        )  
    }
}

export default (ContractPagination);
