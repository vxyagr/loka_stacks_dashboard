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
  const baseSatsUSD = btcPrice / 100006400;
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
    //console.log("slider value " + btcSliderValue);
    calculateAndgenerateDataSets(currentDurationValue, currentInvestmentValue);
  }, [btcPriceSimulation, btcSliderValue]);

  useEffect(() => {
    setInvestmentValue(currentInvestmentValue);
    calculateAndgenerateDataSets(currentDurationValue, currentInvestmentValue);
    //console.log("investment value " + currentInvestmentValue);
  }, [currentInvestmentValue, btcSim, investmentValue]);

  function recalculate(investment, duration, thrented, electricityperday) {
    var check = false;
    var threntupdate = thrented;
    var electricityupdate = 0;
    var newInvestment = investment;
    while (!check) {
      if (check) break;
      newInvestment -= 1;

      var THrented_ =
        newInvestment /
        (duration * 28) /
        currentThRentPerDay /
        (1 - currentDurationDiscount / 100);
      var electricityPerDay_ = THrented_ * hardwareEfficiency * 24; // Watt

      var electricityCostPerDay_ = (electricityPerDay_ / 1000) * 0.03; //$ value per day
      var totalNewInvestment = newInvestment + 28 * electricityCostPerDay_;
      check = totalNewInvestment < investment ? true : false;
      //console.log("new " + newInvestment + " check " + check);
      threntupdate = THrented_;
      electricityupdate = electricityCostPerDay_;
    }

    //return { threntupdate, electricityupdate };
    var THrented = threntupdate; // thrented;
    var electricityCostPerDay = electricityupdate; // electricityperday;
    return { THrented, electricityCostPerDay };
  }

  const calculateAndgenerateDataSets = (duration, investment) => {
    const days = currentDurationValue * 28;
    const base2YearsTH =
      investmentValue / (28 * 24) / currentThRentPerDay / (1 - 70 / 100); //TH's with discount from base 2 years

    const sats2Years = base2YearsTH * satsPerHashDay * (28 * 24);
    const baseUSDProfit = sats2Years * baseSatsUSD - investmentValue;
    //const baseMonthlySats = satsBase / 28;
    const baseMonthlyUSDProfit = baseUSDProfit / 24;

    const durationROIFactor =
      currentDurationValue == 1
        ? 20
        : currentDurationValue == 6
        ? 70
        : currentDurationValue == 12
        ? 80
        : 100;

    const finalSats =
      ((durationROIFactor / 100) * baseMonthlyUSDProfit * currentDurationValue +
        investmentValue) /
      baseSatsUSD;

    const THrented_ = finalSats / (currentDurationValue * 28) / satsPerHashDay;

    {
      /*} const THrented_ =
      investmentValue /
      days /
      currentThRentPerDay /
      (1 - currentDurationDiscount / 100); //TH's with discount
  //console.log("rented " + THrented); */
    }
    if (THrented_ <= 0) return;

    const electricityPerDay_ = THrented_ * hardwareEfficiency * 24; // Watt

    const electricityCostPerDay_ = (electricityPerDay_ / 1000) * 0.03; //$ value per day

    if (
      isNaN(electricityCostPerDay_) ||
      electricityCostPerDay_ == undefined ||
      electricityCostPerDay_ <= 0
    )
      return;
    {
      /*const { THrented, electricityCostPerDay } = recalculate(
      investmentValue,
      currentDurationValue,
      THrented_,
      electricityCostPerDay_
    ); */
    }

    const THrented = THrented_;
    const electricityCostPerDay = electricityCostPerDay_;
    //console.log("thrent " + THrented);
    const electricityPerDay = THrented * hardwareEfficiency * 24; // Watt
    dispatch(changeTotalTHRented(THrented.toFixed(0)));
    dispatch(changeElectricityPerDay(electricityPerDay));

    const electricityCostPerWeek = electricityCostPerDay * 7; //value per week

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

      i < weeks - 1
        ? exchange.push(exchange_compound)
        : exchange.push(endSimulationBTC);

      usdSeries.push(usdCompound);

      var week_index = i + 1;
      label_.push("Week " + week_index);
    }
    maxY = 1.1 * compound * maxSatsUSD - electricityCostPerWeek * (weeks - 4);
    var normalPrice = compound * baseSatsUSD;
    var maxPrice = compound * maxSatsUSD;
    var elecprice = electricityCostPerWeek * (weeks - 4);
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
