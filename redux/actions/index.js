/* eslint-disable no-use-before-define */
// src/js/actions/index.js

// ----------------------------------------------------------------------------------
// Imports
// ----------------------------------------------------------------------------------
import axios from 'axios';
import {
  HANDLE_LOGIN, HANDLE_SIGNUP,
  HANDLE_LOGOUT,
  CONNECT_BANK,
  GET_BALANCE_AND_TRANSACTIONS,
  GET_BALANCE_GRAPH_DATA,
  HANDLE_ERROR, LOAD_DATA,
} from '../constants/action-types';

// const baseUrl = 'https://creditswagapi.herokuapp.com/';
const baseUrl = 'https://b0676446.ngrok.io/';

export const loadData = state => ({
  type: LOAD_DATA,
  payload: state,
});

export const getBalanceGraphData = userId => async (dispatch) => {
  const res = await axios.post(`${baseUrl}getBalanceGraphData`, { userId });
  dispatch({
    type: GET_BALANCE_GRAPH_DATA,
    payload: res.data,
  });
};

export const connectBank = (userId, public_token) => async (dispatch) => {
  await axios.post(`${baseUrl}get_access_token`, { public_token, userId });
  dispatch({
    type: CONNECT_BANK,
    payload: public_token,
  });
};

export const getTransactions = userId => async (dispatch) => {
  const res = await axios.post(`${baseUrl}transactions`, { userId });
  dispatch({
    type: GET_BALANCE_AND_TRANSACTIONS,
    payload: res.data.user,
  });
};

export function logIn(loginState) {
  return (dispatcher) => {
    try {
      axios.post(`${baseUrl}login`, loginState).then((res) => {
        dispatcher(handleLogin(res.data.user)); // THUNKED IT!
      }).catch(() => {
        dispatcher(handleError(true));
      });
    } catch (err) {
      dispatcher(handleError(true));
    }
  };
};

export const handleLogin = user => ({
  type: HANDLE_LOGIN,
  payload: user,
  payload_error: false,
});

export function signUp(signupState) {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
  };
  return async (dispatcher) => {
    try {
      const res = await axios.post(`${baseUrl}signup`, signupState, { headers });
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
