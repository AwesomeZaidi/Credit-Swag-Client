// src/redux/reducers/index.js

// ----------------------------------------------------------------------------------
// Imports
// ----------------------------------------------------------------------------------
import { HANDLE_LOGIN, HANDLE_SIGNUP, HANDLE_ERROR, CLEAR_ERROR,
        HANDLE_LOGOUT, LOAD_DATA, CONNECT_BANK,
        GET_BALANCE_AND_TRANSACTIONS, GET_BALANCE_GRAPH_DATA,
        UPDATE_OVERDRAFT_NOTIFICATION,
        UPDATE_MINIMUM_BALANCE_NOTIFICATION,
        UPDATE_BIG_TRANSACTION_NOTIFICATION, 
        ADD_BILL, ADD_GOAL_UPDATE_USER, FETCH_GOAL_UPDATE_USER,
        GET_USER, SET_ERROR
} from "../constants/action-types";

import { AsyncStorage } from 'react-native';

const initialState = {
  user: false,
  error: false,
  balanceGraphData: [],
  bills: [],
  goals: [],
  goal: {}
};

function rootReducer(state = initialState, action) {
  switch(action.type) {
    case LOAD_DATA:
      return action.payload
    case HANDLE_LOGIN: 
      return {...state, user: action.payload, error: false}
    case HANDLE_SIGNUP:    
      return {...state, user: action.payload, error: false}
    case HANDLE_ERROR:
      return {...state, error: action.payload}
    case CLEAR_ERROR:
        return {...state, error: false}
    case SET_ERROR:
      return {...state, error: true}
    case CONNECT_BANK:
      let updatedUser = state.user;
      updatedUser.public_key = action.payload
      return {...state, user: updatedUser, error: false}
    case GET_BALANCE_AND_TRANSACTIONS:
      if (action.payload.balances) {
        return {...state, user: action.payload.user, balanceGraphData: action.payload.balances, error: false}
      } else {
        return {...state, user: action.payload.user, error: false}
      }
    case GET_BALANCE_GRAPH_DATA:
      return {...state, balanceGraphData: action.payload, error: false}
    case UPDATE_OVERDRAFT_NOTIFICATION:
      let userUpdatedOverdraftNotification = state.user; 
      userUpdatedOverdraftNotification.overdraftNotification = action.payload;
      return {...state, user: userUpdatedOverdraftNotification, error: false}
    case UPDATE_MINIMUM_BALANCE_NOTIFICATION:
      let userUpdatedMinimumBalanceNotification = state.user; 
      userUpdatedMinimumBalanceNotification.minimumBalanceNotification = action.payload;
      return {...state, user: userUpdatedMinimumBalanceNotification, error: false}
    case UPDATE_BIG_TRANSACTION_NOTIFICATION:
      let userUpdatedBigTransactionNotification = state.user; 
      userUpdatedBigTransactionNotification.bigTransactionNotification = action.payload;
      return {...state, user: userUpdatedBigTransactionNotification, error: false}
    case ADD_BILL:
      state.bills.push(action.payload);
      console.log('bill added');      
      return {...state, bills: state.bills, error: false}
    case ADD_GOAL_UPDATE_USER:
      state.goals.push(action.payload.goal);
      return {...state, goals: state.goals, user: action.payload.user, error: false}
      case FETCH_GOAL_UPDATE_USER:
          return {...state, user: action.payload, error: false}
    case GET_USER:
      return {...state, user: state.user, error: false}
    case HANDLE_LOGOUT:
      AsyncStorage.clear(); 
      return {...state, user: false, error: false, balanceGraphData: false, bills: [], goal: {}, goals: []}
    default: 
        return state;
  }
};

export default rootReducer;