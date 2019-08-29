// src/redux/store/index.js

import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import { AsyncStorage } from 'react-native';
import { loadData } from '../actions/index';

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const CREDIT_SWAG_STATE = "CREDIT_SWAG_STATE";

// Load State 
export const loadState = async () => {
  try { 
    const serializedState = await AsyncStorage.getItem(CREDIT_SWAG_STATE)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch(err) {
    return undefined
  };
};

// Save State
export const saveState = async (state) => {
  try {
    const serializedState = JSON.stringify(state)
    await AsyncStorage.setItem(CREDIT_SWAG_STATE, serializedState)
  } catch(error) {
    console.log("Error saving data:", error);
  };
};

const store = createStore(
  rootReducer,
  undefined,
  storeEnhancers(applyMiddleware(thunk))
);


const persistedState = loadState();
persistedState.then((data) => { 
  if (data !== undefined) {
    // console.log('------------- load State -------------');
    // console.log('loadState state:', data);
    store.dispatch(loadData(data));
  }
});
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
