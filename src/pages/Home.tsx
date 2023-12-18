import React, { useEffect, useState } from "react";
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
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import { isThisMonth, isThisWeek, isThisYear } from "../utils/helper";

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
        return value.toLocaleString("en-US");
      },
    },
  },
};

const monthNames = [
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

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Tháng");
  const [revenueData, setRevenueData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [timeFrameString, setTimeFrameString] = useState<string>("");

  useEffect(() => {
    switch (activeTab) {
      case "Tuần":
      case "Tháng":
        setTimeFrameString("ngày");
        break;
      case "Năm":
      case "Toàn bộ":
        setTimeFrameString("tháng");
        break;
      default:
        break;
    }
  }, [activeTab]);

  useEffect(() => {
    fetch("http://103.57.129.166:3000/revenue/api/total-all-revenue")
      .then((res) => res.json())
      .then((data) => {
        let revenue: { [key: string]: number } = {};
        data.data.bookingData.forEach((item: any) => {
          const date = new Date(item.createdAt);
          let key;
          switch (activeTab) {
            case "Tuần":
              if (isThisWeek(date)) {
                key = `${date.getFullYear()}-${
                  date.getMonth() + 1
                }-${date.getDate()}`; // get "YYYY-MM-DD"
              }
              break;
            case "Tháng":
              if (isThisMonth(date)) {
                key = `${date.getFullYear()}-${
                  date.getMonth() + 1
                }-${date.getDate()}`; // get "YYYY-MM-DD"
              }
              break;
            case "Năm":
              if (isThisYear(date)) {
                key = `${date.getFullYear()}-${monthNames[date.getMonth()]}`; // get "YYYY-Month"
              }
              break;
            case "Toàn bộ":
            default:
              key = `${date.getFullYear()}-${monthNames[date.getMonth()]}`; // get "YYYY-Month"
              break;
          }
          if (key) {
            if (!revenue[key]) {
              revenue[key] = 0;
            }
            revenue[key] += item.totalMoney;
          }
        });

        const sortedKeys = Object.keys(revenue).sort((a, b) => {
          const dateA = new Date(a);
          const dateB = new Date(b);
          return dateA.getTime() - dateB.getTime();
        });
        setLabels(sortedKeys);
        setRevenueData(sortedKeys.map((key) => revenue[key]));
      });
  }, [activeTab]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Doanh thu",
        data: revenueData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const totalRevenue = revenueData.reduce((a, b) => a + b, 0);
  const monthlyAverage = totalRevenue / revenueData.length;
  const highestMonth = Math.max(...revenueData);
  const lowestMonth = Math.min(...revenueData);

  const tabData = [
    {
      label: "Tuần",
    },
    {
      label: "Tháng",
    },
    {
      label: "Năm",
    },
    {
      label: "Toàn bộ",
    },
  ];

  return (
    <div className="flex flex-col ml-64 px-12">
      <div className="w-full flex justify-center mt-10 pb-14 px-16">
        <Tabs value={activeTab}>
          <TabsHeader
            className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
            indicatorProps={{
              className:
                "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
            }}
          >
            {tabData.map(({ label }) => (
              <Tab
                key={label}
                value={label}
                onClick={() => setActiveTab(label)}
                className={activeTab === label ? "text-gray-900 w-28" : "w-28"}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
      </div>

      <div className="w-full h-full">
        <div className="flex justify-center">
          <div className="w-1/2 h-1/2">
            <Bar data={data} options={options} />
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <h1 className="text-2xl font-bold mb-5 mr-10">
            Doanh thu trung bình theo {timeFrameString}
          </h1>
          <div className="ml-10">
            <p>Tổng doanh thu: {totalRevenue.toLocaleString("en-US")}</p>
            <p>
              Trung bình hàng {timeFrameString}:{" "}
              {monthlyAverage.toLocaleString("en-US")}
            </p>
            <p>
              {timeFrameString.charAt(0).toUpperCase() +
                timeFrameString.slice(1)}{" "}
              cao nhất: {highestMonth.toLocaleString("en-US")}
            </p>
            <p>
              {timeFrameString.charAt(0).toUpperCase() +
                timeFrameString.slice(1)}{" "}
              thấp nhất: {lowestMonth.toLocaleString("en-US")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
