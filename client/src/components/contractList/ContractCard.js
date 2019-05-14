import React, { Component } from 'react'
import _ from 'lodash';
import moment from 'moment';
//import ContractCardMobile from './ContractCardMobile'
import ContractCardDesktop from './ContractCardDesktop'
import '../../css/contractCard.css'

class ContractCard extends Component{
    
    render() {
        const {contract, selectedContractNo, setSelectedContractNo} = this.props;
        const upComingAction = getUpComingAction(contract);

        return (
            <div>
                <div className=".show-on-large">
                    <ContractCardDesktop 
                      contract={contract} 
                      upComingAction={upComingAction}                       
                      selectedContractNo={selectedContractNo} 
                      setSelectedContractNo={setSelectedContractNo}
                    />                
                </div>
            </div>
        );
    }
}

const getUpComingAction = (contract) => {
    if (contract.actions.length > 0) {
      const notCompletedActions = _(contract.actions)
        .map(action => {
          if (!action.isCompleted)
            return {
              type: action.type,
              description: action.description,
              dueDate: moment(action.dueDate, 'DD/MM/YYYY'),
              isCompleted: action.isCompleted,
              upComingDay: 0
            };
          return undefined;
        })
        .compact()
        .value();

      return _.minBy(notCompletedActions, action => {
        return action.dueDate;
      });
    }

    return {};
  }

export default ContractCard;