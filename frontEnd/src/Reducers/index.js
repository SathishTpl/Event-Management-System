import { combineReducers } from 'redux';

import usersReducers from './usersReducers';
import eventReducers from './eventReducers';

const reducers = combineReducers({ 
    users: usersReducers,
    events: eventReducers
})

export default reducers;