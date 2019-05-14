import axios from 'axios';
import { MIGRATE, MIGRATE_ERROR } from './types';

export const migrateSQL2MongoAction = callback => async dispatch => {
  try {
    let resUser = await axios.get('/api/current-user');
    dispatch({ type: MIGRATE, payload: resUser.data });
    callback();
  } catch (err) {
    console.log(err);
    dispatch({ type: MIGRATE_ERROR, payload: err });
  }
};

