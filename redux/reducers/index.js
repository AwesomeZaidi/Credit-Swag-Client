// src/redux/reducers/index.js

// ----------------------------------------------------------------------------------
// Imports
// ----------------------------------------------------------------------------------
import { HANDLE_LOGIN, HANDLE_SIGNUP, HANDLE_ERROR,
        HANDLE_LOGOUT, LOAD_DATA, CONNECT_BANK,
        GET_BALANCE_AND_TRANSACTIONS, GET_BALANCE_GRAPH_DATA,
        UPDATE_OVERDRAFT_NOTIFICATION,
        UPDATE_MINIMUM_BALANCE_NOTIFICATION,
        UPDATE_BIG_TRANSACTION_NOTIFICATION, 
        ADD_BILL
} from "../constants/action-types";

import { AsyncStorage } from 'react-native';

const initialState = {
  user: false,
  error: false,
  balanceGraphData: false,
  bills: []
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
    case GET_BALANCE_GRAPH_DATA:
        return {...state, balanceGraphData: action.payload}
    case UPDATE_OVERDRAFT_NOTIFICATION:
        let userUpdatedOverdraftNotification = state.user; 
        userUpdatedOverdraftNotification.overdraftNotification = action.payload;
        return {...state, user: userUpdatedOverdraftNotification}
    case UPDATE_MINIMUM_BALANCE_NOTIFICATION:
        let userUpdatedMinimumBalanceNotification = state.user; 
        userUpdatedMinimumBalanceNotification.minimumBalanceNotification = action.payload;
        return {...state, user: userUpdatedMinimumBalanceNotification}
    case UPDATE_BIG_TRANSACTION_NOTIFICATION:
        let userUpdatedBigTransactionNotificationn = state.user; 
        userUpdatedBigTransactionNotification.bigTransactionNotification = action.payload;
        return {...state, user: userUpdatedBigTransactionNotification}
    case ADD_BILL:  
        state.bills.push(action.payload);
        return {...state, bills: state.bills, error: false}
    case HANDLE_LOGOUT:
      AsyncStorage.clear(); 
      return {...state, user: false, error: false, balanceGraphData: false, bills: []}
    default: 
        return state;
  }
};

export default rootReducer;