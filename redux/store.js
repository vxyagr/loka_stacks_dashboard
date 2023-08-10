// store/store.js
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { HYDRATE, createWrapper } from "next-redux-wrapper";

const initialState = {
  globalVariable: "",
  stacksAddress: "",
  btcPriceToday: 30000,
  btcSimulated: 30000,
  investment: 100,
  duration: 12,
  durationTitle: "1 year",
  exchangeResult: 7,
  miningResult: 7,
  satsPerDay: 5400,
  thRentPerDay: 0.03,
  hardwareEfficiency: 38,
  durationDiscount: 20,
  electricityCostPerKwh: 0.03,
  satsMined: 0.0,
  electricityPerDay: 0,
  totalTHRented: 0,
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
    case "SET_DURATION_TITLE":
      return { ...state, durationTitle: action.payload };
    case "SET_EXCHANGE_RESULT":
      return { ...state, exchangeResult: action.payload };
    case "SET_MINING_RESULT":
      return { ...state, miningResult: action.payload };
    case "SET_DURATION_DISCOUNT":
      return { ...state, durationDiscount: action.payload };
    case "SET_SATS_MINED":
      return { ...state, satsMined: action.payload };
    case "SET_ELECTRICITY_PERDAY":
      return { ...state, electricityPerDay: action.payload };
    case "SET_TOTAL_TH_RENTED":
      return { ...state, totalTHRented: action.payload };
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
