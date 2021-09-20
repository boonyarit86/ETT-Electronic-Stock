import {
  CREATE_TOOL_REQUEST,
  CREATE_TOOL_SUCCESS,
  CREATE_TOOL_FAIL,
  GET_ALL_TOOL_SUCCESS,
  GET_ALL_TOOL_FAIL,
  GET_ALL_TOOL_REQUEST,
  ACTION_TOOL_REQUEST,
  ACTION_TOOL_SUCCESS,
  ACTION_TOOL_FAIL,
  GET_TOOL_REQUEST,
  GET_TOOL_SUCCESS,
  GET_TOOL_FAIL,
  EDIT_TOOL_REQUEST,
  EDIT_TOOL_SUCCESS,
  EDIT_TOOL_FAIL,
  DELETE_TOOL_REQUEST,
  DELETE_TOOL_SUCCESS,
  DELETE_TOOL_FAIL,
} from "../constants/toolConstants";

const initialState = {
  errorMsg: null,
};

export function toolListsReducers(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TOOL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_TOOL_REQUEST:
    case ACTION_TOOL_REQUEST:
      return {
        ...state,
        isLoadingActions: true,
      };
    case GET_ALL_TOOL_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case CREATE_TOOL_SUCCESS:
    case ACTION_TOOL_SUCCESS:
      return {
        ...state,
        isLoadingActions: false,
        errorMsgActions: null,
      };
    case GET_ALL_TOOL_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
      };
    case CREATE_TOOL_FAIL:
    case ACTION_TOOL_FAIL:
      return {
        ...state,
        isLoadingActions: false,
        errorMsgActions: action.payload,
      };
    default:
      return state;
  }
}

export function toolListReducers(state = {}, action) {
  switch (action.type) {
    case GET_TOOL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case EDIT_TOOL_REQUEST:
      return {
        ...state,
        isLoadingEdit: true,
      };
    case DELETE_TOOL_REQUEST:
      return {
        ...state,
        isLoadingDelete: true,
      };
    case GET_TOOL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tool: action.payload,
      };
    case EDIT_TOOL_SUCCESS:
      return {
        ...state,
        isLoadingEdit: false,
        tool: action.payload,
      };
    case DELETE_TOOL_SUCCESS:
      return {
        ...state,
        isLoadingDelete: false,
      };
    case GET_TOOL_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
      };
    case EDIT_TOOL_FAIL:
      return {
        ...state,
        isLoadingEdit: false,
        errorMsgEdit: action.payload,
      };
    case DELETE_TOOL_FAIL:
      return {
        ...state,
        isLoadingDelete: false,
        errorMsgDelete: action.payload,
      };
    default:
      return state;
  }
}
