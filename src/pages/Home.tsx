import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Doanh thu trung bình theo thời gian",
    },
    tooltip: {
      enabled: false,
    },
    datalabels: {
      display: true,
      color: "#000000",
      anchor: "end" as "start" | "center" | "end",
      align: "end" as
        | "start"
        | "end"
        | "center"
        | "left"
        | "right"
        | "top"
        | "bottom",
      offset: -10,
      font: {
        size: 14,
      },
      formatter: (value: number) => {
        return value;
      },
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Doanh thu",
      data: ["", "", "", "", "", 12, 19, 20, 18, 15, 30, 27],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const Home: React.FC = () => {
  const [timeRange, setTimeRange] = useState(["January", "December"]);

  const filteredData = {
    ...data,
    labels: data.labels.slice(
      data.labels.indexOf(timeRange[0]),
      data.labels.indexOf(timeRange[1]) + 1
    ),
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      data: dataset.data.slice(
        data.labels.indexOf(timeRange[0]),
        data.labels.indexOf(timeRange[1]) + 1
      ),
    })),
  };

  const revenueData = filteredData.datasets[0].data.map(Number).filter(Number);
  const totalRevenue = revenueData.reduce((a, b) => a + b, 0);
  const monthlyAverage = totalRevenue / revenueData.length;
  const highestMonth = Math.max(...revenueData);
  const lowestMonth = Math.min(...revenueData);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ml-64">
      <div className="w-1/2 h-1/2">
        <div className="flex justify-between mb-5">
          <div className="flex flex-col mr-3">
            <label className="mb-1">Tháng bắt đầu:</label>
            <select
              value={timeRange[0]}
              onChange={(e) => setTimeRange([e.target.value, timeRange[1]])}
              className="py-2 px-4 bg-white rounded-lg shadow-md focus:outline-none"
            >
              {labels.map((label) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Tháng kết thúc:</label>
            <select
              value={timeRange[1]}
              onChange={(e) => setTimeRange([timeRange[0], e.target.value])}
              className="py-2 px-4 bg-white rounded-lg shadow-md focus:outline-none"
            >
              {labels.map((label) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Bar data={filteredData} options={options} />
      </div>
      <div className="mt-10">
        <h1 className="text-2xl font-bold mb-5 mr-10">
          Doanh thu trung bình theo thời gian
        </h1>
        <div className="ml-10">
          <p>Tổng doanh thu: {totalRevenue}</p>
          <p>Trung bình hàng tháng: {monthlyAverage.toFixed(2)}</p>
          <p>Tháng cao nhất: {highestMonth}</p>
          <p>Tháng thấp nhất: {lowestMonth}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
