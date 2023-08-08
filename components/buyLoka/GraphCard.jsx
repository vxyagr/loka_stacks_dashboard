import { Line } from "react-chartjs-2";

const GraphCard = () => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "BTC you get by buying on exchange",
        data: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
        borderColor: "#778CA9",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        color: "#FFFFFF",
        fill: false,
      },
      {
        label: "BTC you get by mining with Loka",
        data: [
          0, 0.01, 0.02, 0.03, 0.04, 0.06, 0.07, 0.08, 0.1, 0.12, 0.13, 0.15,
        ],
        borderColor: "#FACC15",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
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

export default GraphCard;
