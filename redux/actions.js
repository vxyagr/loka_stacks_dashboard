export const changeInvestment = (newValue) => ({
  type: "SET_INVESTMENT",
  payload: newValue,
});

export const changeDuration = (newValue) => ({
  type: "SET_DURATION",
  payload: newValue,
});

export const changeDurationTitle = (newValue) => ({
  type: "SET_DURATION_TITLE",
  payload: newValue,
});

export const changeBTCSimulated = (newValue) => ({
  type: "SET_BTC_SIMULATED",
  payload: newValue,
});
export const changeMiningResult = (newValue) => ({
  type: "SET_MINING_RESULT",
  payload: newValue,
});

export const changeExchangeResult = (newValue) => ({
  type: "SET_EXCHANGE_RESULT",
  payload: newValue,
});
