
import { FETCH_CONTRACT, CONTRACT_ERROR} from '../actions/types';

const contractReducer = (state = {}, action) => {

    switch(action.type){
        case FETCH_CONTRACT:     
            return { ...state, data: action.payload };
        case CONTRACT_ERROR:
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
};

export default contractReducer;

