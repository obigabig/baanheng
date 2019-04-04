import { MIGRATE, MIGRATE_ERROR } from '../actions/types';

const reportReducer = (state = {}, action) => {

    switch(action.type){
        case MIGRATE:
            return { ...state, status: 'Complete.' };
        case MIGRATE_ERROR:
            return { ...state, status: 'Fail.', errorMessage: action.payload };
        default:
            return state;
    }
};

export default reportReducer;

