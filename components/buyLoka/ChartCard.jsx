import { Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { changeMiningResult, changeExchangeResult } from "../../redux/actions";
const ChartCard = ({ btcPrice, investment, btcPriceSimulation }) => {
  const dispatch = useDispatch();
  //global variables from redux--------------------------------------------
  const [miningResult, setMiningResult] = useState(0);
  const [exchangeResult, setExchangeResult] = useState(0);
  const [btcSim, setBtcSim] = useState(30000);
  useEffect(() => {
    setInvestmentValue(currentInvestmentValue);
    generateDataSets(currentDurationValue, currentInvestmentValue);
    dispatch(changeMiningResult(miningResult));
    dispatch(changeExchangeResult(exchangeResult));
  }, [miningResult, exchangeResult]);

  useEffect(() => {
    setBtcSim(btcPriceSimulation);
    generateDataSets(currentDurationValue, currentInvestmentValue);
  }, [btcPriceSimulation]);

  const currentInvestmentValue = investment;
  const currentDurationValue = useSelector(
    (state) => state.rootReducer.duration
  );
  const currentDuration = useSelector(
    (state) => state.rootReducer.durationTitle
  );

  const [investmentValue, setInvestmentValue] = useState(0);
  useEffect(() => {
    setInvestmentValue(currentInvestmentValue);
    generateDataSets(currentDurationValue, currentInvestmentValue);
    console.log("investment value " + currentInvestmentValue);
  }, [currentInvestmentValue, btcPrice, investmentValue]);

  const [miningSeries, setMiningSeries] = useState([
    0, 0.01, 0.02, 0.03, 0.04, 0.06, 0.07, 0.08, 0.1, 0.12, 0.13, 0.15,
  ]);
  const [miningSeriesOrigin, setMiningSeriesOrigin] = useState([
    0, 0.01, 0.02, 0.03, 0.04, 0.06, 0.07, 0.08, 0.1, 0.12, 0.13, 0.15,
  ]);

  const [durationValue, setDurationValue] = useState(0);
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    setDurationValue(currentDurationValue);
    setDuration(currentDuration);
    generateDataSets(currentDurationValue, currentInvestmentValue);
    console.log(
      "btc price " +
        btcPrice +
        " sim " +
        btcPriceSimulation +
        " duration " +
        currentDuration
    );
  }, [currentDurationValue, currentDuration]);
  const satsUSD = btcSim / 100006400;

  const hashPerDay = 0.05;
  const dollarPerTH = 20;
  const days = durationValue * 28;
  const satsPerHashDay = 2700;
  const difficultyFactor = 1.025;
  const [lokaMiningYieldSeries, setLokaMiningYieldSeries] = useState([]);
  const [lokaUSDYieldSeries, setLokaUSDYieldSeries] = useState([]);
  const [exchangeSeries, setExchangeSeries] = useState([]);
  const [labels, setLabels] = useState([]);
  const THrented = investmentValue / dollarPerTH;

  const generateDataSets = (duration, investment) => {
    var yieldPerDay = (investmentValue / dollarPerTH) * satsPerHashDay;
    console.log(
      "yield per day 1 " + yieldPerDay + " investment value  " + investmentValue
    );
    var check = investment / btcPrice;
    var weeks = (duration * 28) / 7;
    var difficulty = 100;

    var yieldSeries = [0];
    var initialBTCPrice = 30000;
    var exchangeBTC = investmentValue / initialBTCPrice;

    var endSimulationBTC = exchangeBTC * btcSim;

    var steps = (endSimulationBTC - investmentValue) / weeks;

    var exchange = [investment];
    var exchange_compound = investmentValue;
    var label_ = [0];
    var compound = 0;
    var usdSeries = [0];
    for (var i = 0; i < weeks; i++) {
      if (i % 2 == 0) {
        difficulty *= difficultyFactor;
      }
      compound += (yieldPerDay / difficulty) * 100 * 7;

      exchange_compound += steps;
      yieldSeries.push(compound);
      var USDvalue = parseFloat(compound) * parseFloat(satsUSD);
      //console.log("yield " + compound + " " + USDvalue);
      i < weeks - 1
        ? exchange.push(exchange_compound)
        : exchange.push(endSimulationBTC);

      usdSeries.push(compound * satsUSD);
      var week_index = i + 1;
      label_.push("Week " + week_index);
    }

    setLokaMiningYieldSeries(yieldSeries);
    setExchangeSeries(exchange);
    setLabels(label_);
    setLokaUSDYieldSeries(usdSeries);
    dispatch(changeMiningResult(usdSeries[weeks]));
    dispatch(changeExchangeResult(endSimulationBTC));
    console.log("dispatched ");
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "USD value of BTC bought from exchange",
        data: exchangeSeries,
        borderColor: "#778CA9",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        color: "#FFFFFF",
        fill: false,
      },
      {
        label: "USD value of BTC mined from Loka",
        data: lokaUSDYieldSeries,
        //data: lokaMiningYieldSeries,
        borderColor: "#FACC15",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
      },
    ],
  };
  const rero = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];

  const customTooltips = {
    callbacks: {
      title: (tooltipItems) => `Custom Title: ${tooltipItems[0].label}`,
      label: (tooltipItems) => `Custom Value: ${rero[tooltipItems.dataIndex]}`,
    },
  };

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

export default ChartCard;
