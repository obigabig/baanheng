import { MENU } from './types';

export const menuClicked = menu => async dispatch => {
  dispatch({ type: MENU, payload: menu });
};
