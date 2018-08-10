import { FETCH_USER, FETCH_USER_ERROR } from '../actions/types';

const userReducer = (state = {}, action) => {
    switch(action.type){
        case FETCH_USER:
            return action.payload;
        case FETCH_USER_ERROR:
            console.log(action.payload)
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
};

export default userReducer;

