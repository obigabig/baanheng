import React, { Component } from 'react'
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import { ContractStatusValue } from '../../const';
import ContractCardMobileDetail from './ContractCardMobileDetail(NotUsed)'

class ContractCardMobile extends Component {
    state = {
        view: 'detail'
    };

    getUpComingAction(contract) {
        if(contract.actions.length > 0){    
    
           const notCompletedActions = _(contract.actions)
            .map(action => {
                if(!action.isCompleted)
                    return  { 
                        type : action.type,
                        description: action.description,
                        dueDate : moment(action.dueDate, "DD/MM/YYYY"),
                        isCompleted : action.isCompleted,
                        upComingDay: 0
                    }
                return undefined;
            })
            .compact()      
            .value();
    
            return _.minBy(notCompletedActions, action => { return action.dueDate })
        }
    
        return { }
    }
    
    upComingTextColor(upComongDays) {
        if(upComongDays <= 10)
            return "red-text darken-4";
        else if(upComongDays <= 20)
            return "green-text darken-4";
    
        return "green-text darken-4";
    }
    
    renderUpComingAction (upComingAction) {
            return (         
                <Link to="/" 
                    className={`${this.upComingTextColor(upComingAction.upComingDay)}`}
                    style={{marginRight:'0px'}}>
                    <strong>
                    {upComingAction.type && 
                    `${upComingAction.description} : ` +
                    `${moment(upComingAction.dueDate).format("DD/MM/YYYY")}` +
                    ` (${upComingAction.upComingDay} วัน)`  
                    }  
                    </strong>
                </Link>
            );
    }
        
    renderCardAction (contract){
        const upComingAction = this.getUpComingAction(contract);
        if(!_.isEmpty(upComingAction)){
    
            upComingAction.upComingDay = moment(upComingAction.dueDate, "DD/MM/YYYY").diff(moment(), 'days');
    
            return (
                <div className="card-action">
                    {this.renderUpComingAction(upComingAction)}
                </div>
            );
        }
        return;
    }
    
    cardStyle(contract) {
        if(contract.status === ContractStatusValue.new)
            return "color-new"
        else if(contract.status === ContractStatusValue.ongoing)
            return "color-ongoing"
        else if(contract.status === ContractStatusValue.break)
            return "color-break"
         
        //End
        return "color-end";
    }

    render() {
        const { contract } = this.props

        return (
            <div className="row">
                <div className="col s12 mobile-box">
                    <div className={`card hoverable contractCard ${this.cardStyle(contract)}`}>                        
                        <div className="card-content">
                            <span className="card-title contractCard-title truncate">     
                                <Link to={`/Contract/${contract.no}`}>                           
                                    <div className="col s10 m11 truncate">
                                        <span className="blue-text darken-4">{`#${contract.no} : `} </span> 
                                        <span className="blue-text darken-4"> {`${contract.title}`} </span> 
                                    </div>  
                                    <div className="col s2 m1"> 
                                        <i className="material-icons right blue-grey-text darken-4">edit</i>
                                    </div>    
                                </Link>                        
                            </span>
                            <ContractCardMobileDetail contract={contract}/>                             
                        </div>                        
                        {this.renderCardAction(contract)}                          
                        
                    </div>
                </div>             
            </div>
        )
    }
}

export default withRouter(ContractCardMobile)