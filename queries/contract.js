const Contract = require('../models/contract/contract');
const _ = require('lodash');
const moment = require('moment');
const upComingDayCount = 20;

exports.getUpcomingAction = (contract) => {
    if(contract.actions.length > 0){    
        const notCompletedActions = _(contract.actions).map(action => {
            const upComingDay = moment(action.dueDate, "DD/MM/YYYY").diff(moment().startOf('day'), 'days');

            if(!action.isCompleted  && upComingDay < upComingDayCount)
            {                
                return  { 
                    _id: action._id,
                    type : action.type,
                    description: action.description,
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

exports.getFilterContractQuery = (email, no, title, value) => {
    let where = {}
    //Userid
    where._createBy = email
    //Contract no    
    if(no !== ''){
        where.no = no
    }
    //Contract title
    if(title !== ''){
        where.title =  new RegExp(title, 'i')
    }
    //Contract Value
    if(value === "1")
        {
            where.value = {                
                "$gte": 0,
                "$lte": 500000 
            }
        }
        else if(value === "2")
        {
            where.value = {                
                "$gte": 500001,
                "$lte": 1000000 
            }
        }
        else if(value === "3")
        {
            where.value = {    
                "$gte": 1000001,
                "$lte": 2000000 
            }
        }
        else if(value === "4")
        {
            where.value = {    
                "$gte": 2000001
            }
        }

        return where
}
