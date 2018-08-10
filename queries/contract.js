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
                    _id: action._id,
                    type : action.type,
                    description: action.description,
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

exports.getContractByValueRange = (id, value) => {
    if(value === "1")
        {
            return { 
                _createBy : id,
                value : { 
                    "$gte": 0,
                    "$lte": 500000 
                }
            }
        }
        else if(value === "2")
        {
            return { 
                _createBy : id,
                value : { 
                    "$gte": 500001,
                    "$lte": 1000000 
                }
            }
        }
        else if(value === "3")
        {
            return { 
                _createBy : id,
                value : { 
                    "$gte": 1000001,
                    "$lte": 2000000 
                }
            }
        }
        else if(value === "4")
        {
            return { 
                _createBy : id,
                value : { 
                    "$gte": 2000001
                }
            }
        }
        else{
            return { _createBy : id}
        }
}
