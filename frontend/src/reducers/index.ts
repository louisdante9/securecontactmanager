import { combineReducers } from "redux";

import setCurrentUser from './setCurrentUser'
import contacts from './contacts'

const rootReducer = combineReducers({
    setCurrentUser,
    contacts
})

export default rootReducer;         