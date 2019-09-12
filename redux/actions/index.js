/* eslint-disable no-use-before-define */
// src/js/actions/index.js

// ----------------------------------------------------------------------------------
// Imports
// ----------------------------------------------------------------------------------
import axios from 'axios';

import {
  HANDLE_LOGIN, HANDLE_SIGNUP, HANDLE_LOGOUT, CONNECT_BANK,
  
  GET_BALANCE_AND_TRANSACTIONS, GET_BALANCE_GRAPH_DATA,
  
  HANDLE_ERROR, CLEAR_ERROR, LOAD_DATA, SET_ERROR,
  
  UPDATE_BIG_TRANSACTION_NOTIFICATION,
  UPDATE_MINIMUM_BALANCE_NOTIFICATION,
  UPDATE_OVERDRAFT_NOTIFICATION,
  
  ADD_BILL, ADD_GOAL_UPDATE_USER, FETCH_GOAL_UPDATE_USER,
  GET_USER
} from '../constants/action-types';

// const baseUrl = 'https://creditswagapi.herokuapp.com/';
const baseUrl = 'https://3165f7c5.ngrok.io/';

export const loadData = state => ({
  type: LOAD_DATA,
  payload: state,
});

export const getUser = () => async (dispatch) => {
  dispatch({
    type: GET_USER,
    payload: {
      user: res.data.user,
      goal: res.data.goal,
    },
  });
};

export const addGoal = (goalData, userId) => async (dispatch) => {  
  try {
    let res = await axios.post(`${baseUrl}addGoal`, { goalData, userId });    
    dispatch({
      type: ADD_GOAL_UPDATE_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: HANDLE_ERROR,
      payload: err
    });
  };
};

export const fetchGoal = (goal, userId, goalIndex) => async (dispatch) => {  
  try {
    let res = await axios.post(`${baseUrl}fetchGoal`, { goal, userId, goalIndex });    
    dispatch({
      type: FETCH_GOAL_UPDATE_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: HANDLE_ERROR,
      payload: err
    });
  };
};

export const addBill = (billData, userId) => async (dispatch) => {
  try {
    let res = await axios.post(`${baseUrl}addBill`, { billData, userId });    
    dispatch({
      type: ADD_BILL,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: HANDLE_ERROR,
      payload: err
    });
  };
};

export const bigTransactionNotification = (notificationOnOrOff, userId) => async (dispatch) => {
  try {
    let res = await axios.post(`${baseUrl}bigTransactionNotification`, { notificationOnOrOff, userId });  
    dispatch({
      type: UPDATE_BIG_TRANSACTION_NOTIFICATION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: HANDLE_ERROR,
      payload: err
    });
  };
};

export const minimumBalanceNotification = (notificationOnOrOff, userId) => async (dispatch) => {
  try {
    let res = await axios.post(`${baseUrl}minimumBalanceNotification`, { notificationOnOrOff, userId });  
    dispatch({
      type: UPDATE_MINIMUM_BALANCE_NOTIFICATION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: HANDLE_ERROR,
      payload: err
    });
  };
};

export const overdraftNotification = (notificationOnOrOff, userId) => async (dispatch) => {
  try {
    let res = await axios.post(`${baseUrl}overdraftNotification`, { notificationOnOrOff, userId });  
    dispatch({
      type: UPDATE_OVERDRAFT_NOTIFICATION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: HANDLE_ERROR,
      payload: err
    });
  };
};

// Public token isn't actually important it expires but we need to send it to getand savethe access token on User.
export const connectBank = (userId, public_token) => async (dispatch) => {
  try {
    const res = await axios.post(`${baseUrl}get_access_token`, { public_token, userId });
    if (res.status !== 200) {
      dispatch({
        type: HANDLE_ERROR,
        payload: "Please check your connection or close the app and restart.",
      });
    } else { // Success.
      dispatch({
        type: CONNECT_BANK,
        payload: public_token,
      });
    }
  } catch (error) {  
    dispatch({
      type: HANDLE_ERROR,
      payload: "Please check your connection or close the app and restart.",
    }); 
  }
};

export const getBalanceGraphData = userId => async (dispatch) => {
  const res = await axios.post(`${baseUrl}getBalanceGraphData`, { userId });
  dispatch({
    type: GET_BALANCE_GRAPH_DATA,
    payload: res.data,
  });
};

export const getTransactions = userId => async (dispatch) => {
  console.log('userId:', userId);  
  const res = await axios.post(`${baseUrl}transactions`, { userId });
  dispatch({
    type: GET_BALANCE_AND_TRANSACTIONS,    
    payload: res.data
  });
};

export const logIn = (loginState) => async (dispatch) => {
  try {
    res = await axios.post(`${baseUrl}login`, loginState);
    dispatch({
      type: HANDLE_LOGIN,
      payload: res.data.user,
    });
  } catch (err) {
    dispatch({
      type: HANDLE_ERROR,
      payload: true,
    });
  }
};

export const signUp = (signupState, notificationToken) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
  };
  const data = {...signupState, notificationToken}
  return async (dispatcher) => {
    try {
      const res = await axios.post(`${baseUrl}signup`, data, headers);
      if (res.status === 200) {
        dispatcher(handleSignup(res.data));
      } else {
        dispatcher(handleError(true));
      }
    } catch (err) {
      dispatcher(handleError(true));
    }
  };
};

export const handleSignup = user => ({  
  type: HANDLE_SIGNUP,
  payload: user,
});

export const logOut = () => (dispatcher) => {
  // axios.delete(`${baseUrl}logout`); No Need, I removed the cookies from ever even being set.
  dispatcher(handleLogout());
};

export const handleLogout = () => ({
  type: HANDLE_LOGOUT,
  payload: '',
});

export const handleError = error => ({
  type: HANDLE_ERROR,
  payload: error,
});

export const setError = () => async (dispatch) => {
  dispatch({
    type: SET_ERROR,    
    payload: true
  });
};

export const clearError = () => async (dispatch) => {  
  dispatch({
    type: CLEAR_ERROR,    
    payload: false
  });
};