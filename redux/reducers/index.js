// src/redux/reducers/index.js

// ----------------------------------------------------------------------------------
// Imports
// ----------------------------------------------------------------------------------
import { HANDLE_LOGIN, HANDLE_SIGNUP, HANDLE_ERROR,
        HANDLE_LOGOUT, LOAD_DATA, CONNECT_BANK, GET_BALANCE_AND_TRANSACTIONS,
} from "../constants/action-types";

import { AsyncStorage } from 'react-native';

const initialState = {
  user: "",
  error: false
};

function rootReducer(state = initialState, action) {
  switch(action.type) {
    case LOAD_DATA:
      return action.payload
    case HANDLE_LOGIN:
      return {...state, user: action.payload}
    case HANDLE_SIGNUP:
      return {...state, user: action.payload, error: false}
    case HANDLE_ERROR:
      return {...state, error: action.payload}
    case CONNECT_BANK:
      let updatedUser = state.user;
      updatedUser.public_key = action.payload
      return {...state, user: updatedUser}
    case GET_BALANCE_AND_TRANSACTIONS:
      return {...state, user: action.payload}
    case HANDLE_LOGOUT:
      AsyncStorage.clear();
      return {...state, user: "", error: false}
    default: 
        return state;
  }
};

export default rootReducer;