import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { DonationsByMonth } from "../../../types/Philanthropy";

interface DonationsByMonthChartProps {
  data: DonationsByMonth;
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  elements: {
    point: {
      radius: 0,
    },
    line: {
      tension: 0.4,
    },
  },
  scales: {
    xAxes: {
      ticks: {
        display: false,
      },
      grid: {
        display: false,
        drawBorder: false,
      },
    },
    yAxes: {
      ticks: {
        display: false,
      },
      grid: {
        display: false,
        drawBorder: false,
      },
    },
  },
};

const DonationsByMonthChart: React.FC<DonationsByMonthChartProps> = ({
  data,
}) => {
  const months = Object.keys(data);

  const summaryByMonthChart = {
    labels: Object.entries(data).map((s) => s[0]),
    datasets: [
      {
        label: "Donation",
        data: Object.keys(data).map((key) => data[key].donated),
        backgroundColor: "rgba(101, 116, 205, 0.1)",
        borderColor: "rgba(101, 116, 205, 0.8)",
        fill: true,
      },
    ],
  };

  const matchedAmountChart = {
    labels: Object.entries(data).map((s) => s[0]),
    datasets: [
      {
        label: "Employer Matched",
        data: Object.keys(data).map((key) => data[key].matched),
        backgroundColor: "rgba(246, 109, 155, 0.1)",
        borderColor: "rgba(246, 109, 155, 0.8)",
      },
    ],
  };

  const latestMonth = months[months.length - 1];
  const prevMonth = months[months.length - 2];

  const donatedPercentageDiff =
    Math.round(
      ((data[latestMonth].donated - data[prevMonth].donated) /
        data[prevMonth].donated) *
        1000
    ) / 10;
  const matchedPercentageDiff =
    Math.round(
      ((data[latestMonth].matched - data[prevMonth].matched) /
        data[prevMonth].matched) *
        1000
    ) / 10;

  return (
    <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
      <div className="w-full px-2">
        <div className="mb-4 rounded-lg shadow-sm">
          <div className="relative overflow-hidden rounded-lg bg-white shadow-lg md:shadow-xl">
            <div className="relative z-10 px-3 pt-8 pb-20 text-center">
              <h4 className="text-sm uppercase leading-tight text-gray-500">
                Donated Amount
              </h4>
              <h3 className="mt-3 text-3xl font-semibold leading-tight text-gray-700">
                {`$${data[latestMonth].donated}`}
              </h3>
              <h5 className="mt-0 text-sm font-semibold leading-tight text-gray-700">
                {latestMonth}
              </h5>
              {donatedPercentageDiff >= 0 ? (
                <p className="text-xs leading-tight text-green-500">
                  &#x25B2; {`▲ ${donatedPercentageDiff}%`}
                </p>
              ) : (
                <p className="text-xs leading-tight text-red-500">
                  &#x25BC; {`${donatedPercentageDiff}%`}
                </p>
              )}
            </div>
            <div className="absolute inset-x-0 bottom-0">
              <Line
                height="100%"
                data={summaryByMonthChart}
                options={chartOptions}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-2">
        <div className="mb-4 rounded-lg shadow-sm">
          <div className="relative overflow-hidden rounded-lg bg-white shadow-lg md:shadow-xl">
            <div className="relative z-10 px-3 pb-20 pt-8 text-center">
              <h4 className="text-sm uppercase leading-tight text-gray-500">
                Employer Matched Amount
              </h4>
              <h3 className="mt-3 text-3xl font-semibold leading-tight text-gray-700">
                {`$${data[latestMonth].matched}`}
              </h3>
              <h5 className="mt-0 text-sm font-semibold leading-tight text-gray-700">
                {latestMonth}
              </h5>
              {donatedPercentageDiff >= 0 ? (
                <p className="text-xs leading-tight text-green-500">
                  &#x25B2; {`▲ ${matchedPercentageDiff}%`}
                </p>
              ) : (
                <p className="text-xs leading-tight text-red-500">
                  &#x25BC; {`${matchedPercentageDiff}%`}
                </p>
              )}
            </div>
            <div className="absolute inset-x-0 bottom-0">
              <Line
                height="100%"
                data={matchedAmountChart}
                options={chartOptions}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationsByMonthChart;
