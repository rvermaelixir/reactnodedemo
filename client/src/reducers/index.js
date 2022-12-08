import { combineReducers } from "redux";
import alert from './alert.js'
import auth from './auth'
export default combineReducers({
    alert,
    auth
});