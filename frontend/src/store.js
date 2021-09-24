import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import { userDataReducers, authUserReducers } from "./reducers/userReducers";
import { sttReducers } from "./reducers/sttReducers";
import { toolListsReducers, toolListReducers, histsListsReducers } from "./reducers/toolReducers";
import { boardListsReducers } from "./reducers/boardReducers";

const inititalState = [];
const reducer = combineReducers({
    userData: userDataReducers,
    authUser: authUserReducers,
    sttData: sttReducers,
    toolLists: toolListsReducers,
    toolList: toolListReducers,
    histLists: histsListsReducers,
    boardLists: boardListsReducers
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, inititalState, composeEnhancer(applyMiddleware(thunk)));
export default store;