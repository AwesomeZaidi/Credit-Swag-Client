// src/js/actions/index.js

// ----------------------------------------------------------------------------------
// Imports
// ----------------------------------------------------------------------------------
import { HANDLE_LOGIN, HANDLE_SIGNUP, HANDLE_LOGOUT,
    HANDLE_ERROR, LOAD_DATA } from "../constants/action-types";
import axios from "axios";

const baseUrl = 'http://localhost:5000/';

export const loadData = (state) => {
    return {
        type: LOAD_DATA,
        payload: state
    };
};

export function login(loginState) {
    return (dispatcher) => {
        try {
            axios.post(`${baseUrl}login`, loginState).then((res) => {
                dispatcher(handleLogin(res.data.user)); // THUNKED IT!
            }).catch((err) => {
                dispatcher(handleError(true));
            });
        } catch(err){
            console.log(err);  
            dispatcher(handleError(true));
        }
    };
};

export const handleLogin = (user) => {
    return {
        type: HANDLE_LOGIN,
        payload: user,
        payload_error: false
    };
};

export function signUp(signupState) {
    console.log('signupState:', signupState);
    console.log('in action');
    return async (dispatcher) => {
        console.log('1');
        try {
            console.log('2');
            const res = await axios.post(`${baseUrl}signup`, signupState);
            console.log('res:', res);
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

// connect the logout later.
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
