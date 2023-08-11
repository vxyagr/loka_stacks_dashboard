import { Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  changeMiningResult,
  changeExchangeResult,
  changeSatsMined,
  changeElectricityPerDay,
  changeTotalTHRented,
} from "../../redux/actions";

const ContractCalculatorAndChart = ({
  btcPrice,
  investment,
  btcPriceSimulation,
}) => {
  const dispatch = useDispatch();
  //global variables from redux--------------------------------------------
  const currentDurationValue = useSelector(
    (state) => state.rootReducer.duration
  );
  const currentDuration = useSelector(
    (state) => state.rootReducer.durationTitle
  );
  const hardwareEfficiency = useSelector(
    (state) => state.rootReducer.hardwareEfficiency
  );
  const currentThRentPerDay = useSelector(
    (state) => state.rootReducer.thRentPerDay
  );
  const currentDurationDiscount = useSelector(
    (state) => state.rootReducer.durationDiscount
  );
  const btcSliderValue = useSelector((state) => state.rootReducer.btcSimulated);
  useEffect(() => {
    setDurationValue(currentDurationValue);
    setDuration(currentDuration);
    calculateAndgenerateDataSets(currentDurationValue, currentInvestmentValue);
    //console.log("current duration discount " + currentDurationDiscount);
  }, [
    currentDurationValue,
    currentDuration,
    hardwareEfficiency,
    currentDurationDiscount,
  ]);
  //constants
  const [miningResult, setMiningResult] = useState(0);
  const [exchangeResult, setExchangeResult] = useState(0);
  const [btcSim, setBtcSim] = useState(30000);
  const [lokaMiningYieldSeries, setLokaMiningYieldSeries] = useState([]);
  const [lokaUSDYieldSeries, setLokaUSDYieldSeries] = useState([]);
  const [exchangeSeries, setExchangeSeries] = useState([]);
  const [labels, setLabels] = useState([]);
  const [durationValue, setDurationValue] = useState(0);
  const [duration, setDuration] = useState(0);
  const [investmentValue, setInvestmentValue] = useState(0);
  const satsUSD = btcSim / 100006400;
  const maxSatsUSD = 60000 / 100006400;
  const hashPerDay = 0.05;
  const dollarPerTH = 20;
  var maxY = 0;
  const satsPerHashDay = 240;
  const [maxYScale, setMaxYScale] = useState(500);
  const currentInvestmentValue = investment;
  useEffect(() => {
    setInvestmentValue(currentInvestmentValue);
    calculateAndgenerateDataSets(currentDurationValue, currentInvestmentValue);
    dispatch(changeMiningResult(miningResult));
    dispatch(changeExchangeResult(exchangeResult));
  }, [miningResult, exchangeResult]);

  useEffect(() => {
    setBtcSim(btcSliderValue);
    console.log("slider value " + btcSliderValue);
    calculateAndgenerateDataSets(currentDurationValue, currentInvestmentValue);
  }, [btcPriceSimulation, btcSliderValue]);

  useEffect(() => {
    setInvestmentValue(currentInvestmentValue);
    calculateAndgenerateDataSets(currentDurationValue, currentInvestmentValue);
    //console.log("investment value " + currentInvestmentValue);
  }, [currentInvestmentValue, btcSim, investmentValue]);

  const calculateAndgenerateDataSets = (duration, investment) => {
    const days = currentDurationValue * 28;
    const THrented =
      investmentValue /
      days /
      currentThRentPerDay /
      (1 - currentDurationDiscount / 100); //TH's with discount

    dispatch(changeTotalTHRented(THrented.toFixed(0)));
    const electricityPerDay = THrented * hardwareEfficiency * 24; // Watt
    dispatch(changeElectricityPerDay(electricityPerDay));
    const electricityCostPerDay = (electricityPerDay / 1000) * 0.03; //$ value per day
    const electricityCostPerWeek = electricityCostPerDay * 7; //value per week
    /*
    console.log(
      "investment " +
        investmentValue +
        " days " +
        days +
        " discount " +
        currentDurationDiscount +
        " current TH rate " +
        currentThRentPerDay +
        " THrented " +
        THrented +
        " hardware " +
        hardwareEfficiency +
        " electricity " +
        electricityPerDay +
        " electricity cost per week " +
        electricityCostPerDay +
        " electricity cost per week " +
        electricityCostPerDay
    );
*/
    //const yieldPerDay = (investmentValue / dollarPerTH) * satsPerHashDay;
    const yieldPerDay = THrented * satsPerHashDay;
    var weeks = (currentDurationValue * 28) / 7;
    const difficultyFactor = 1.01;
    var difficulty = 100;
    var initialBTCPrice = btcPrice;
    var exchangeBTC = investmentValue / initialBTCPrice;
    //console.log("exchange btc = " + exchangeBTC);
    var endSimulationBTC = exchangeBTC * btcSim;
    //console.log("endSimulationBTC = " + endSimulationBTC);
    var steps = (endSimulationBTC - investmentValue) / weeks;
    var exchange = [investment];
    var exchange_compound = investmentValue;
    var label_ = [0];
    var compound = 0;
    var usdCompound = 0;
    var usdSeries = [0];
    var yieldSeries = [0];

    for (var i = 0; i < weeks; i++) {
      if (i % 2 == 0 && i > 0) {
        difficulty *= difficultyFactor;
        // console.log("increasing difficulty");
      }
      var weeklyYield = (yieldPerDay / difficulty) * 100 * 7;
      var weeklyYieldinUSD =
        i >= 4
          ? weeklyYield * satsUSD - electricityCostPerWeek
          : weeklyYield * satsUSD;

      var maxWeeklyYieldinUSD =
        i >= 4
          ? weeklyYield * maxSatsUSD - electricityCostPerWeek
          : weeklyYield * maxSatsUSD;

      compound += weeklyYield;
      usdCompound += weeklyYieldinUSD;

      exchange_compound += steps;
      yieldSeries.push(compound);
      //var USDvalue = parseFloat(compound) * parseFloat(satsUSD);
      i < weeks - 1
        ? exchange.push(exchange_compound)
        : exchange.push(endSimulationBTC);

      //usdSeries.push(compound * satsUSD - electricityCostPerWeek);
      usdSeries.push(usdCompound);
      // console.log("usd " + (yieldPerDay / difficulty) * 100 * 7);
      //if (i > 0)

      /* i > 0
        ? usdSeries.push(
            usdSeries[i - 1] +
              (yieldPerDay / difficulty) * 100 * 7 * satsUSD -
              electricityCostPerWeek
          )
        : usdSeries.push(
            (yieldPerDay / difficulty) * 100 * 7 * satsUSD -
              electricityCostPerWeek
          ); */

      var week_index = i + 1;
      label_.push("Week " + week_index);
    }
    maxY = 1.1 * compound * maxSatsUSD - electricityCostPerWeek * (weeks - 4);
    maxY = Math.round(maxY / 100) * 100;
    setLokaMiningYieldSeries(yieldSeries);
    setLabels(label_);
    setExchangeSeries(exchange);
    setLokaUSDYieldSeries(usdSeries);
    setMaxYScale(maxY);
    dispatch(changeMiningResult(usdSeries[weeks]));
    dispatch(changeExchangeResult(endSimulationBTC));
    //console.log(lokaMiningYieldSeries);
    dispatch(
      changeSatsMined(yieldSeries[weeks] ? yieldSeries[weeks].toFixed(0) : 0)
    );
    /*console.log(
      "dispatched " +
        usdSeries[weeks] +
        " mining " +
        endSimulationBTC +
        " maxY " +
        maxY
    ); */
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "exchange",
        data: exchangeSeries,
        //data: lokaUSDYieldSeries,
        borderColor: "#778CA9",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        color: "#FFFFFF",
        fill: false,
      },
      {
        label: "mined from Loka",
        data: lokaUSDYieldSeries,
        borderColor: "#FACC15",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
      },
    ],
  };
  {
    /*} const rero = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];

  const customTooltips = {
    callbacks: {
      title: (tooltipItems) => `Custom Title: ${tooltipItems[0].label}`,
      label: (tooltipItems) => `Custom Value: ${rero[tooltipItems.dataIndex]}`,
    },
  }; */
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index",
    },
    plugins: {
      //tooltip: customTooltips,
      legend: {
        position: "bottom",
        align: "start",
      },
    },
    scales: {
      x: {
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        max: maxYScale,
        position: "right", // Move the x-axis to the right side
        beginAtZero: true,
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ContractCalculatorAndChart;
