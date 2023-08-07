// store/store.js
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { HYDRATE, createWrapper } from "next-redux-wrapper";

const initialState = {
  globalVariable: "",
  stacksAddress: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_GLOBAL_VARIABLE":
      return { ...state, globalVariable: action.payload };
    case "SET_STACKS_ADDRESS":
      return { ...state, stacksAddress: action.payload };
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
