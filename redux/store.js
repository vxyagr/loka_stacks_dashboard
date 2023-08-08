// store/store.js
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { HYDRATE, createWrapper } from "next-redux-wrapper";

const initialState = {
  globalVariable: "",
  stacksAddress: "",
  btcPriceToday: 0,
  btcSimulated: 0,
  investment: 0,
  duration: 12,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_GLOBAL_VARIABLE":
      return { ...state, globalVariable: action.payload };
    case "SET_STACKS_ADDRESS":
      return { ...state, stacksAddress: action.payload };
    case "SET_BTC_PRICE_TODAY":
      return { ...state, btcPriceToday: action.payload };
    case "SET_BTC_SIMULATED":
      return { ...state, btcSimulated: action.payload };
    case "SET_INVESTMENT":
      return { ...state, investment: action.payload };
    case "SET_DURATION":
      return { ...state, duration: action.payload };
    default:
      return state;
  }
};

const combinedReducer = combineReducers({ rootReducer });

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  }
  return combinedReducer(state, action);
};

const initStore = () => {
  return createStore(reducer, applyMiddleware(thunkMiddleware));
};

export const wrapper = createWrapper(initStore);