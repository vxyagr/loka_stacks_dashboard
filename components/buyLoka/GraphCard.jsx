import { Line } from "react-chartjs-2";

const GraphCard = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "BTC you get by buying on exchange",
        data: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        color: "#FFFFFF",
        fill: true,
      },
      {
        label: "BTC you get by mining with Loka",
        data: [0, 0.02, 0.05, 0.08, 0.12, 0.15],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
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
