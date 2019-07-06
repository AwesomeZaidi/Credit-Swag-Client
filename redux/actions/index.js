// src/js/actions/index.js

// ----------------------------------------------------------------------------------
// Imports
// ----------------------------------------------------------------------------------
import { HANDLE_LOGIN, HANDLE_SIGNUP, HANDLE_LOGOUT,
    HANDLE_ERROR, LOAD_DATA } from "../constants/action-types";
import axios from "axios";

const baseUrl = 'https://digitalmenu-intensive.herokuapp.com/';

export const loadData = (state) => {
    return {
        type: LOAD_DATA,
        payload: state
    };
};

export function login(loginState) {
    return (dispatcher) => {
        axios.post(`${baseUrl}users/v0/login`, loginState).then((res) => {
            dispatcher(handleLogin(res.data.user)); // THUNKED IT!
        }).catch((err) => {
            dispatcher(handleError(true));
        });
    };
};

export const handleLogin = (user) => {
    return {
        type: HANDLE_LOGIN,
        payload: user,
        payload_error: false
    };
};

export function signUp (signupState) {
    return async (dispatcher) => {
        const res = await axios.post(`${baseUrl}users/v0/signup`, signupState)
        if (res.status === 200) {
            dispatcher(handleSignup(res.data));
        } else {
            dispatcher(handleError(true));
        }
    };
};

export const handleSignup = (user) => {
    return {
        type: HANDLE_SIGNUP,
        payload: user
    };
};

export const logout = () => {
    return (dispatcher) => {
        dispatcher(handleLogout());
    }
};

export const handleLogout = () => {
    return {
        type: HANDLE_LOGOUT,
        payload: ""
    };
};

export const handleError = (error) => {
    return {
        type: HANDLE_ERROR,
        payload: error
    };
};
