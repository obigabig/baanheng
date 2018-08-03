const Contract = require('../models/contract/contract');
const _ = require('lodash');
const moment = require('moment');
const upComingDayCount = 20;

exports.getUpcomingAction = (contract) => {
    if(contract.actions.length > 0){    
        const notCompletedActions = _(contract.actions).map(action => {
            const upComingDay = moment(action.dueDate, "DD/MM/YYYY").diff(moment(), 'days');
            if(!action.isCompleted  && upComingDay < upComingDayCount)
            {                
                return  { 
                    type : action.type,
                    period : action.period,
                    dueDate : action.dueDate,
                    isCompleted : action.isCompleted
                }
            }

            return undefined;
        })
        .compact()      
        .value();

        return _.minBy(notCompletedActions, action => { return action.dueDate })
    }
    return {}
}
