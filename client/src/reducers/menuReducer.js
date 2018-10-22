import { MENU } from '../actions/types';

const menuReducer = (state = {}, action) => {
    switch(action.type){
        case MENU:
            return { clickedMenu: action.payload };
        default:
            return state;
    }
};

export default menuReducer;

