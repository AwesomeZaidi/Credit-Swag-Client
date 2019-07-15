// src/js/actions/index.js

// ----------------------------------------------------------------------------------
// Imports
// ----------------------------------------------------------------------------------
import {
    HANDLE_LOGIN, HANDLE_SIGNUP,
    HANDLE_LOGOUT,
    CONNECT_BANK,
    HANDLE_ERROR, LOAD_DATA
} from "../constants/action-types";
import axios from "axios";
// import Plaid. from "plaid";

const baseUrl = 'https://creditswagapi.herokuapp.com/';

export const loadData = (state) => {
    return {
        type: LOAD_DATA,
        payload: state
    };
};

export function logIn(loginState) {
    
    // const headers = {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'Access-Control-Allow-Origin': "*"
    // }
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

export async function connectBank() {
    console.log('in bankf!');
    
    return (dispatcher) => {
        var handler = Plaid.create({
            // const client_id = '5d280da44388c80013735b14';
            // const secret = 'd5df4201427a1cbec5de25ade9bf41';
            // const PLAID_PUBLIC_KEY = 'd5df4201427a1cbec5de25ade9bf41';
            // const PLAID_ENV = 'sandbox';
            clientName: 'Plaid Quickstart',
            env: 'sandbox',
            key: 'd5df4201427a1cbec5de25ade9bf41',
            product: ['transactions'],
            // Optional – use webhooks to get transaction and error updates
            webhook: 'https://requestb.in',
            onSuccess: async (public_token, metadata) => {
                // Send the public_token to your app server.
                // The metadata object contains info about the institution the
                // user selected and the account ID or IDs, if the
                // Select Account view is enabled.
                const res = await axios.post(`${baseUrl}/get_access_token`, {public_token: public_token});
                console.log('res:', res);
                
            },
        });
    };
};

export function signUp(signupState) {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': "*"
    }
    return async (dispatcher) => {
        try {
            const res = await axios.post(`${baseUrl}signup`, signupState, {headers});
            if (res.status === 200) {
                dispatcher(handleSignup(res.data));
            } else {
                dispatcher(handleError(true));
            }
        } catch (err) {
            console.log('err:', err.message);
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

// export const signUp = (signupState) => async dispatch => {
//     dispatch({type: HANDLE_SIGNUP, payload: signupState });
// }

export const logOut = () => {
    return (dispatcher) => {
        axios.delete(`${baseUrl}logout`).then(() => {
            dispatcher(handleLogout());
        })
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
