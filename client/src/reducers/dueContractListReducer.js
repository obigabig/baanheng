import { FETCH_DUE_CONTRACTLIST, DUE_CONTRACTLIST_ERROR } from '../actions/types';

const dueContractListReducer = (state = {}, action) => {

    switch(action.type){
        case FETCH_DUE_CONTRACTLIST:
            return { data: action.payload };
        case DUE_CONTRACTLIST_ERROR:
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
};

export default dueContractListReducer;

