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

export const changeBTCPriceToday = (newValue) => ({
  type: "SET_BTC_PRICE_TODAY",
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

export const changeDurationDiscount = (newValue) => ({
  type: "SET_DURATION_DISCOUNT",
  payload: newValue,
});

export const changeSatsMined = (newValue) => ({
  type: "SET_SATS_MINED",
  payload: newValue,
});

export const changeElectricityPerDay = (newValue) => ({
  type: "SET_ELECTRICITY_PERDAY",
  payload: newValue,
});

export const changeTotalTHRented = (newValue) => ({
  type: "SET_TOTAL_TH_RENTED",
  payload: newValue,
});

export const changeICPAddress = (newValue) => ({
  type: "SET_ICP_ADDRESS",
  payload: newValue,
});

export const changeLokaCanister = (newValue) => ({
  type: "SET_LOKA_CANISTER",
  payload: newValue,
});

export const changeConnected = (newValue) => ({
  type: "SET_CONNECTED",
  payload: newValue,
});

export const changeControllers = (newValue) => ({
  type: "SET_CONTROLLERS",
  payload: newValue,
});

export const changeMiningSites = (newValue) => ({
  type: "SET_MINING_SITES",
  payload: newValue,
});

export const changeSelectedSites = (newValue) => ({
  type: "SET_SELECTED_SITE",
  payload: newValue,
});

export const changeElectricityPerKwh = (newValue) => ({
  type: "SET_ELECTRICITY_PER_KWH",
  payload: newValue,
});

export const changeHashrateRentPerDay = (newValue) => ({
  type: "SET_HASHRATE_COST_PERDAY",
  payload: newValue,
});

export const changeSelectedController = (newValue) => ({
  type: "SET_SELECTED_CONTROLLER",
  payload: newValue,
});
