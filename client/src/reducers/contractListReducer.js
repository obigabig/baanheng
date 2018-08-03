import { FETCH_CONTRACTLIST, FETCH_CONTRACTLIST_LENGTH, CONTRACTLIST_ERROR } from '../actions/types';

const contractReducer = (state = {}, action) => {

    switch(action.type){
        case FETCH_CONTRACTLIST:
            return { ...state, data: action.payload };
        case FETCH_CONTRACTLIST_LENGTH:
            return { ...state, length: action.payload };
        case CONTRACTLIST_ERROR:
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
};

export default contractReducer;

