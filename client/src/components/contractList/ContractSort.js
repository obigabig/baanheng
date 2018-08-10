import React, { Component } from 'react'
import { SortList } from '../../const'
import _ from 'lodash'

class ContractFilter extends Component{
    constructor() {
        super();
        this.state = {
            sort: { field: 'no', type: -1},
        }
    }

    componentDidMount() {
        const {sort} = this.state;
        this.props.updateContractList(sort)    
    }

    renderSortIcon(value) {
        const {field , type} = this.state.sort;

        if(value === field && type === -1)
            return <i className="right material-icons">arrow_upward</i>
        else if (value === field && type === 1)
            return <i className="right material-icons">arrow_downward</i>

        return <i className="right material-icons"></i>
    }

    render(){
        const {sort} = this.state;
        const sortBy = (field) => {
            let sortType; 

            if (sort.field === field)
                sortType = sort.type * -1           
            else
                sortType = -1   

            this.setState({ 
                sort: {field: field, type: sortType }
            } , () => {            
                this.props.updateContractList(this.state.sort)     
            })     
        }

        return (
            <div> 
                <nav>
                    <div className="nav-wrapper  blue-grey lighten-2">
                        <div className="left" 
                            style={{paddingLeft: '15px', paddingRight: '15px'}}>
                            จัดเรียง: 
                        </div>
                        <ul id="nav-mobile" className="left hide-on-med-and-down">
                            { _.map(SortList, (sort) => {
                                    return (
                                        <li key={sort.value}>
                                            <a onClick={() => sortBy(sort.value)}>
                                                {sort.label}     
                                                {this.renderSortIcon(sort.value)}                                           
                                            </a>                                            
                                        </li>
                                    )
                            })}
                        </ul>
                    </div>
                </nav>
            </div>
        )   
    }
}

export default (ContractFilter);
