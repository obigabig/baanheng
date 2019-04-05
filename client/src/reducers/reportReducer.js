import { FETCH_INVESTOR_RATIO, FETCH_INVESTOR_RATIO_ERROR } from '../actions/types';

const reportReducer = (state = {}, action) => {

    switch(action.type){
        case FETCH_INVESTOR_RATIO:
            return { investorRatio: action.payload };
        case FETCH_INVESTOR_RATIO_ERROR:
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
};

export default reportReducer;

