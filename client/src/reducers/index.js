
import { combineReducers } from "redux";
import logReducer from './isLogged';
import userReducer from "./user";

const reducers = combineReducers({
    isLogged: logReducer,
    user: userReducer
});

export default reducers;